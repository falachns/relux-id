import { useState } from 'react'
import type { ReactNode } from 'react'
import { Section } from '../components/docs/Section'
import { ComponentCode } from '../components/docs/ComponentCode'
import { PropsTable } from '../components/docs/PropsTable'
import { PageHeader } from '../components/docs/PageHeader'
import { ChevronDown } from 'lucide-react'
import {
  FormField,
  Input,
  PasswordInput,
  Select,
  Textarea,
  Checkbox,
  Radio,
  Switch,
} from '../components/ui'
import { useLocalized, type Localized } from '../lib/i18n'
import type { SectionId } from '../lib/nav'

function Demo({ children }: { children: ReactNode }) {
  return <div className="rounded-lg border border-border bg-muted/40 p-6">{children}</div>
}

type PageCopy = {
  title: string
  description: string
  textPasswordTitle: string
  textareaTitle: string
  selectTitle: string
  checkRadioTitle: string
  switchTitle: string
  codeTitle: string
  tokensTitle: string
  a11yTitle: string
  fullNameLabel: string
  fullNameHint: string
  emailLabel: string
  emailHint: string
  emailError: string
  bookingCodeLabel: string
  bookingCodeHint: string
  passwordLabel: string
  passwordHint: string
  dateLabel: string
  notesLabel: string
  notesHint: string
  notesPlaceholder: string
  trainClassLabel: string
  additionalServicesTitle: string
  paymentMethodsTitle: string
  switchLabel: string
  switchHint: string
  tokenRows: { part: string; token: string }[]
  a11yItems: string[]
  faqTitle: string
  faqs: { q: string; a: string }[]
  changelogTitle: string
}

