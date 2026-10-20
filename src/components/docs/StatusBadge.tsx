import { useLang } from '../../lib/i18n'

export type Status = 'stable' | 'beta' | 'deprecated'

const LABEL: Record<Status, { id: string; en: string }> = {
  stable: { id: 'Stabil', en: 'Stable' },
  beta: { id: 'Beta', en: 'Beta' },
  deprecated: { id: 'Usang', en: 'Deprecated' },
}

const STYLES: Record<Status, string> = {
  stable: 'bg-success-soft text-success',
  beta: 'bg-warning-soft text-warning',
  deprecated: 'bg-danger-soft text-destructive',
}

export function StatusBadge({ status }: { status: Status }) {
  const { lang } = useLang()
  return (
    <span
      className={
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold select-none border border-current/20 shadow-xs ' +
        STYLES[status]
      }
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      <span>{LABEL[status][lang]}</span>
    </span>
  )
}
