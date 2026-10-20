import { ShieldCheck, TicketCheck, Train } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Section } from '../../components/docs/Section'
import { useLang } from '../../lib/i18n'
import type { SectionId } from '../../lib/nav'

export function LandingExamplePage({
  onNavigate: _onNavigate,
}: {
  onNavigate: (section: SectionId) => void
}) {
  const { lang } = useLang()
  const copy =
    lang === 'en'
      ? {
          eyebrow: 'Example page',
          title: 'Travel farther with KAI',
          lead: 'A public landing-page pattern with ticket search, service benefits, promotions, and a conversion CTA.',
          search: 'Search tickets',
          why: 'Why choose KAI?',
          save: 'Save more',
          ready: 'Ready to start your journey?',
        }
      : {
          eyebrow: 'Halaman contoh',
          title: 'Melaju lebih jauh bersama KAI',
          lead: 'Pola landing page publik dengan pencarian tiket, manfaat layanan, promo, dan CTA konversi.',
          search: 'Cari tiket',
          why: 'Mengapa memilih KAI?',
          save: 'Hemat lebih banyak',
          ready: 'Siap memulai perjalanan?',
        }
  return (
    <article>
      <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
        {copy.eyebrow}
      </p>
      <div className="relux-example-shell p-6 sm:p-10">
        <Train aria-hidden="true" className="size-10 text-primary" />
        <h1 className="display-md-bold mt-5 max-w-2xl text-foreground">
          {copy.title}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">{copy.lead}</p>
        <form className="relux-card mt-8 grid gap-3 p-4 sm:grid-cols-3" onSubmit={(event) => event.preventDefault()}>
          <label className="text-sm font-semibold text-foreground">
            {lang === 'en' ? 'Origin' : 'Asal'}
            <input className="relux-field mt-2" defaultValue="Gambir" />
          </label>
          <label className="text-sm font-semibold text-foreground">
            {lang === 'en' ? 'Destination' : 'Tujuan'}
            <input className="relux-field mt-2" defaultValue="Surabaya" />
          </label>
          <Button type="submit" className="self-end">{copy.search}</Button>
        </form>
      </div>

      <Section id="why-kai" title={copy.why}>
        <div className="grid gap-3 sm:grid-cols-3">
          {[Train, ShieldCheck, TicketCheck].map((Icon, index) => (
            <article key={index} className="relux-card p-5">
              <Icon aria-hidden="true" className="size-5 text-primary" />
              <p className="mt-3 font-semibold text-foreground">
                {index === 0
                  ? lang === 'en' ? 'Connected' : 'Terhubung'
                  : index === 1
                    ? lang === 'en' ? 'Reliable' : 'Andal'
                    : lang === 'en' ? 'Simple booking' : 'Pemesanan mudah'}
              </p>
            </article>
          ))}
        </div>
      </Section>
      <Section id="save-more" title={copy.save}>
        <div className="relux-card p-6 text-foreground">
          {lang === 'en' ? 'Member-only fares and seasonal promotions.' : 'Harga khusus member dan promo musiman.'}
        </div>
      </Section>
      <Section id="ready" title={copy.ready}>
        <Button>{copy.search}</Button>
      </Section>
    </article>
  )
}
