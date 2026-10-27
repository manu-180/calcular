import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "id.kalkulator-bpjs-kesehatan",
  h1: "Kalkulator Iuran BPJS Kesehatan",
  title: "Kalkulator BPJS Kesehatan {{anio}}: iuran pekerja dan mandiri",
  description: "Hitung iuran BPJS Kesehatan per bulan untuk pekerja penerima upah (1% dan 4%) atau peserta mandiri kelas I, II dan III sesuai Perpres 64/2020.",
  intro: [
    "Pilih apakah Anda didaftarkan oleh kantor atau membayar sendiri sebagai peserta mandiri.",
    "Untuk pekerja, iuran dihitung dari gaji. Untuk peserta mandiri, iuran tetap per orang sesuai kelas perawatan.",
  ],
  comoSeCalcula: [
    "Pekerja penerima upah: iuran {{id.bpjs-kes-pekerja}} dari gaji dipotong dari gaji Anda dan {{id.bpjs-kes-pemberi-kerja}} dibayar pemberi kerja.",
    "Gaji yang dipakai paling tinggi {{id.bpjs-kes-batas-upah}} per bulan.",
    "Peserta mandiri: kelas I {{id.bpjs-kes-mandiri[kelas-1]}}, kelas II {{id.bpjs-kes-mandiri[kelas-2]}} dan kelas III {{id.bpjs-kes-mandiri[kelas-3]}} per orang per bulan.",
    "Untuk kelas III pemerintah menambah bantuan iuran {{id.bpjs-kes-bantuan-kelas-3}} per orang per bulan.",
  ],
  ejemplo: ["Gaji Rp8.000.000: Anda membayar Rp80.000 dan kantor Rp320.000 per bulan. Keluarga tiga orang di kelas I mandiri membayar Rp450.000 per bulan."],
  faq: [
    {
      pregunta: "Berapa potongan BPJS Kesehatan dari gaji?",
      respuesta: "Pekerja membayar {{id.bpjs-kes-pekerja}} dari gaji, dengan gaji paling tinggi {{id.bpjs-kes-batas-upah}}. Sisanya {{id.bpjs-kes-pemberi-kerja}} dibayar pemberi kerja.",
    },
    {
      pregunta: "Apakah ada batas bawah gaji untuk iuran pekerja?",
      respuesta: "Ya. Gaji paling rendah untuk menghitung iuran adalah upah minimum kabupaten atau kota, atau upah minimum provinsi jika daerah itu tidak menetapkan UMK.",
    },
    {
      pregunta: "Berapa iuran BPJS Kesehatan kelas III mandiri?",
      respuesta: "Peserta kelas III membayar {{id.bpjs-kes-mandiri[kelas-3]}} per orang per bulan. Pemerintah membayar tambahan {{id.bpjs-kes-bantuan-kelas-3}}.",
    },
  ],
  glosario: [
    { termino: "PPU", definicion: "Pekerja penerima upah, peserta yang didaftarkan dan dibayarkan iurannya lewat pemberi kerja." },
    { termino: "PBPU", definicion: "Pekerja bukan penerima upah, peserta mandiri yang membayar iuran sendiri." },
  ],
});
