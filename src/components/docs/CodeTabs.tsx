import { useId, useState, type KeyboardEvent } from 'react'
import { CodeBlock } from './CodeBlock'
import { SnippetPreview } from './SnippetPreview'
import { useLang } from '../../lib/i18n'
import { useFramework, type Framework } from '../../lib/useFramework'
import { downloadComponentZip } from '../../lib/zipExporter'
import { Check, Copy, Download, Sparkles, Terminal } from 'lucide-react'

export type CodeSnippets = {
  blade?: string
  react?: string
  angular?: string
  css?: string
}

export type CodeTabItem = {
  label: string
  language: string
  code: string
}

export type CodeTabsProps = {
  componentName?: string
  snippets?: CodeSnippets
  tabs?: CodeTabItem[]
  preview?: {
    html: string
    css: string
    javascript?: string
  }
  defaultTab?: string
  aiPromptContent?: string
}

const FRAMEWORK_CONFIG: Record<Framework, { label: string; lang: string; install: string }> = {
  blade: {
    label: 'Blade/Livewire',
    lang: 'html',
    install: 'composer require kai/relux-ui',
  },
  react: {
    label: 'React',
    lang: 'tsx',
    install: 'npm i @kai/relux-react',
  },
  angular: {
    label: 'Angular',
    lang: 'html',
    install: 'npm i @kai/relux-angular',
  },
  css: {
    label: 'CSS',
    lang: 'html',
    install: 'npm i @kai/relux-css',
  },
}

