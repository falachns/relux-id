import { useState } from 'react'
import { CheckCircle2, KeyRound, QrCode, Smartphone } from 'lucide-react'
import { Section } from '../../components/docs/Section'
import { useLang } from '../../lib/i18n'
import type { SectionId } from '../../lib/nav'

export function GoogleAuthExamplePage({
  onNavigate: _onNavigate,
}: {
  onNavigate: (section: SectionId) => void
}) {
  const { lang } = useLang()
  const [platform, setPlatform] = useState<'web' | 'mobile'>('web')
  const steps: Array<[string, typeof Smartphone]> =
    platform === 'web'
      ? [
          ['install', Smartphone],
          ['credential', KeyRound],
          ['qr', QrCode],
          ['otp', KeyRound],
          ['success', CheckCircle2],
        ]
      : [
          ['credential', Smartphone],
          ['method', KeyRound],
          ['qr', QrCode],
          ['otp', KeyRound],
          ['success', CheckCircle2],
        ]
  const names: Record<string, [string, string]> = {
    install: ['Install Google Authenticator di HP', 'Install Google Authenticator on your phone'],
    credential: ['Masukkan credential ESA', 'Enter your ESA credentials'],
    method: ['Pilih cara pendaftaran', 'Choose a registration method'],
    qr: ['Daftarkan akun dengan QR atau secret key', 'Register with QR or a secret key'],
    otp: ['Masukkan kode OTP', 'Enter the OTP code'],
    success: ['Verifikasi berhasil', 'Verification successful'],
  }

  return (
    <article>
      <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
        {lang === 'en' ? 'Example guide' : 'Panduan contoh'}
      </p>
      <h1 className="display-md-bold text-foreground">
        {lang === 'en' ? 'Google Authenticator guide' : 'Panduan Google Authenticator'}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        {lang === 'en'
          ? 'Accessible setup flows for ESA Web and ESA Mobile.'
          : 'Alur setup aksesibel untuk ESA Web dan ESA Mobile.'}
      </p>

      <div className="mt-8 inline-flex rounded-lg border border-border bg-muted p-1" role="tablist">
        {(['web', 'mobile'] as const).map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={platform === item}
            onClick={() => setPlatform(item)}
            className={
              'relux-focus rounded-md px-4 py-2 text-sm font-semibold ' +
              (platform === item ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground')
            }
          >
            ESA {item === 'web' ? 'Web' : 'Mobile'}
          </button>
        ))}
      </div>

      <Section id="auth-steps" title={platform === 'web' ? 'ESA Web' : 'ESA Mobile'}>
        <ol className="space-y-4">
          {steps.map(([id, Icon], index) => (
            <li key={id} className="relux-card flex gap-4 p-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-soft text-primary">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {lang === 'en' ? `Step ${index + 1}` : `Langkah ${index + 1}`}
                </p>
                <p className="mt-1 font-semibold text-foreground">
                  {names[id][lang === 'en' ? 1 : 0]}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </article>
  )
}
