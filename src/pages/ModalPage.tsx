import { useState } from 'react'
import { TriangleAlert } from 'lucide-react'
import { Section } from '../components/docs/Section'
import { ComponentCode } from '../components/docs/ComponentCode'
import { ComponentPage, Demo, A11yList, Code } from '../components/docs/ComponentPage'
import { Dialog, SlideOver, Button } from '../components/ui'
import { useLocalized, type Localized } from '../lib/i18n'
import type { SectionId } from '../lib/nav'

type PageCopy = {
  title: string
  description: string
  dialogTitle: string
  codeTitle: string
  a11yTitle: string
  btnDetail: string
  btnCancel: string
  btnSlideOver: string
  dialogDetailTitle: string
  dialogDetailDesc: string
  trainLabel: string
  routeLabel: string
  departureLabel: string
  closeBtn: string
  cancelDialogTitle: string
  cancelWarning: string
  backBtn: string
  confirmCancelBtn: string
  filterTitle: string
  filterDesc: string
  filterBody: string
  classCardTitle: string
  classCardText: string
  applyFilterBtn: string
  a11y1: string
  a11y2: string
  a11y3: string
}

const COPY = {
  id: {
    title: 'Modal & Dialog',
    description: 'Jendela di atas konten untuk keputusan penting atau informasi yang butuh perhatian penuh.',
    dialogTitle: 'Dialog & Slide-over',
    codeTitle: 'Contoh kode',
    a11yTitle: 'Aksesibilitas',
    btnDetail: 'Lihat detail perjalanan',
    btnCancel: 'Batalkan tiket',
    btnSlideOver: 'Buka Slide-over Panel',
    dialogDetailTitle: 'Detail perjalanan',
    dialogDetailDesc: 'Informasi pemesanan dan jadwal keberangkatan kereta',
    trainLabel: 'Kereta',
    routeLabel: 'Rute',
    departureLabel: 'Berangkat',
    closeBtn: 'Tutup',
    cancelDialogTitle: 'Batalkan tiket ini?',
    cancelWarning: 'Kursi Anda akan dilepas. Dana 75% dikembalikan dalam 7 hari kerja. Tindakan ini tidak dapat dibatalkan.',
    backBtn: 'Kembali',
    confirmCancelBtn: 'Batalkan tiket',
    filterTitle: 'Filter Perjalanan',
    filterDesc: 'Saring hasil pencarian jadwal kereta',
    filterBody: 'Pilih kelas kereta dan preferensi waktu keberangkatan.',
    classCardTitle: 'Kelas Kereta',
    classCardText: 'Eksekutif, Bisnis, Ekonomi',
    applyFilterBtn: 'Terapkan Filter',
    a11y1: 'Memakai dialog.showModal(): fokus terkunci, latar inert, Escape menutup, fokus kembali ke pemicu.',
    a11y2: 'Dialog konfirmasi memakai role="alertdialog" dan fokus awal di aksi aman.',
    a11y3: 'Tombol konfirmasi mengulang konsekuensi: "Batalkan tiket", bukan "Ya".',
  },
  en: {
    title: 'Modal & Dialog',
    description: 'Layered windows above primary content for critical decisions or focused workflows requiring user engagement.',
    dialogTitle: 'Dialog & Slide-over panel',
    codeTitle: 'Code example',
    a11yTitle: 'Accessibility',
    btnDetail: 'View journey details',
    btnCancel: 'Cancel ticket',
    btnSlideOver: 'Open slide-over panel',
    dialogDetailTitle: 'Journey details',
    dialogDetailDesc: 'Booking summary and scheduled train departure times',
    trainLabel: 'Train',
    routeLabel: 'Route',
    departureLabel: 'Departure',
    closeBtn: 'Close',
    cancelDialogTitle: 'Cancel this ticket reservation?',
    cancelWarning: 'Your seat allocation will be released. A 75% refund is processed within 7 business days. This action is irreversible.',
    backBtn: 'Return',
    confirmCancelBtn: 'Cancel ticket',
    filterTitle: 'Journey Filter',
    filterDesc: 'Refine train schedule availability',
    filterBody: 'Select desired train class and departure time windows.',
    classCardTitle: 'Train Classes',
    classCardText: 'Executive, Business, Economy',
    applyFilterBtn: 'Apply Filters',
    a11y1: 'Uses dialog.showModal(): traps focus, marks backdrop inert, handles Escape, restores trigger focus.',
    a11y2: 'Destructive confirmation dialogs apply role="alertdialog" and place initial focus on the safe option.',
    a11y3: 'Action buttons state exact consequences: "Cancel ticket", avoiding ambiguous "Yes".',
  },
} satisfies Localized<PageCopy>

