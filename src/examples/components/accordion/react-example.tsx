import { Accordion } from '@/components/ui'

export function AccordionExample() {
  return (
    <Accordion defaultValue="booking">
      <Accordion.Item value="booking" title="Bagaimana cara memesan tiket?">
        Pilih stasiun asal dan tujuan, tanggal keberangkatan, kelas kereta, lalu selesaikan pembayaran.
      </Accordion.Item>
      <Accordion.Item value="cancel" title="Apakah tiket bisa dibatalkan?">
        Pembatalan tiket dapat dilakukan maksimal 2 jam sebelum keberangkatan melalui loket atau aplikasi.
      </Accordion.Item>
    </Accordion>
  )
}
