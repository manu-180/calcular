import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "id.kalkulator-pajak-sewa",
  h1: "Kalkulator Pajak Sewa Rumah dan Bangunan",
  title: "Kalkulator Pajak Sewa: PPh final sewa tanah dan bangunan",
  description: "Hitung PPh final atas sewa rumah, ruko, kantor atau tanah, termasuk service charge. Bisa juga menghitung nilai bruto dari nilai bersih. Sesuai PP 34/2017.",
  intro: [
    "Penghasilan dari menyewakan tanah dan/atau bangunan (rumah, kos, ruko, kantor, gudang) dikenai PPh final.",
    "Masukkan nilai sewa bruto untuk melihat pajaknya, atau nilai bersih yang diinginkan pemilik untuk menghitung nilai sewa brutonya.",
  ],
  comoSeCalcula: [
    "PPh final = {{id.pph-sewa}} x nilai sewa bruto.",
    "Nilai bruto termasuk pembayaran lain yang terkait sewa, seperti service charge untuk keamanan, kebersihan dan perawatan.",
    "Untuk gross-up, nilai bersih dibagi 1 dikurangi tarif.",
  ],
  ejemplo: ["Contoh resmi PP 34/2017: sewa Rp200.000.000 ditambah service charge Rp15.000.000. PPh final 10% x Rp215.000.000 = Rp21.500.000."],
  faq: [
    {
      pregunta: "Berapa tarif pajak sewa rumah?",
      respuesta: "PPh atas persewaan tanah dan/atau bangunan bersifat final sebesar {{id.pph-sewa}} dari jumlah bruto nilai persewaan.",
    },
    {
      pregunta: "Apakah service charge ikut kena pajak?",
      respuesta: "Ya, jika terkait dengan sewa. Contoh di penjelasan PP 34/2017 memasukkan service charge keamanan, kebersihan dan perawatan ke dalam nilai sewa bruto.",
    },
    {
      pregunta: "Siapa yang menyetor pajaknya?",
      respuesta: "Jika penyewa adalah pemotong pajak (misalnya badan usaha atau instansi pemerintah), penyewa yang memotong PPh. Jika bukan, pemilik yang menerima sewa membayar sendiri pajaknya.",
    },
  ],
  glosario: [
    { termino: "PPh final", definicion: "Pajak yang selesai saat dipotong atau disetor, tidak digabung dengan penghasilan lain." },
    { termino: "Nilai sewa bruto", definicion: "Seluruh jumlah yang dibayar penyewa terkait sewa, sebelum dipotong pajak." },
  ],
});
