import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "id.upah-minimum-provinsi",
  h1: "UMP 2026: Upah Minimum Provinsi",
  title: "UMP 2026 per provinsi: upah minimum bulanan dan harian",
  description: "Cek UMP 2026 provinsi Anda dari keputusan gubernur, lalu lihat setara upah harian dan per jam. Bandingkan dengan gaji Anda.",
  intro: [
    "Pilih provinsi untuk melihat upah minimum provinsi (UMP) 2026 yang berlaku sejak 1 Januari 2026.",
    "Kami hanya memuat provinsi yang keputusan gubernurnya sudah kami baca di situs resmi pemerintah provinsi. Provinsi lain akan ditambahkan setelah diperiksa.",
  ],
  comoSeCalcula: [
    "UMP diambil dari keputusan gubernur masing-masing provinsi. Contohnya DKI Jakarta {{id.ump@dki-jakarta}} dan Jawa Tengah {{id.ump@jawa-tengah}}.",
    "Setara upah sehari adalah UMP dibagi {{id.upah-sebulan-pengali-harian[6-hari]}} untuk 6 hari kerja seminggu atau {{id.upah-sebulan-pengali-harian[5-hari]}} untuk 5 hari kerja seminggu.",
    "Setara upah sejam adalah UMP dibagi {{id.lembur-pembagi}}, cara yang sama dengan perhitungan upah lembur.",
  ],
  ejemplo: ["UMP DKI Jakarta 2026 Rp5.729.876. Dengan 5 hari kerja seminggu, setara upah sehari Rp272.851 dan upah sejam Rp33.121."],
  faq: [
    {
      pregunta: "Berapa UMP Jakarta 2026?",
      respuesta: "UMP DKI Jakarta 2026 adalah {{id.ump@dki-jakarta}} per bulan, sesuai Keputusan Gubernur DKI Jakarta Nomor 1142 Tahun 2025.",
    },
    {
      pregunta: "Berapa UMP Jawa Timur dan Jawa Tengah 2026?",
      respuesta: "UMP Jawa Timur 2026 {{id.ump@jawa-timur}} dan UMP Jawa Tengah 2026 {{id.ump@jawa-tengah}} per bulan.",
    },
    {
      pregunta: "Kenapa provinsi saya belum ada?",
      respuesta: "Kami hanya menampilkan angka yang sudah kami baca langsung di keputusan gubernur atau situs resmi provinsi. Provinsi lain akan muncul setelah dokumennya diperiksa.",
    },
    {
      pregunta: "Apa beda UMP dan UMK?",
      respuesta: "UMP ditetapkan gubernur untuk seluruh provinsi. UMK ditetapkan untuk kabupaten atau kota tertentu dan berlaku di wilayah itu.",
    },
  ],
  glosario: [
    { termino: "UMP", definicion: "Upah minimum provinsi, upah bulanan terendah yang ditetapkan gubernur." },
    { termino: "UMK", definicion: "Upah minimum kabupaten atau kota." },
  ],
});
