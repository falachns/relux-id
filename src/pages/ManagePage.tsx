import { useState, useEffect, type FormEvent } from 'react'
import { PageHeader } from '../components/docs/PageHeader'
import { StatusBadge } from '../components/docs/StatusBadge'
import { useLang } from '../lib/i18n'
import {
  GitPullRequest,
  CheckCircle2,
  Clock,
  XCircle,
  ExternalLink,
  PlusCircle,
  FileEdit,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react'

export type ChangeRequest = {
  id: string
  component: string
  figmaUrl: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'open' | 'in progress' | 'done' | 'rejected'
  author: string
  createdAt: string
}

const DEFAULT_REQUESTS: ChangeRequest[] = [
  {
    id: 'CR-101',
    component: 'Button',
    figmaUrl: 'https://www.figma.com/design/DS-KAI-v1?node-id=124:4501',
    title: 'Penambahan Varian Sub-Brand Bandara (Raillink)',
    description: 'Menambahkan background gradien oranye/biru untuk pemesanan KAI Bandara sesuai rilis identitas visual Q3.',
    priority: 'high',
    status: 'in progress',
    author: 'Rina (UI/UX Designer)',
    createdAt: '2026-10-18',
  },
  {
    id: 'CR-102',
    component: 'Badge',
    figmaUrl: 'https://www.figma.com/design/DS-KAI-v1?node-id=124:4711',
    title: 'Peningkatan Kontras Dot Indicator pada Dark Mode',
    description: 'Menyesuaikan border ring pada dot status online/offline agar memenuhi rasio kontras WCAG AA di background gelap.',
    priority: 'medium',
    status: 'open',
    author: 'Fajar (Accessibility Lead)',
    createdAt: '2026-10-19',
  },
  {
    id: 'CR-103',
    component: 'Modal & Dialog',
    figmaUrl: 'https://www.figma.com/design/DS-KAI-v1?node-id=124:5300',
    title: 'Dukungan Konfirmasi Pembatalan Tiket Kereta Cepat',
    description: 'Menyediakan template dialog konfirmasi pengembalian dana (refund) dengan kalkulasi penalti otomatis.',
    priority: 'low',
    status: 'done',
    author: 'Hendra (Tech Lead Frontend)',
    createdAt: '2026-10-15',
  },
]

const STORAGE_KEY = 'relux_change_requests_v1'

export function ManagePage() {
  const { lang } = useLang()
  const [requests, setRequests] = useState<ChangeRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : DEFAULT_REQUESTS
    } catch {
      return DEFAULT_REQUESTS
    }
  })

  // Form state
  const [component, setComponent] = useState('Button')
  const [figmaUrl, setFigmaUrl] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<ChangeRequest['priority']>('medium')
  const [author, setAuthor] = useState('Designer (UI/UX KAI)')
  const [activeTab, setActiveTab] = useState<'requests' | 'revisions'>('requests')

  // Revision review state
  const [revisionStatus, setRevisionStatus] = useState<'pending' | 'approved' | 'rejected'>('pending')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests))
  }, [requests])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) return

    const newReq: ChangeRequest = {
      id: `CR-${Math.floor(100 + Math.random() * 900)}`,
      component,
      figmaUrl: figmaUrl.trim() || 'https://www.figma.com/design/DS-KAI-v1',
      title: title.trim(),
      description: description.trim(),
      priority,
      status: 'open',
      author,
      createdAt: new Date().toISOString().split('T')[0],
    }

    setRequests([newReq, ...requests])
    setTitle('')
    setDescription('')
    setFigmaUrl('')
  }

  const updateStatus = (id: string, newStatus: ChangeRequest['status']) => {
    setRequests(
      requests.map((r) => (r.id === id ? { ...r, status: newStatus } : r)),
    )
  }

  const resetDefaults = () => {
    setRequests(DEFAULT_REQUESTS)
  }

  const priorityColor: Record<ChangeRequest['priority'], string> = {
    low: 'bg-muted text-muted-foreground',
    medium: 'bg-primary/10 text-primary border border-primary/20',
    high: 'bg-warning/15 text-warning border border-warning/30',
    critical: 'bg-danger/15 text-danger border border-danger/30 font-semibold',
  }

  const statusBadge = (st: ChangeRequest['status']) => {
    switch (st) {
      case 'open':
        return (
          <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium bg-muted text-foreground border border-border">
            <Clock className="size-3 text-muted-foreground" /> Open
          </span>
        )
      case 'in progress':
        return (
          <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary border border-primary/20">
            <GitPullRequest className="size-3" /> In Progress
          </span>
        )
      case 'done':
        return (
          <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium bg-success/15 text-success border border-success/30">
            <CheckCircle2 className="size-3" /> Done
          </span>
        )
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium bg-danger/10 text-danger border border-danger/20">
            <XCircle className="size-3" /> Rejected
          </span>
        )
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={lang === 'en' ? 'Design System Management' : 'Manajemen Design System'}
        description={
          lang === 'en'
            ? 'Interactive developer prototype for PRD §5.11 & §7.5. Manage component change requests, Figma node links, and content approval workflows.'
            : 'Prototipe developer interaktif untuk PRD §5.11 & §7.5. Kelola pengajuan perubahan komponen, link node Figma, dan alur persetujuan revisi konten.'
        }
      >
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status="beta" />
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-mono font-medium text-primary">
            <ShieldCheck className="size-3.5" />
            RELUX_DEV_LOGIN=true (Role: Maintainer)
          </span>
        </div>
      </PageHeader>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('requests')}
          className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
            activeTab === 'requests'
              ? 'bg-card text-foreground shadow-xs border border-border'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <GitPullRequest className="size-4 text-primary" />
          <span>{lang === 'en' ? 'Change Requests' : 'Permintaan Perubahan (CR)'}</span>
          <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-xs font-bold leading-none text-primary">
            {requests.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('revisions')}
          className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
            activeTab === 'revisions'
              ? 'bg-card text-foreground shadow-xs border border-border'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <FileEdit className="size-4 text-accent" />
          <span>{lang === 'en' ? 'Content Revision Approval' : 'Persetujuan Revisi Konten'}</span>
          <span className="rounded-full bg-warning/20 px-1.5 py-0.5 text-xs font-bold leading-none text-warning">
            1 Pending
          </span>
        </button>
      </div>

      {activeTab === 'requests' ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-1">
            <div className="rounded-lg border border-border bg-card p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <PlusCircle className="size-4 text-primary" />
                <h2 className="text-sm font-bold text-foreground">
                  {lang === 'en' ? 'Submit Change Request' : 'Ajukan Perubahan Komponen'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    {lang === 'en' ? 'Target Component' : 'Komponen'}
                  </label>
                  <select
                    value={component}
                    onChange={(e) => setComponent(e.target.value)}
                    className="relux-select w-full text-xs"
                  >
                    <option value="Button">Button</option>
                    <option value="Input">Input (Form Controls)</option>
                    <option value="Badge">Badge & Tag</option>
                    <option value="Alert">Alert & Banner</option>
                    <option value="Card">Card</option>
                    <option value="Data Table">Data Table</option>
                    <option value="Navigation">Navigation & Tabs</option>
                    <option value="Modal & Dialog">Modal & Dialog</option>
                    <option value="Accordion">Accordion</option>
                    <option value="Avatar">Avatar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    {lang === 'en' ? 'Figma Node Link' : 'URL Node Figma'}
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.figma.com/design/..."
                    value={figmaUrl}
                    onChange={(e) => setFigmaUrl(e.target.value)}
                    className="relux-input w-full text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    {lang === 'en' ? 'Title / Summary' : 'Judul Perubahan'} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Tambah varian tombol..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="relux-input w-full text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    {lang === 'en' ? 'Detailed Description' : 'Deskripsi & Alasan Kebutuhan'} *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Jelaskan kebutuhan fungsional dan desain..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="relux-input w-full text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      {lang === 'en' ? 'Priority' : 'Prioritas'}
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as ChangeRequest['priority'])}
                      className="relux-select w-full text-xs"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      {lang === 'en' ? 'Author' : 'Pengaju'}
                    </label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="relux-input w-full text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="relux-button relux-button--primary w-full text-xs font-semibold mt-2"
                >
                  <PlusCircle className="size-3.5" />
                  <span>{lang === 'en' ? 'Create Change Request' : 'Kirim Permintaan'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-foreground">
                {lang === 'en' ? 'Active Change Requests' : 'Daftar Change Requests'}
              </h2>
              <button
                type="button"
                onClick={resetDefaults}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                title="Reset mock data"
              >
                <RotateCcw className="size-3" />
                <span>Reset Demo</span>
              </button>
            </div>

            <div className="space-y-3">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="rounded-lg border border-border bg-card p-4 shadow-xs space-y-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-primary">{req.id}</span>
                        <span className="font-semibold text-foreground text-sm">{req.title}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span>Komponen: <strong className="text-foreground">{req.component}</strong></span>
                        <span>•</span>
                        <span>Oleh: {req.author}</span>
                        <span>•</span>
                        <span>{req.createdAt}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`rounded px-2 py-0.5 text-xs font-medium uppercase leading-none ${priorityColor[req.priority]}`}>
                        {req.priority}
                      </span>
                      {statusBadge(req.status)}
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {req.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border">
                    <a
                      href={req.figmaUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      <ExternalLink className="size-3" />
                      <span>Lihat Node di Figma</span>
                    </a>

                    {/* Maintainer Actions */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-muted-foreground">Ubah Status:</span>
                      <button
                        type="button"
                        onClick={() => updateStatus(req.id, 'in progress')}
                        className="rounded px-2 py-0.5 text-xs font-medium bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        In Progress
                      </button>
                      <button
                        type="button"
                        onClick={() => updateStatus(req.id, 'done')}
                        className="rounded px-2 py-0.5 text-xs font-medium bg-muted hover:bg-success/15 hover:text-success transition-colors"
                      >
                        Done
                      </button>
                      <button
                        type="button"
                        onClick={() => updateStatus(req.id, 'rejected')}
                        className="rounded px-2 py-0.5 text-xs font-medium bg-muted hover:bg-danger/15 hover:text-danger transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Content Revision Workflow Preview */
        <div className="rounded-lg border border-border bg-card p-6 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-bold text-foreground">
              {lang === 'en' ? 'Pending Content Revisions' : 'Revisi Konten Menunggu Persetujuan'}
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {lang === 'en'
                ? 'PRD §5.11: Changes submitted by Editors remain pending until approved by a Maintainer. Only approved content is published to the public documentation.'
                : 'PRD §5.11: Perubahan yang disunting oleh Editor berstatus "pending" sampai disetujui Maintainer. Hanya konten yang telah disetujui yang tampil di dokumentasi publik.'}
            </p>
          </div>

          <div className="rounded-md border border-border p-4 bg-muted/30 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-accent">REV-042</span>
                <h3 className="text-sm font-semibold text-foreground">
                  Button Component — Update Guideline "Do & Don't" Penggunaan Warna Destruktif
                </h3>
                <p className="text-xs text-muted-foreground">
                  Diusulkan oleh: <strong>Rina (UI/UX Designer)</strong> · 2026-10-20
                </p>
              </div>

              <div>
                {revisionStatus === 'pending' && (
                  <span className="rounded-full bg-warning/15 px-3 py-1 text-xs font-semibold text-warning border border-warning/30">
                    Pending Review
                  </span>
                )}
                {revisionStatus === 'approved' && (
                  <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success border border-success/30">
                    Approved & Published
                  </span>
                )}
                {revisionStatus === 'rejected' && (
                  <span className="rounded-full bg-danger/15 px-3 py-1 text-xs font-semibold text-danger border border-danger/30">
                    Revision Rejected
                  </span>
                )}
              </div>
            </div>

            {/* Diff view mockup */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="rounded border border-danger/30 bg-danger/5 p-3">
                <div className="font-sans font-bold text-danger mb-2">Konten Lama (Current Live):</div>
                <div className="text-muted-foreground">
                  - Gunakan tombol merah untuk aksi penting.<br />
                  - Jangan pakai tombol merah untuk tombol cancel.
                </div>
              </div>
              <div className="rounded border border-success/30 bg-success/5 p-3">
                <div className="font-sans font-bold text-success mb-2">Konten Usulan Baru (Pending):</div>
                <div className="text-foreground">
                  + <strong>DO:</strong> Gunakan `variant="destructive"` HANYA untuk aksi ireversibel (misal: Pembatalan Tiket, Hapus Data Akun).<br />
                  + <strong>DON'T:</strong> Jangan menggunakan varian destruktif pada form sekunder atau aksi 'Kembali'.
                </div>
              </div>
            </div>

            {/* Approval buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <button
                type="button"
                onClick={() => setRevisionStatus('rejected')}
                className="relux-button relux-button--outline text-xs text-danger hover:border-danger"
              >
                Tolak Revisi (Reject)
              </button>
              <button
                type="button"
                onClick={() => setRevisionStatus('approved')}
                className="relux-button relux-button--primary text-xs"
              >
                Setujui & Publikasikan (Approve)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
