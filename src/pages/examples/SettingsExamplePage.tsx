import { useState } from 'react'
import {
  User,
  Shield,
  Bell,
  Palette,
  Check,
  Save,
  Smartphone,
  Laptop,
} from 'lucide-react'
import { useLang } from '../../lib/i18n'
import type { SectionId } from '../../lib/nav'

export function SettingsExamplePage({
  onNavigate: _onNavigate,
}: {
  onNavigate: (section: SectionId) => void
}) {
  const { lang, setLang } = useLang()
  const isEn = lang === 'en'

  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'appearance'>('profile')
  const [savedToast, setSavedToast] = useState(false)

  // Form states
  const [name, setName] = useState('Budi Santoso, S.T.')
  const [nipp, setNipp] = useState('54829')
  const [unit, setUnit] = useState('Daop 1 Jakarta — Wilayah Operasi Stasiun Gambir')
  const [waNotify, setWaNotify] = useState(true)
  const [emailReport, setEmailReport] = useState(true)
  const [delayAlert, setDelayAlert] = useState(false)
  const [density, setDensity] = useState<'comfortable' | 'compact'>('comfortable')

  const handleSave = () => {
    setSavedToast(true)
    setTimeout(() => setSavedToast(false), 2500)
  }

  const labels = isEn
    ? {
        tag: 'Example surface',
        title: 'Settings & Preferences',
        lead: 'Comprehensive internal application configuration pattern for employee profiles, authentication security, and operational alerting.',
        tabProfile: 'Employee Profile',
        tabSecurity: 'Account Security & 2FA',
        tabNotifications: 'Operational Alerts',
        tabAppearance: 'Appearance & Theme',
        saveBtn: 'Save Changes',
        savedMsg: 'Preferences successfully updated!',
      }
    : {
        tag: 'Halaman contoh',
        title: 'Pengaturan & Preferensi Sistem',
        lead: 'Pola konfigurasi aplikasi internal komprehensif untuk profil pegawai, keamanan akun dinas, dan notifikasi operasional.',
        tabProfile: 'Profil Pegawai',
        tabSecurity: 'Keamanan Akun & 2FA',
        tabNotifications: 'Notifikasi Operasional',
        tabAppearance: 'Tampilan & Tema',
        saveBtn: 'Simpan Perubahan',
        savedMsg: 'Pengaturan berhasil diperbarui!',
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

      {savedToast && (
        <div className="flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 p-3 text-xs font-semibold text-success">
          <Check className="size-4 shrink-0" />
          <span>{labels.savedMsg}</span>
        </div>
      )}

      {/* Settings Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold transition-colors ${
            activeTab === 'profile'
              ? 'bg-card text-foreground shadow-xs border border-border'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <User className="size-3.5 text-primary" />
          <span>{labels.tabProfile}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold transition-colors ${
            activeTab === 'security'
              ? 'bg-card text-foreground shadow-xs border border-border'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Shield className="size-3.5 text-accent" />
          <span>{labels.tabSecurity}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('notifications')}
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold transition-colors ${
            activeTab === 'notifications'
              ? 'bg-card text-foreground shadow-xs border border-border'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Bell className="size-3.5 text-warning" />
          <span>{labels.tabNotifications}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('appearance')}
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold transition-colors ${
            activeTab === 'appearance'
              ? 'bg-card text-foreground shadow-xs border border-border'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Palette className="size-3.5 text-primary" />
          <span>{labels.tabAppearance}</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
        {activeTab === 'profile' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-bold text-foreground">Informasi Pribadi & Kedinasan</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Data identitas pegawai terdaftar pada sistem HCIS KAI.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Nama Lengkap & Gelar
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="relux-input w-full text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Nomor Induk Pegawai (NIPP)
                </label>
                <input
                  type="text"
                  disabled
                  value={nipp}
                  className="relux-input w-full text-xs opacity-75 bg-muted cursor-not-allowed"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Unit Kerja / Daerah Operasi (Daop)
                </label>
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="relux-input w-full text-xs"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-border flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="relux-button relux-button--primary text-xs flex items-center gap-1.5"
              >
                <Save className="size-3.5" />
                <span>{labels.saveBtn}</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-foreground">Keamanan Akun & 2FA</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Kelola autentikasi ganda dan pantau perangkat yang memiliki akses ke akun Anda.
              </p>
            </div>

            {/* 2FA Status */}
            <div className="flex flex-col gap-3 rounded-lg border border-border p-4 bg-muted/30 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="size-6 text-primary shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-foreground">Autentikator ESA Web & Mobile (2FA)</h4>
                  <p className="text-xs text-muted-foreground">
                    Verifikasi kode OTP 6 digit aktif untuk setiap sesi baru.
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-semibold text-success border border-success/30">
                <Check className="size-3" /> Aktif & Terlindungi
              </span>
            </div>

            {/* Active Sessions */}
            <div>
              <h4 className="text-xs font-bold text-foreground mb-3">Sesi Aktif Saat Ini</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-md border border-border p-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <Laptop className="size-4 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">MacBook Pro 14" (Terminal Dinas KAI)</p>
                      <p className="text-xs text-muted-foreground">Bandung, Jawa Barat · IP: 10.240.12.5 (Intranet KAI)</p>
                    </div>
                  </div>
                  <span className="rounded bg-primary/10 px-2 py-0.5 text-xs leading-none font-bold text-primary">Sesi Ini</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-bold text-foreground">Preferensi Notifikasi Operasional</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Tentukan jalur penerimaan alert kritis dan laporan perjalanan sarana.
              </p>
            </div>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20 cursor-pointer">
                <div>
                  <p className="text-xs font-semibold text-foreground">Alert WhatsApp Gangguan Lintas</p>
                  <p className="text-xs text-muted-foreground">Kirim notifikasi instan bila terjadi rintang jalan atau anjlokan kereta.</p>
                </div>
                <input
                  type="checkbox"
                  checked={waNotify}
                  onChange={(e) => setWaNotify(e.target.checked)}
                  className="relux-checkbox"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20 cursor-pointer">
                <div>
                  <p className="text-xs font-semibold text-foreground">Email Rekapitulasi Dinas Harian</p>
                  <p className="text-xs text-muted-foreground">Laporan kelancaran operasi Daop dikirim setiap pukul 06.00 WIB.</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailReport}
                  onChange={(e) => setEmailReport(e.target.checked)}
                  className="relux-checkbox"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20 cursor-pointer">
                <div>
                  <p className="text-xs font-semibold text-foreground">Push Notifikasi Keterlambatan Kereta Api</p>
                  <p className="text-xs text-muted-foreground">Pemberitahuan bila ada kereta penumpang terlambat &gt; 15 menit.</p>
                </div>
                <input
                  type="checkbox"
                  checked={delayAlert}
                  onChange={(e) => setDelayAlert(e.target.checked)}
                  className="relux-checkbox"
                />
              </label>
            </div>

            <div className="pt-3 border-t border-border flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="relux-button relux-button--primary text-xs"
              >
                {labels.saveBtn}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-bold text-foreground">Pengaturan Tampilan & Kerapatan</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Sesuaikan kenyamanan visual sesuai monitor dan kondisi pencahayaan pos jaga.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Kerapatan Baris Tabel (Density)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDensity('comfortable')}
                    className={`rounded-md border p-2.5 text-xs font-semibold text-center transition-colors ${
                      density === 'comfortable'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    Comfortable (Standar)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDensity('compact')}
                    className={`rounded-md border p-2.5 text-xs font-semibold text-center transition-colors ${
                      density === 'compact'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    Compact (Padat)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">
                  Bahasa Antarmuka
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setLang('id')}
                    className={`rounded-md border p-2.5 text-xs font-semibold text-center transition-colors ${
                      lang === 'id'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    Bahasa Indonesia
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang('en')}
                    className={`rounded-md border p-2.5 text-xs font-semibold text-center transition-colors ${
                      lang === 'en'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="relux-button relux-button--primary text-xs"
              >
                {labels.saveBtn}
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
