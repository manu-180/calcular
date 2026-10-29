import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "id.kalkulator-thr",
  h1: "Kalkulator THR",
  title: "Kalkulator THR {{anio}}: cara menghitung THR proporsional",
  description: "Hitung tunjangan hari raya (THR) Anda: satu bulan upah untuk masa kerja 12 bulan atau lebih, dan proporsional jika kurang. Sesuai Permenaker 6/2016.",
  intro: [
    "THR keagamaan wajib dibayar pemberi kerja kepada pekerja tetap maupun kontrak menjelang hari raya keagamaan masing-masing.",
    "Masukkan upah sebulan dan masa kerja Anda dalam bulan untuk melihat berapa THR yang menjadi hak Anda.",
  ],
  comoSeCalcula: [
    "Masa kerja {{id.thr-masa-kerja-penuh}} atau lebih: THR sebesar 1 bulan upah.",
    "Masa kerja {{id.thr-masa-kerja-minimal}} sampai kurang dari {{id.thr-masa-kerja-penuh}}: masa kerja dibagi 12, dikali 1 bulan upah.",
    "Upah sebulan adalah upah bersih tanpa tunjangan, atau upah pokok ditambah tunjangan tetap.",
  ],
  ejemplo: ["Upah Rp6.000.000 dan masa kerja 7 bulan: 7/12 x Rp6.000.000 = Rp3.500.000."],
  faq: [
    {
      pregunta: "Apakah pekerja kontrak (PKWT) berhak THR?",
      respuesta: "Ya. Permenaker 6/2016 mewajibkan THR untuk pekerja dengan perjanjian kerja waktu tidak tertentu maupun waktu tertentu.",
    },
    {
      pregunta: "Bagaimana THR pekerja harian lepas?",
      respuesta: "Jika masa kerja 12 bulan atau lebih, upah sebulan adalah rata-rata upah 12 bulan terakhir sebelum hari raya. Jika kurang, rata-rata upah setiap bulan selama masa kerja.",
    },
    {
      pregunta: "Hari raya apa saja yang dimaksud?",
      respuesta: "Idul Fitri, Natal, Nyepi, Waisak dan Imlek, sesuai agama masing-masing pekerja.",
    },
    {
      pregunta: "Apakah THR kena pajak?",
      respuesta: "Ya. THR menambah penghasilan bruto bulan pembayarannya, sehingga potongan PPh 21 bulan itu biasanya lebih besar.",
    },
  ],
  glosario: [
    { termino: "THR", definicion: "Tunjangan hari raya keagamaan yang wajib dibayar pemberi kerja menjelang hari raya." },
    { termino: "Proporsional", definicion: "Dibayar sebanding dengan masa kerja, bukan satu bulan penuh." },
  ],
});