const COPY = {
  id: {
    title: 'Form Controls',
    description: 'Kontrol formulir untuk mengumpulkan data penumpang: input teks, password show/hide, textarea, select, checkbox, radio, dan switch.',
    textPasswordTitle: 'Input teks & Password',
    textareaTitle: 'Textarea',
    selectTitle: 'Select',
    checkRadioTitle: 'Checkbox & Radio',
    switchTitle: 'Switch',
    codeTitle: 'Contoh kode',
    tokensTitle: 'Token',
    a11yTitle: 'Aksesibilitas',
    fullNameLabel: 'Nama lengkap',
    fullNameHint: 'Sesuai kartu identitas.',
    emailLabel: 'Email',
    emailHint: 'Tiket elektronik dikirim ke email ini.',
    emailError: 'Tulis email dengan format nama@domain.com.',
    bookingCodeLabel: 'Kode booking',
    bookingCodeHint: 'Tidak dapat diubah.',
    passwordLabel: 'Password',
    passwordHint: 'Minimal 8 karakter.',
    dateLabel: 'Tanggal keberangkatan',
    notesLabel: 'Catatan perjalanan',
    notesHint: 'Opsional. Maksimal 200 karakter.',
    notesPlaceholder: 'Contoh: Membawa kursi roda atau butuh bantuan porter...',
    trainClassLabel: 'Kelas kereta',
    additionalServicesTitle: 'Layanan tambahan',
    paymentMethodsTitle: 'Metode pembayaran',
    switchLabel: 'Kirim notifikasi jadwal keberangkatan',
    switchHint: 'Dapatkan pembaruan real-time bila ada peron atau jadwal berubah',
    tokenRows: [
      { part: 'Latar field', token: 'var(--input-background)' },
      { part: 'Batas field', token: 'var(--border)' },
      { part: 'Cincin fokus', token: 'var(--ring)' },
      { part: 'Error', token: 'var(--destructive)' },
      { part: 'Checkbox / radio / switch aktif', token: 'var(--primary)' },
      { part: 'Radius', token: 'var(--radius-md)' },
    ],
    a11yItems: [
      'Setiap kontrol punya label terlihat. Placeholder bukan pengganti label.',
      'Pesan bantuan dan error ditautkan lewat aria-describedby.',
      'Error validasi muncul setelah field kehilangan fokus (onBlur), bukan saat mengetik.',
      'Grup checkbox dan radio dibungkus fieldset dengan legend semantik.',
      'Font input minimal 16px di viewport mobile untuk mencegah auto-zoom iOS.',
    ],
    faqTitle: 'Pertanyaan Umum (FAQ)',
    faqs: [
      {
        q: 'Bagaimana cara menampilkan pesan error validasi yang aksesibel?',
        a: 'Bungkus input di dalam komponen <FormField error="Pesan error">. Komponen akan otomatis mengaitkan pesan error dengan atribut aria-describedby dan mengatur aria-invalid="true" pada kontrol input.',
      },
      {
        q: 'Bagaimana cara menonaktifkan seluruh input dalam form?',
        a: 'Gunakan atribut disabled native pada kontrol individual atau bungkus sekumpulan kontrol dengan elemen <fieldset disabled> untuk menonaktifkan semuanya secara deklaratif.',
      },
      {
        q: 'Apakah form controls mendukung Server-Side Rendering (SSR) dan Livewire?',
        a: 'Ya, seluruh elemen form dikompilasi ke elemen native HTML dengan kelas CSS canonical (.relux-input, .relux-select, dll.) dan mendukung binding kustom wire:model pada Laravel Livewire, React Hook Form, atau Angular Reactive Forms.',
      },
      {
        q: 'Mengapa font-size input pada layar sentuh mobile minimal 16px?',
        a: 'Ukuran font 16px (1rem) adalah standar antarmuka untuk mencegah peramban mobile seperti iOS Safari melakukan auto-zoom otomatis saat pengguna mengetuk field input.',
      },
    ],
    changelogTitle: 'Riwayat Perubahan Komponen',
  },
  en: {
    title: 'Form Controls',
    description: 'Accessible form elements for collecting journey data: text input, password show/hide, textarea, select, checkbox, radio, and switch.',
    textPasswordTitle: 'Text input & Password',
    textareaTitle: 'Textarea',
    selectTitle: 'Select dropdown',
    checkRadioTitle: 'Checkbox & Radio',
    switchTitle: 'Switch toggle',
    codeTitle: 'Code example',
    tokensTitle: 'Tokens',
    a11yTitle: 'Accessibility',
    fullNameLabel: 'Full name',
    fullNameHint: 'Matches national ID / passport.',
    emailLabel: 'Email address',
    emailHint: 'Your e-ticket receipt is sent to this address.',
    emailError: 'Please enter a valid email format (name@domain.com).',
    bookingCodeLabel: 'Booking code',
    bookingCodeHint: 'Read-only identifier.',
    passwordLabel: 'Password',
    passwordHint: 'At least 8 characters.',
    dateLabel: 'Departure date',
    notesLabel: 'Journey notes',
    notesHint: 'Optional. Maximum 200 characters.',
    notesPlaceholder: 'e.g. Traveling with wheelchair or require porter assistance...',
    trainClassLabel: 'Train class',
    additionalServicesTitle: 'Additional services',
    paymentMethodsTitle: 'Payment methods',
    switchLabel: 'Send departure schedule notifications',
    switchHint: 'Receive real-time alerts if platform or timing updates',
    tokenRows: [
      { part: 'Field background', token: 'var(--input-background)' },
      { part: 'Field border', token: 'var(--border)' },
      { part: 'Focus ring', token: 'var(--ring)' },
      { part: 'Error tone', token: 'var(--destructive)' },
      { part: 'Active checkbox / radio / switch', token: 'var(--primary)' },
      { part: 'Border radius', token: 'var(--radius-md)' },
    ],
    a11yItems: [
      'Every control has a visible label. Placeholders are never used as labels.',
      'Helper texts and error notices link via aria-describedby identifiers.',
      'Validation errors fire on blur, avoiding premature disruption during typing.',
      'Checkbox and radio groups are enclosed in semantic fieldset and legend tags.',
      'Mobile inputs maintain 16px font-size to prevent automatic Safari iOS zooming.',
    ],
    faqTitle: 'Frequently Asked Questions (FAQ)',
    faqs: [
      {
        q: 'How do I render accessible validation error notices?',
        a: 'Wrap controls inside <FormField error="...">. The component connects the error paragraph with aria-describedby and marks the input with aria-invalid="true".',
      },
      {
        q: 'How can I disable an entire group of inputs at once?',
        a: 'Apply the disabled prop to individual controls or encapsulate related fields inside a native <fieldset disabled> element.',
      },
      {
        q: 'Are form controls compatible with SSR, Livewire, and Angular?',
        a: 'Yes, form controls resolve to native HTML elements paired with canonical CSS (.relux-input, .relux-select), functioning seamlessly with Laravel Livewire wire:model, React Hook Form, and Angular Reactive Forms.',
      },
      {
        q: 'Why do mobile inputs enforce a 16px font-size?',
        a: 'Enforcing a minimum 16px (1rem) font-size prevents mobile browsers (specifically iOS Safari) from unwanted automatic viewport zooming upon input focus.',
      },
    ],
    changelogTitle: 'Component Changelog',
  },
} satisfies Localized<PageCopy>

