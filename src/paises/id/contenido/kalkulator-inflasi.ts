import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "id.kalkulator-inflasi",
  h1: "Kalkulator Inflasi",
  title: "Kalkulator Inflasi: nilai uang Anda di masa depan",
  description: "Hitung berapa uang yang Anda butuhkan nanti untuk daya beli yang sama, dengan inflasi tahunan terbaru dari BPS ({{id.inflasi-tahunan}}) atau angka Anda sendiri.",
  intro: [
    "Inflasi membuat uang yang sama bisa membeli lebih sedikit dari tahun ke tahun. Kalkulator ini menunjukkan seberapa besar pengaruhnya.",
    "Secara bawaan dipakai inflasi tahunan terbaru yang dirilis BPS dan ditampilkan Bank Indonesia. Anda juga bisa mengisi perkiraan sendiri.",
  ],
  comoSeCalcula: [
    "Uang yang dibutuhkan nanti = jumlah hari ini x (1 + inflasi) pangkat jumlah tahun.",
    "Daya beli nanti = jumlah hari ini dibagi faktor yang sama.",
    "Inflasi tahunan terbaru yang dipakai: {{id.inflasi-tahunan}}. Bulan datanya tampil di hasil.",
  ],
  ejemplo: ["Misalnya dengan inflasi 5% per tahun, Rp5.000.000 hari ini setara Rp8.144.473 dalam 10 tahun. Sebaliknya, Rp5.000.000 sepuluh tahun lagi hanya punya daya beli Rp3.069.566 uang hari ini."],
  faq: [
    {
      pregunta: "Berapa inflasi Indonesia sekarang?",
      respuesta: "Inflasi tahunan (year on year) terbaru adalah {{id.inflasi-tahunan}}. Bulan datanya tercantum di hasil kalkulator.",
    },
    {
      pregunta: "Apakah inflasi akan tetap sama setiap tahun?",
      respuesta: "Tidak. Kalkulator memakai satu angka rata-rata untuk semua tahun. Hasilnya perkiraan, bukan ramalan.",
    },
    {
      pregunta: "Untuk apa hitungan ini?",
      respuesta: "Untuk merencanakan dana pendidikan, dana pensiun atau target tabungan, dan untuk menilai apakah kenaikan gaji Anda mengejar inflasi.",
    },
  ],
  glosario: [
    { termino: "Inflasi tahunan", definicion: "Perubahan indeks harga konsumen (IHK) dibanding bulan yang sama tahun sebelumnya." },
    { termino: "Daya beli", definicion: "Jumlah barang dan jasa yang bisa dibeli dengan sejumlah uang." },
  ],
});
