import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "zz-id.bono",
  h1: "Kalkulator bonus semesteran Zetaland",
  title: "Bonus semesteran Zetaland: hitung jumlah yang Anda terima",
  description: "Hitung bonus semesteran dengan upah minimum zona Anda dan tambahan {{zz.bonificacion}}. Data resmi lengkap dengan tanggal dan sumbernya.",
  intro: [
    "Bonus semesteran adalah tambahan satu bulan gaji yang dibayarkan dua kali setahun.",
    "Jika Anda bekerja penuh selama satu semester, Anda menerima satu bulan gaji ditambah {{zz.bonificacion}}.",
  ],
  comoSeCalcula: [
    "Perhitungan dimulai dari gaji kotor per bulan. Jika di bawah upah minimum zona Anda, yang dipakai adalah upah minimum.",
    "Gaji itu dikalikan jumlah bulan kerja, lalu dibagi 6.",
    "Di perusahaan kecil, bonusnya setengah.",
    "Bonus ditambah {{zz.bonificacion}}.",
  ],
  faq: [
    { pregunta: "Berapa upah minimum di Zona Utara?", respuesta: "{{zz.minimo@norte}}, berlaku sejak {{zz.minimo@norte#desde}}." },
    { pregunta: "Bagaimana jika saya tidak bekerja penuh satu semester?", respuesta: "Anda menerima bagian yang sesuai dengan jumlah bulan kerja." },
    { pregunta: "Apakah tambahannya selalu dibayarkan?", respuesta: "Ya. Besarnya {{zz.bonificacion}} dari bonus, dan perusahaan membayarnya bersama bonus." },
  ],
  glosario: [
    { termino: "Bonus semesteran", definicion: "Gaji tambahan yang menurut undang-undang wajib dibayarkan pada bulan Juli dan Desember." },
    { termino: "Upah minimum", definicion: "Gaji terendah yang boleh dibayarkan untuk satu hari kerja penuh di setiap zona." },
  ],
});
