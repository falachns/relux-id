import type { ReactNode } from 'react'
import { useLang } from '../../lib/i18n'

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export function Section({
  id: explicitId,
  title,
  children,
  contentClassName = '',
}: {
  id?: string
  title: string
  children: ReactNode
  contentClassName?: string
}) {
  const id = explicitId ?? slugify(title)
  const { section } = useLang()
  return (
    <section id={id} className="mt-12 scroll-mt-24 first:mt-8">
      <h2 className="mb-4 display-xs-semibold text-foreground">
        {section(title)}
      </h2>
      <div
        className={
          'text-sm leading-relaxed text-muted-foreground [&_strong]:text-foreground ' +
          contentClassName
        }
      >
        {children}
      </div>
    </section>
  )
}