export function FormPage({ onNavigate }: { onNavigate?: (s: SectionId) => void }) {
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)
  const invalid = touched && !/^\S+@\S+\.\S+$/.test(email)
  const [notif, setNotif] = useState(true)
  const copy = useLocalized(COPY)

  return (
    <article className="mx-auto max-w-3xl">
      <PageHeader
        category="Komponen"
        title={copy.title}
        status="stable"
        description={copy.description}
      />

      <Section id="input-teks" title={copy.textPasswordTitle}>
        <Demo>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label={copy.fullNameLabel} hint={copy.fullNameHint} required>
              <Input name="name" autoComplete="name" placeholder="Budi Santoso" />
            </FormField>

            <FormField
              label={copy.emailLabel}
              error={invalid ? copy.emailError : undefined}
              hint={invalid ? undefined : copy.emailHint}
              required
            >
              <Input
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched(true)}
                isInvalid={invalid}
                placeholder="nama@domain.com"
              />
            </FormField>

            <FormField label={copy.bookingCodeLabel} hint={copy.bookingCodeHint}>
              <Input disabled defaultValue="KAI-7X2Q9" readOnly className="font-mono" />
            </FormField>

            <FormField label={copy.passwordLabel} hint={copy.passwordHint} required>
              <PasswordInput
                autoComplete="current-password"
                placeholder="••••••••"
              />
            </FormField>

            <FormField label={copy.dateLabel}>
              <Input type="date" />
            </FormField>
          </div>
        </Demo>
      </Section>

      <Section id="textarea" title={copy.textareaTitle}>
        <Demo>
          <FormField label={copy.notesLabel} hint={copy.notesHint}>
            <Textarea rows={3} maxLength={200} placeholder={copy.notesPlaceholder} />
          </FormField>
        </Demo>
      </Section>

      <Section id="select" title={copy.selectTitle}>
        <Demo>
          <FormField label={copy.trainClassLabel}>
            <Select defaultValue="eksekutif">
              <option value="ekonomi">Ekonomi</option>
              <option value="bisnis">Bisnis</option>
              <option value="eksekutif">Eksekutif</option>
              <option value="luxury">Luxury</option>
            </Select>
          </FormField>
        </Demo>
      </Section>

      <Section id="checkbox-radio" title={copy.checkRadioTitle}>
        <Demo>
          <div className="grid gap-6 sm:grid-cols-2">
            <fieldset className="space-y-3">
              <legend className="mb-2 text-sm font-semibold text-foreground">{copy.additionalServicesTitle}</legend>
              <Checkbox label="Asuransi perjalanan" defaultChecked />
              <Checkbox label="Makanan di kereta" />
              <Checkbox label="Porter stasiun" />
            </fieldset>

            <fieldset className="space-y-3">
              <legend className="mb-2 text-sm font-semibold text-foreground">{copy.paymentMethodsTitle}</legend>
              <Radio name="pay" label="Virtual account" defaultChecked />
              <Radio name="pay" label="Kartu kredit" />
              <Radio name="pay" label="Dompet digital" />
            </fieldset>
          </div>
        </Demo>
      </Section>

      <Section id="switch" title={copy.switchTitle}>
        <Demo>
          <Switch
            checked={notif}
            onCheckedChange={setNotif}
            label={copy.switchLabel}
            hint={copy.switchHint}
          />
        </Demo>
      </Section>

      <Section id="contoh-kode" title={copy.codeTitle}>
        <ComponentCode component="form" />
      </Section>

      <Section id="token" title={copy.tokensTitle}>
        <PropsTable
          columns={[
            { key: 'part', header: 'Bagian' },
            { key: 'token', header: 'Token', mono: true },
          ]}
          rows={copy.tokenRows}
        />
      </Section>

      <Section id="aksesibilitas" title={copy.a11yTitle}>
        <ul className="list-disc space-y-2 ps-5">
          {copy.a11yItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section id="faq" title={copy.faqTitle}>
        <div className="space-y-3">
          {copy.faqs.map((f, idx) => (
            <details
              key={idx}
              className="group rounded-xl border border-border bg-card p-4 transition-all [&[open]]:shadow-xs"
            >
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-xs sm:text-sm text-foreground list-none select-none">
                <span>{f.q}</span>
                <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180 shrink-0 ms-2" />
              </summary>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground border-t border-border/60 pt-3">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </Section>

      <Section id="changelog" title={copy.changelogTitle}>
        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-xs">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3">Versi</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Catatan Rilis / Perubahan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-xs sm:text-sm">
              {[
                {
                  version: 'v1.1.0',
                  date: '10 Okt 2026',
                  note: 'Penambahan Switch toggle, Password show/hide toggle, dan sinkronisasi ring fokus Make Kit.',
                },
                {
                  version: 'v1.0.0',
                  date: '29 Sep 2026',
                  note: 'Rilis awal Form Controls: Input, Textarea, Select, Checkbox, Radio dengan paritas 3 framework.',
                },
              ].map((c) => (
                <tr key={c.version} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-mono font-semibold text-primary">{c.version}</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground whitespace-nowrap">{c.date}</td>
                  <td className="px-4 py-3 text-foreground/80 leading-relaxed">{c.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </article>
  )
}
