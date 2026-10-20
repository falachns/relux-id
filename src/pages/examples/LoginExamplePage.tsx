import { useState, type FormEvent } from 'react'
import { Shield, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react'
import { RelUXLogo } from '../../components/brand/RelUXLogo'
import { useLang } from '../../lib/i18n'
import type { SectionId } from '../../lib/nav'

export function LoginExamplePage({
  onNavigate: _onNavigate,
}: {
  onNavigate: (section: SectionId) => void
}) {
  const { lang } = useLang()
  const [showPassword, setShowPassword] = useState(false)
  const [nipp, setNipp] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [submitted, setSubmitted] = useState(false)

  const isEn = lang === 'en'

  const labels = isEn
    ? {
        tag: 'Example surface',
        title: 'Sign In & SSO KAI Portal',
        lead: 'Official authentication screen pattern for internal railway staff, crew, and corporate portal access.',
        cardTitle: 'Sign in with KAI Account',
        cardSubtitle: 'Enter your official employee ID (NIPP) or email to continue',
        nippLabel: 'Employee ID (NIPP) or Official Email',
        nippPlaceholder: 'e.g. 54321 or nama@kai.id',
        passwordLabel: 'Password',
        passwordPlaceholder: 'Enter your domain password',
        remember: 'Remember me on this trusted terminal',
        forgot: 'Forgot password?',
        submitBtn: 'Sign In to Portal',
        orDivider: 'or authenticate with',
        ssoBtn: 'Sign In with SuperApp KAI (SSO)',
        complianceTitle: 'IT Security & Compliance Notice',
        complianceBody: 'Access is restricted to authorized PT KAI personnel. All sessions are encrypted with AES-256 and monitored under ISO 27001 guidelines.',
        successMsg: 'Authentication simulated! Session created with role: Maintainer.',
      }
    : {
        tag: 'Halaman contoh',
        title: 'Portal Masuk & SSO KAI',
        lead: 'Pola layar autentikasi resmi untuk staf operasional, awak sarana perkeretaapian, dan portal korporat KAI.',
        cardTitle: 'Masuk dengan Akun KAI',
        cardSubtitle: 'Masukkan Nomor Induk Pegawai (NIPP) atau email dinas Anda',
        nippLabel: 'NIPP atau Email Dinas',
        nippPlaceholder: 'Contoh: 54321 atau nama@kai.id',
        passwordLabel: 'Kata Sandi',
        passwordPlaceholder: 'Masukkan kata sandi domain',
        remember: 'Ingat saya di perangkat terpercaya ini',
        forgot: 'Lupa kata sandi?',
        submitBtn: 'Masuk ke Sistem',
        orDivider: 'atau masuk menggunakan',
        ssoBtn: 'Masuk dengan SuperApp KAI (SSO)',
        complianceTitle: 'Pemberitahuan Kepatuhan Keamanan IT KAI',
        complianceBody: 'Sistem ini terbatas untuk pegawai resmi PT Kereta Api Indonesia (Persero). Seluruh akses diaudit secara ketat di bawah standar ISO 27001 dan enkripsi AES-256.',
        successMsg: 'Autentikasi tersimulasi! Sesi aktif dengan role: Maintainer.',
      }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!nipp || !password) return
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <article className="space-y-8">
      <div>
        <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
          {labels.tag}
        </p>
        <h1 className="display-md-bold text-foreground">{labels.title}</h1>
        <p className="mt-2 text-base text-muted-foreground">{labels.lead}</p>
      </div>

      <div className="mx-auto max-w-md">
        {/* Authentication Card */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="flex flex-col items-center text-center mb-6">
            <RelUXLogo height={32} />
            <h2 className="mt-4 text-lg font-bold text-foreground">{labels.cardTitle}</h2>
            <p className="mt-1 text-xs text-muted-foreground">{labels.cardSubtitle}</p>
          </div>

          {submitted && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 p-3 text-xs font-medium text-success">
              <CheckCircle2 className="size-4 shrink-0" />
              <span>{labels.successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                {labels.nippLabel}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  required
                  value={nipp}
                  onChange={(e) => setNipp(e.target.value)}
                  placeholder={labels.nippPlaceholder}
                  className="relux-input w-full pl-9 text-xs"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-foreground">
                  {labels.passwordLabel}
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => e.preventDefault()}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  {labels.forgot}
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={labels.passwordPlaceholder}
                  className="relux-input w-full pl-9 pr-9 text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="relux-checkbox"
              />
              <label htmlFor="remember" className="text-xs text-muted-foreground select-none cursor-pointer">
                {labels.remember}
              </label>
            </div>

            <button
              type="submit"
              className="relux-button relux-button--primary w-full text-xs font-semibold py-2.5 mt-2"
            >
              <span>{labels.submitBtn}</span>
              <ArrowRight className="size-3.5" />
            </button>
          </form>

          {/* SSO Separator */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-border" />
            </div>
            <span className="relative bg-card px-2 text-xs font-medium text-muted-foreground">
              {labels.orDivider}
            </span>
          </div>

          {/* SuperApp SSO */}
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="relux-button relux-button--secondary w-full text-xs font-semibold py-2.5 flex items-center justify-center gap-2 border border-primary/20 hover:border-primary/50"
          >
            <span className="size-2 rounded-full bg-primary" />
            <span>{labels.ssoBtn}</span>
          </button>
        </div>

        {/* Security & Compliance Banner */}
        <div className="mt-6 flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-3.5 text-left">
          <Shield className="size-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-xs">
            <h4 className="font-semibold text-foreground">{labels.complianceTitle}</h4>
            <p className="mt-0.5 text-muted-foreground leading-relaxed">
              {labels.complianceBody}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
