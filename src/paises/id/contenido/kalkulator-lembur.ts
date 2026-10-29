import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "id.kalkulator-lembur",
  h1: "Kalkulator Uang Lembur",
  title: "Kalkulator Lembur {{anio}}: hitung upah lembur sesuai PP 35/2021",
  description: "Hitung uang lembur di hari kerja dan hari libur dengan upah sejam 1/173 upah sebulan dan pengali resmi PP 35/2021.",
  intro: [
    "Masukkan upah sebulan, kapan Anda lembur dan berapa jam. Kalkulator menerapkan pengali yang berbeda untuk jam pertama, jam berikutnya dan hari libur.",
    "Upah lembur dihitung dari upah bulanan, yaitu gaji pokok ditambah tunjangan tetap.",
  ],
  comoSeCalcula: [
    "Upah sejam adalah upah sebulan dibagi {{id.lembur-pembagi}}.",
    "Di hari kerja: jam pertama dibayar {{id.lembur-pengali[hari-kerja-jam-pertama]}} kali upah sejam, jam berikutnya {{id.lembur-pengali[hari-kerja-jam-berikutnya]}} kali.",
    "Di hari libur dengan 6 hari kerja seminggu: jam ke-1 sampai ke-7 dibayar {{id.lembur-pengali[libur-awal]}} kali, jam ke-8 {{id.lembur-pengali[libur-jam-berikut]}} kali, jam ke-9 sampai ke-11 {{id.lembur-pengali[libur-akhir]}} kali.",
    "Di hari libur dengan 5 hari kerja seminggu: jam ke-1 sampai ke-8 dibayar {{id.lembur-pengali[libur-awal]}} kali, jam ke-9 {{id.lembur-pengali[libur-jam-berikut]}} kali, jam ke-10 sampai ke-12 {{id.lembur-pengali[libur-akhir]}} kali.",
    "Jika hari libur resmi jatuh pada hari kerja terpendek: jam ke-1 sampai ke-5 dibayar {{id.lembur-pengali[libur-awal]}} kali, jam ke-6 {{id.lembur-pengali[libur-jam-berikut]}} kali, jam ke-7 sampai ke-9 {{id.lembur-pengali[libur-akhir]}} kali.",
  ],
  ejemplo: ["Upah Rp5.190.000 sebulan, jadi upah sejam Rp30.000. Lembur 3 jam di hari kerja: 1,5 x Rp30.000 + 2 x 2 x Rp30.000 = Rp165.000."],
  faq: [
    {
      pregunta: "Berapa lama lembur yang diperbolehkan?",
      respuesta: "Lembur paling lama {{id.lembur-maks-hari}} sehari dan {{id.lembur-maks-minggu}} seminggu. Batas ini tidak termasuk lembur di hari istirahat mingguan atau hari libur resmi.",
    },
    {
      pregunta: "Bagaimana jika upah saya ada tunjangan tidak tetap?",
      respuesta: "Jika upah pokok ditambah tunjangan tetap kurang dari 75% seluruh upah, dasar perhitungan lembur adalah 75% dari seluruh upah.",
    },
    {
      pregunta: "Bagaimana menghitung upah sebulan pekerja harian?",
      respuesta: "Upah sehari dikali {{id.upah-sebulan-pengali-harian[6-hari]}} untuk 6 hari kerja seminggu atau {{id.upah-sebulan-pengali-harian[5-hari]}} untuk 5 hari kerja seminggu.",
    },
  ],
  glosario: [
    { termino: "Upah sejam", definicion: "Upah sebulan dibagi 173, dasar semua perhitungan lembur." },
    { termino: "Hari kerja terpendek", definicion: "Hari dengan jam kerja paling sedikit dalam pola 6 hari kerja seminggu." },
  ],
});
