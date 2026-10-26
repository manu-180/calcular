import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "id.kalkulator-bpjs-ketenagakerjaan",
  h1: "Kalkulator BPJS Ketenagakerjaan",
  title: "Kalkulator BPJS Ketenagakerjaan: iuran JHT, JP, JKK dan JKM",
  description: "Hitung iuran BPJS Ketenagakerjaan per bulan: JHT, Jaminan Pensiun, JKK dan JKM, bagian pekerja dan bagian pemberi kerja, sesuai PP 44, 45 dan 46/2015.",
  intro: [
    "Masukkan upah sebulan untuk melihat berapa iuran BPJS Ketenagakerjaan yang dipotong dari gaji Anda dan berapa yang dibayar perusahaan.",
    "Upah yang dipakai adalah gaji pokok ditambah tunjangan tetap.",
  ],
  comoSeCalcula: [
    "Jaminan Hari Tua (JHT): {{id.jht-pekerja}} dari upah ditanggung pekerja dan {{id.jht-pemberi-kerja}} ditanggung pemberi kerja.",
    "Jaminan Pensiun (JP): {{id.jp-pekerja}} pekerja dan {{id.jp-pemberi-kerja}} pemberi kerja, dihitung dari upah sampai batas upah JP.",
    "Jaminan Kecelakaan Kerja (JKK) dibayar pemberi kerja sesuai tingkat risiko, dari {{id.jkk[sangat-rendah]}} sampai {{id.jkk[sangat-tinggi]}} dari upah.",
    "Jaminan Kematian (JKM) dibayar pemberi kerja sebesar {{id.jkm}} dari upah.",
  ],
  ejemplo: ["Upah Rp10.000.000 dengan risiko sangat rendah: Anda membayar Rp300.000 (JHT dan JP), pemberi kerja membayar Rp624.000."],
  faq: [
    {
      pregunta: "Berapa potongan BPJS Ketenagakerjaan dari gaji?",
      respuesta: "Pekerja membayar {{id.jht-pekerja}} untuk JHT dan {{id.jp-pekerja}} untuk JP. JKK dan JKM seluruhnya dibayar pemberi kerja.",
    },
    {
      pregunta: "Apa itu batas upah Jaminan Pensiun?",
      respuesta: "Iuran JP dihitung dari upah paling tinggi tertentu. BPJS Ketenagakerjaan menyesuaikan batas itu setiap tahun dengan pertumbuhan produk domestik bruto. Jika upah Anda di atas batas, isi kolom batas upah JP.",
    },
    {
      pregunta: "Apakah iuran JHT dan JP mengurangi pajak?",
      respuesta: "Ya. Iuran JHT dan JP yang Anda bayar sendiri mengurangi penghasilan neto saat PPh 21 setahun dihitung.",
    },
    {
      pregunta: "Bagaimana dengan Jaminan Kehilangan Pekerjaan (JKP)?",
      respuesta: "JKP tidak menambah potongan gaji. Iurannya dibayar pemerintah dan dari rekomposisi iuran JKK dan JKM.",
    },
  ],
  glosario: [
    { termino: "JHT", definicion: "Jaminan Hari Tua, tabungan yang dicairkan saat pensiun, berhenti bekerja atau keadaan tertentu." },
    { termino: "JP", definicion: "Jaminan Pensiun, manfaat bulanan saat memasuki usia pensiun." },
    { termino: "JKK dan JKM", definicion: "Jaminan Kecelakaan Kerja dan Jaminan Kematian, iurannya dibayar pemberi kerja." },
  ],
});
