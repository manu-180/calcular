import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "id.kalkulator-pajak-pesangon",
  h1: "Kalkulator Pajak Pesangon dan JHT",
  title: "Kalkulator Pajak Pesangon dan JHT: PPh 21 final PP 68/2009",
  description: "Hitung PPh 21 final atas uang pesangon, uang penghargaan masa kerja, JHT atau manfaat pensiun yang dibayar sekaligus, dengan tarif PP 68/2009.",
  intro: [
    "Uang pesangon dan JHT yang dicairkan sekaligus tidak digabung dengan gaji. Keduanya dipotong PPh 21 final dengan tarif sendiri.",
    "Pilih jenis pembayaran, masukkan jumlah brutonya, dan lihat pajak serta jumlah bersih yang Anda terima.",
  ],
  comoSeCalcula: [
    "Uang pesangon (termasuk uang penghargaan masa kerja dan uang penggantian hak) dikenai tarif berlapis: {{id.tarif-pph-pesangon[0].tasa}} sampai {{id.tarif-pph-pesangon[0].hasta}}, {{id.tarif-pph-pesangon[1].tasa}} sampai {{id.tarif-pph-pesangon[1].hasta}}, {{id.tarif-pph-pesangon[2].tasa}} sampai {{id.tarif-pph-pesangon[2].hasta}} dan {{id.tarif-pph-pesangon[-1].tasa}} di atasnya.",
    "JHT, tunjangan hari tua dan manfaat pensiun yang dibayar sekaligus: {{id.tarif-pph-jht-sekaligus[0].tasa}} sampai {{id.tarif-pph-jht-sekaligus[0].hasta}} dan {{id.tarif-pph-jht-sekaligus[-1].tasa}} untuk sisanya.",
    "Setiap lapisan hanya dikenakan pada bagian jumlah yang masuk lapisan itu.",
  ],
  ejemplo: ["Uang pesangon Rp150.000.000: Rp50 juta pertama tidak dipotong, Rp50 juta berikutnya 5% dan Rp50 juta terakhir 15%. PPh 21 final Rp10.000.000."],
  faq: [
    {
      pregunta: "Apakah PPh atas pesangon dihitung ulang bersama gaji?",
      respuesta: "Tidak. PPh 21 atas pesangon bersifat final, jadi pesangon tidak digabung dengan gaji atau penghasilan lain saat menghitung pajak setahun.",
    },
    {
      pregunta: "Bagaimana jika pesangon dibayar bertahap?",
      respuesta: "Pembayaran dianggap sekaligus jika dilunasi paling lama dalam 2 tahun kalender. Bagian yang dibayar pada tahun ketiga dan seterusnya dipotong dengan tarif Pasal 17.",
    },
    {
      pregunta: "Apa saja yang termasuk uang pesangon untuk pajak?",
      respuesta: "Menurut PP 68/2009, uang pesangon termasuk uang penghargaan masa kerja dan uang penggantian hak yang dibayar karena berakhirnya hubungan kerja.",
    },
  ],
  glosario: [
    { termino: "PPh final", definicion: "Pajak yang selesai saat dipotong dan tidak dihitung ulang di SPT Tahunan." },
    { termino: "JHT", definicion: "Jaminan Hari Tua dari BPJS Ketenagakerjaan." },
  ],
});
