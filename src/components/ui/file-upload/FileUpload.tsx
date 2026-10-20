import { useState, useRef, type DragEvent, type ChangeEvent } from 'react'
import { UploadCloud, FileText, CheckCircle2, X, AlertCircle } from 'lucide-react'
import { clsx } from 'clsx'

export type UploadedFileItem = {
  id: string
  file: File
  progress: number
  status: 'uploading' | 'completed' | 'error'
  error?: string
}

export type FileUploadProps = {
  accept?: string
  maxSizeMB?: number
  multiple?: boolean
  onFilesSelected?: (files: File[]) => void
  helperText?: string
  className?: string
}

export function FileUpload({
  accept = '.pdf,.png,.jpg,.jpeg,.zip',
  maxSizeMB = 10,
  multiple = true,
  onFilesSelected,
  helperText = 'Format: PDF, PNG, JPG, ZIP (Maks. 10MB)',
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<UploadedFileItem[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (incomingFiles: FileList | null) => {
    if (!incomingFiles || incomingFiles.length === 0) return

    const newItems: UploadedFileItem[] = []
    const rawFiles: File[] = []

    for (let i = 0; i < incomingFiles.length; i++) {
      const f = incomingFiles[i]
      const sizeMB = f.size / (1024 * 1024)

      if (sizeMB > maxSizeMB) {
        newItems.push({
          id: `${f.name}-${Date.now()}-${i}`,
          file: f,
          progress: 0,
          status: 'error',
          error: `Ukuran melebihi batas ${maxSizeMB}MB`,
        })
      } else {
        newItems.push({
          id: `${f.name}-${Date.now()}-${i}`,
          file: f,
          progress: 100,
          status: 'completed',
        })
        rawFiles.push(f)
      }
    }

    setFiles((prev) => [...prev, ...newItems])
    if (rawFiles.length > 0) {
      onFilesSelected?.(rawFiles)
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <div className={clsx('relux-file-upload', className)}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={clsx(
          'relux-file-upload__dropzone',
          isDragging && 'relux-file-upload__dropzone--active',
        )}
        aria-label="Upload file drag and drop zone"
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className="relux-file-upload__input"
        />

        <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <UploadCloud className="size-5" aria-hidden="true" />
        </div>

        <p className="text-sm font-semibold text-foreground">
          Tarik & letakkan berkas di sini, atau <span className="text-primary underline">telusuri</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{helperText}</p>
      </div>

      {files.length > 0 && (
        <div className="relux-file-upload__preview-list" aria-label="Daftar berkas terunggah">
          {files.map((item) => (
            <div key={item.id} className="relux-file-upload__preview-item">
              <div className="flex items-center gap-2 overflow-hidden">
                <FileText className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <div className="truncate">
                  <p className="truncate text-xs font-semibold text-foreground">{item.file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(item.file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {item.status === 'completed' && (
                  <CheckCircle2 className="size-4 text-success" aria-label="Selesai" />
                )}
                {item.status === 'error' && (
                  <span className="flex items-center gap-1 text-xs text-destructive">
                    <AlertCircle className="size-3.5" />
                    <span>{item.error}</span>
                  </span>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(item.id)
                  }}
                  className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label={`Hapus berkas ${item.file.name}`}
                >
                  <X className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
