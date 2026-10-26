import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "id.kalkulator-biaya-karyawan",
  h1: "Kalkulator Biaya Karyawan",
  title: "Kalkulator Biaya Karyawan: gaji, BPJS dan THR per bulan",
  description: "Hitung biaya total seorang karyawan bagi perusahaan: gaji, iuran BPJS Ketenagakerjaan dan BPJS Kesehatan bagian perusahaan, serta cadangan THR.",
  intro: [
    "Gaji bukan satu-satunya biaya saat merekrut karyawan. Perusahaan juga membayar iuran BPJS dan wajib membayar THR setiap tahun.",
    "Kalkulator ini menjumlahkan semuanya per bulan dan per tahun.",
  ],
  comoSeCalcula: [
    "BPJS Ketenagakerjaan bagian perusahaan: JHT {{id.jht-pemberi-kerja}}, JP {{id.jp-pemberi-kerja}}, JKK sesuai tingkat risiko dan JKM {{id.jkm}} dari gaji.",
    "BPJS Kesehatan bagian perusahaan: {{id.bpjs-kes-pemberi-kerja}} dari gaji, paling tinggi dari gaji {{id.bpjs-kes-batas-upah}}.",
    "Cadangan THR: satu bulan gaji dibagi rata ke {{id.thr-masa-kerja-penuh}} bulan.",
  ],
  ejemplo: ["Gaji Rp10.000.000 dengan risiko JKK sangat rendah: BPJS Ketenagakerjaan Rp624.000, BPJS Kesehatan Rp400.000 dan cadangan THR Rp833.333. Biaya karyawan Rp11.857.333 per bulan."],
  faq: [
    {
      pregunta: "Apakah PPh 21 karyawan termasuk biaya perusahaan?",
      respuesta: "Biasanya tidak. PPh 21 dipotong dari gaji karyawan. Perusahaan hanya menanggungnya jika memberi tunjangan pajak atau menanggung pajak karyawan.",
    },
    {
      pregunta: "Kenapa iuran BPJS Kesehatan perusahaan berhenti naik?",
      respuesta: "Iuran dihitung dari gaji paling tinggi {{id.bpjs-kes-batas-upah}} per bulan. Gaji di atas itu tidak menambah iuran.",
    },
    {
      pregunta: "Apa saja yang tidak dihitung di sini?",
      respuesta: "Lembur, bonus, tunjangan tidak tetap, pelatihan, peralatan kerja dan cadangan pesangon. Tambahkan sendiri jika relevan.",
    },
  ],
  glosario: [
    { termino: "THR", definicion: "Tunjangan hari raya keagamaan, wajib dibayar pemberi kerja sekali setahun." },
    { termino: "JKK", definicion: "Jaminan Kecelakaan Kerja, iurannya bergantung pada tingkat risiko lingkungan kerja." },
  ],
});