export function CodeTabs({
  componentName,
  snippets,
  tabs,
  preview,
  defaultTab,
  aiPromptContent,
}: CodeTabsProps) {
  const { lang } = useLang()
  const uid = useId()
  const { framework, setFramework } = useFramework()
  const [showPreview, setShowPreview] = useState(defaultTab === 'preview')
  const [copiedAi, setCopiedAi] = useState(false)
  const [copiedInstall, setCopiedInstall] = useState(false)

  // Construct items
  type TabEntry = {
    id: string
    label: string
    code?: string
    language?: string
    isPreview?: boolean
    frameworkKey?: Framework
  }

  const tabList: TabEntry[] = []

  if (preview) {
    tabList.push({
      id: 'preview',
      label: lang === 'en' ? 'Preview' : 'Pratinjau',
      isPreview: true,
    })
  }

  if (snippets) {
    const fwKeys: Framework[] = ['blade', 'react', 'angular', 'css']
    for (const key of fwKeys) {
      const code = snippets[key]
      if (code) {
        tabList.push({
          id: key,
          label: FRAMEWORK_CONFIG[key].label,
          code,
          language: FRAMEWORK_CONFIG[key].lang,
          frameworkKey: key,
        })
      }
    }
  } else if (tabs) {
    for (const t of tabs) {
      tabList.push({
        id: t.label.toLowerCase(),
        label: t.label,
        code: t.code,
        language: t.language,
      })
    }
  }

  // Active tab selection
  const activeId = showPreview
    ? 'preview'
    : tabList.some((t) => t.id === framework)
      ? framework
      : tabList.find((t) => !t.isPreview)?.id || 'preview'

  const activeIndex = Math.max(0, tabList.findIndex((t) => t.id === activeId))
  const activeItem = tabList[activeIndex]

  const tabId = (i: number) => `${uid}-tab-${i}`
  const panelId = (i: number) => `${uid}-panel-${i}`

  const handleSelectTab = (entry: TabEntry) => {
    if (entry.isPreview) {
      setShowPreview(true)
    } else {
      setShowPreview(false)
      if (entry.frameworkKey) {
        setFramework(entry.frameworkKey)
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let target = -1
    if (e.key === 'ArrowRight') target = (i + 1) % tabList.length
    else if (e.key === 'ArrowLeft') target = (i - 1 + tabList.length) % tabList.length
    else if (e.key === 'Home') target = 0
    else if (e.key === 'End') target = tabList.length - 1

    if (target >= 0) {
      e.preventDefault()
      handleSelectTab(tabList[target])
      document.getElementById(tabId(target))?.focus()
    }
  }

  const currentInstallCmd = FRAMEWORK_CONFIG[framework]?.install || 'npm i @kai/relux-react'

  const copyInstall = async () => {
    await navigator.clipboard.writeText(currentInstallCmd)
    setCopiedInstall(true)
    setTimeout(() => setCopiedInstall(false), 2000)
  }

  const [downloadingZip, setDownloadingZip] = useState(false)

  const handleDownloadZip = async () => {
    const codeSnippet = activeItem?.code || snippets?.[framework] || ''
    if (!codeSnippet) return
    setDownloadingZip(true)
    try {
      const slug = (componentName || 'component').toLowerCase().replace(/\s+/g, '-')
      await downloadComponentZip({
        componentName: componentName || 'Component',
        slug,
        framework,
        code: codeSnippet,
        css: preview?.css,
      })
    } finally {
      setTimeout(() => setDownloadingZip(false), 1500)
    }
  }

  const copyForAi = async () => {
    const codeSnippet = activeItem?.code || snippets?.[framework] || ''
    const content = aiPromptContent || `# RelUX by KAI — Component: ${componentName || 'Component'}
Framework: ${FRAMEWORK_CONFIG[framework].label}

## Usage Code
\`\`\`${FRAMEWORK_CONFIG[framework].lang}
${codeSnippet}
\`\`\`

## Installation
\`\`\`bash
${currentInstallCmd}
\`\`\`

## Design Tokens & Styling
Uses canonical Make Kit KAI v1 variables (\`--colors/kai/...\`, \`--radius-...\`, \`--spacing-...\`).
`
    await navigator.clipboard.writeText(content)
    setCopiedAi(true)
    setTimeout(() => setCopiedAi(false), 2000)
  }

  return (
    <div className="space-y-3">
      {/* Tab controls & action bar */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="tablist"
          aria-label={lang === 'en' ? 'Framework switcher & preview' : 'Pilihan framework & pratinjau'}
          className="flex flex-wrap gap-1 rounded-lg border border-border/80 bg-muted/60 p-1 shadow-inner/10"
        >
          {tabList.map((item, i) => {
            const isSelected = item.id === activeId
            return (
              <button
                key={item.id}
                id={tabId(i)}
                role="tab"
                aria-selected={isSelected}
                aria-controls={panelId(i)}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => handleSelectTab(item)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className={
                  'rounded-md px-3 py-1.5 text-xs sm:text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ' +
                  (isSelected
                    ? 'bg-card text-foreground shadow-xs font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-card/40')
                }
              >
                {item.label}
              </button>
            )
          })}
        </div>

        {/* Developer Helper Actions: CLI install command & Copy for AI */}
        <div className="flex flex-wrap items-center gap-2">
          {!showPreview && (
            <button
              type="button"
              onClick={copyInstall}
              title={`Salin: ${currentInstallCmd}`}
              className="relux-focus inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 text-xs font-mono font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 active:scale-[0.98] transition-all shadow-xs"
            >
              <Terminal className="size-3.5 text-primary" aria-hidden="true" />
              <span>{copiedInstall ? (lang === 'en' ? 'Copied CLI!' : 'Tersalin!') : currentInstallCmd}</span>
              {copiedInstall ? <Check className="size-3 text-success" /> : <Copy className="size-3" />}
            </button>
          )}

          {!showPreview && (
            <button
              type="button"
              onClick={handleDownloadZip}
              title={lang === 'en' ? `Download ${FRAMEWORK_CONFIG[framework].label} component zip bundle` : `Unduh bundle zip komponen ${FRAMEWORK_CONFIG[framework].label}`}
              className="relux-focus inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 text-xs font-semibold text-foreground hover:border-primary/50 hover:bg-muted/30 active:scale-[0.98] transition-all shadow-xs"
            >
              <Download className="size-3.5 text-primary" aria-hidden="true" />
              <span>{downloadingZip ? (lang === 'en' ? 'Exporting...' : 'Mengunduh...') : 'Download Zip'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={copyForAi}
            title={lang === 'en' ? 'Copy structured prompt for AI coding assistant' : 'Salin prompt terstruktur untuk coding assistant AI'}
            className="relux-focus inline-flex h-8 items-center gap-1.5 rounded-lg border border-primary/25 bg-primary/10 px-2.5 text-xs font-semibold text-primary hover:bg-primary/20 active:scale-[0.98] transition-all shadow-xs"
          >
            <Sparkles className="size-3.5" aria-hidden="true" />
            <span>{copiedAi ? (lang === 'en' ? 'Copied for AI!' : 'Prompt Tersalin!') : 'Copy for AI'}</span>
          </button>
        </div>
      </div>

      {/* Panels */}
      {tabList.map((item, i) => {
        const isSelected = item.id === activeId
        return (
          <div
            key={item.id}
            id={panelId(i)}
            role="tabpanel"
            aria-labelledby={tabId(i)}
            hidden={!isSelected}
          >
            {isSelected && (
              item.isPreview && preview ? (
                <SnippetPreview
                  html={preview.html}
                  css={preview.css}
                  javascript={preview.javascript}
                />
              ) : item.code ? (
                <CodeBlock code={item.code} language={item.language || 'html'} />
              ) : null
            )}
          </div>
        )
      })}
    </div>
  )
}