export function ModalPage({ onNavigate }: { onNavigate?: (s: SectionId) => void }) {
  const [infoOpen, setInfoOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [slideOpen, setSlideOpen] = useState(false)
  const copy = useLocalized(COPY)

  return (
    <ComponentPage
      title={copy.title}
      description={copy.description}
    >
      <Section id="dialog-slide-over" title={copy.dialogTitle}>
        <Demo className="flex flex-wrap gap-3">
          <Button variant="primary" onClick={() => setInfoOpen(true)}>
            {copy.btnDetail}
          </Button>
          <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
            {copy.btnCancel}
          </Button>
          <Button variant="outline" onClick={() => setSlideOpen(true)}>
            {copy.btnSlideOver}
          </Button>
        </Demo>

        <Dialog
          open={infoOpen}
          onClose={() => setInfoOpen(false)}
          title={copy.dialogDetailTitle}
          description={copy.dialogDetailDesc}
        >
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
            <dt className="text-muted-foreground">{copy.trainLabel}</dt>
            <dd className="font-medium text-foreground">Argo Bromo Anggrek</dd>
            <dt className="text-muted-foreground">{copy.routeLabel}</dt>
            <dd className="font-medium text-foreground">Gambir – Surabaya Pasarturi</dd>
            <dt className="text-muted-foreground">{copy.departureLabel}</dt>
            <dd className="font-medium tabular-nums text-foreground">08.20 WIB</dd>
          </dl>
          <Dialog.Footer>
            <Button variant="primary" onClick={() => setInfoOpen(false)}>
              {copy.closeBtn}
            </Button>
          </Dialog.Footer>
        </Dialog>

        <Dialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          role="alertdialog"
          title={copy.cancelDialogTitle}
        >
          <div className="flex gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-danger-soft text-destructive">
              <TriangleAlert aria-hidden="true" className="size-5" />
            </span>
            <p className="text-sm text-muted-foreground text-pretty">
              {copy.cancelWarning}
            </p>
          </div>
          <Dialog.Footer>
            <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
              {copy.backBtn}
            </Button>
            <Button variant="destructive" onClick={() => setConfirmOpen(false)}>
              {copy.confirmCancelBtn}
            </Button>
          </Dialog.Footer>
        </Dialog>

        <SlideOver
          open={slideOpen}
          onClose={() => setSlideOpen(false)}
          title={copy.filterTitle}
          description={copy.filterDesc}
        >
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>{copy.filterBody}</p>
            <div className="rounded-lg border border-border p-4 bg-muted/20">
              <p className="font-medium text-foreground">{copy.classCardTitle}</p>
              <p className="text-xs text-muted-foreground mt-1">{copy.classCardText}</p>
            </div>
            <div className="mt-6 flex justify-end">
              <Button variant="primary" onClick={() => setSlideOpen(false)}>
                {copy.applyFilterBtn}
              </Button>
            </div>
          </div>
        </SlideOver>
      </Section>

      <Section id="contoh-kode" title={copy.codeTitle}>
        <ComponentCode component="modal" />
      </Section>

      <Section id="aksesibilitas" title={copy.a11yTitle}>
        <A11yList
          items={[
            <>
              {copy.a11y1.split('dialog.showModal()')[0]}
              <Code>dialog.showModal()</Code>
              {copy.a11y1.split('dialog.showModal()')[1] ?? ''}
            </>,
            <>
              {copy.a11y2.split('role="alertdialog"')[0]}
              <Code>role="alertdialog"</Code>
              {copy.a11y2.split('role="alertdialog"')[1] ?? ''}
            </>,
            copy.a11y3,
          ]}
        />
      </Section>
    </ComponentPage>
  )
}
