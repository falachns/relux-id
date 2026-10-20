import { KIT_TOKENS, KIT_TYPOGRAPHY, KIT_VERSION } from '../generated/kit-catalog'
import { PageHeader } from '../components/docs/PageHeader'
import { TokenDownloadBar } from '../components/docs/TokenDownloadBar'
import { useLocalized, type Localized } from '../lib/i18n'
import type { SectionId } from '../lib/nav'

type PageCopy = {
  title: string
  category: string
  description: string
  fontFamilyTitle: string
  fontFamilySample: string
  tokensTitle: string
  tokenCountSuffix: string
  tokenColumnToken: string
  tokenColumnValue: string
  tokenColumnFamily: string
  classesTitle: string
  classesCountSuffix: string
}

const COPY = {
  id: {
    title: 'Tipografi',
    category: 'Fondasi',
    description: `RelUX hanya memakai Inter dan ${KIT_TYPOGRAPHY.length} class tipografi yang diekspor Make Kit ${KIT_VERSION}.`,
    fontFamilyTitle: 'Font family',
    fontFamilySample: 'Aa Bb Cc Dd Ee — Selamat datang di RelUX Kereta Api Indonesia',
    tokensTitle: 'Token tipografi',
    tokenCountSuffix: 'token',
    tokenColumnToken: 'Token',
    tokenColumnValue: 'Nilai',
    tokenColumnFamily: 'Family',
    classesTitle: 'Class tipografi',
    classesCountSuffix: 'class',
  },
  en: {
    title: 'Typography',
    category: 'Foundation',
    description: `RelUX strictly adopts Inter and the ${KIT_TYPOGRAPHY.length} canonical typography utility classes exported by Make Kit ${KIT_VERSION}.`,
    fontFamilyTitle: 'Font family',
    fontFamilySample: 'Aa Bb Cc Dd Ee — Welcome to RelUX Kereta Api Indonesia',
    tokensTitle: 'Typography tokens',
    tokenCountSuffix: 'tokens',
    tokenColumnToken: 'Token',
    tokenColumnValue: 'Value',
    tokenColumnFamily: 'Family',
    classesTitle: 'Typography classes',
    classesCountSuffix: 'classes',
  },
} satisfies Localized<PageCopy>

export function TypographyPage({
  onNavigate,
}: {
  onNavigate?: (section: SectionId) => void
}) {
  const t = useLocalized(COPY)
  const typeTokens = KIT_TOKENS.filter((token) =>
    token.family.startsWith('Typography'),
  )

  return (
    <article className="mx-auto max-w-3xl">
      <PageHeader
        category={t.category}
        title={t.title}
        status="stable"
        description={t.description}
      />

      <TokenDownloadBar />

      <section id="font-family" className="mt-10 scroll-mt-24">
        <h2 className="display-xs-semibold text-foreground">{t.fontFamilyTitle}</h2>
        <div className="relux-card mt-4 p-6">
          <p className="display-sm-semibold text-foreground">Inter</p>
          <p className="mt-3 text-base text-muted-foreground">
            {t.fontFamilySample}
          </p>
        </div>
      </section>

      <section id="typography-tokens" className="mt-10 scroll-mt-24">
        <div className="flex items-end justify-between gap-4">
          <h2 className="display-xs-semibold text-foreground">
            {t.tokensTitle}
          </h2>
          <span className="text-xs text-muted-foreground">
            {typeTokens.length} {t.tokenCountSuffix}
          </span>
        </div>
        <div className="mt-4 overflow-x-auto rounded-lg border border-border">
          <table className="relux-table">
            <thead>
              <tr>
                <th>{t.tokenColumnToken}</th>
                <th>{t.tokenColumnValue}</th>
                <th>{t.tokenColumnFamily}</th>
              </tr>
            </thead>
            <tbody>
              {typeTokens.map((token) => (
                <tr key={token.name}>
                  <th scope="row">
                    <code className="font-mono text-xs text-primary">
                      {token.name}
                    </code>
                  </th>
                  <td className="font-mono text-xs text-muted-foreground">
                    {token.value}
                  </td>
                  <td className="text-xs text-muted-foreground">{token.family}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="typography-classes" className="mt-10 scroll-mt-24">
        <div className="flex items-end justify-between gap-4">
          <h2 className="display-xs-semibold text-foreground">
            {t.classesTitle}
          </h2>
          <span className="text-xs text-muted-foreground">
            {KIT_TYPOGRAPHY.length} {t.classesCountSuffix}
          </span>
        </div>
        <div className="relux-card mt-4 divide-y divide-border overflow-hidden">
          {KIT_TYPOGRAPHY.map((item) => (
            <div key={item.className} className="grid gap-3 p-4 sm:grid-cols-[12rem_1fr] sm:items-center">
              <div>
                <code className="font-mono text-xs text-primary">
                  .{item.className}
                </code>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item['font-size']} / {item['line-height']} / {item['font-weight']}
                </p>
              </div>
              <p className={`${item.className} min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-foreground`}>
                RelUX Kereta Api Indonesia
              </p>
            </div>
          ))}
        </div>
      </section>
    </article>
  )
}
