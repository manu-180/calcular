import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "id.kalkulator-gross-up-pph-21",
  h1: "Kalkulator Gross Up PPh 21",
  title: "Kalkulator Gross Up PPh 21: tunjangan pajak dengan TER",
  description: "Hitung tunjangan PPh 21 (gross up) agar pajak karyawan ditanggung penuh oleh perusahaan, memakai tarif efektif rata-rata (TER) PP 58/2023.",
  intro: [
    "Dengan metode gross up, perusahaan memberi tunjangan pajak yang besarnya sama dengan PPh 21 karyawan. Gaji yang diterima karyawan tidak terpotong pajak.",
    "Masalahnya, tunjangan itu sendiri menambah penghasilan bruto dan bisa menaikkan tarif. Kalkulator ini mencari angka tunjangan yang pas untuk potongan TER bulanan.",
  ],
  comoSeCalcula: [
    "Penghasilan bruto awal adalah gaji ditambah iuran JKK, JKM dan BPJS Kesehatan yang dibayar kantor.",
    "Tunjangan PPh dicari sampai tunjangan = tarif TER x (bruto awal + tunjangan).",
    "Tarif TER mengikuti kategori status PTKP, misalnya kategori A {{id.ter-kategori-a[0].tasa}} sampai {{id.ter-kategori-a[0].hasta}}.",
  ],
  ejemplo: ["Gaji Rp10.000.000, TK/0: tunjangan PPh 21 Rp323.320 dan penghasilan bruto Rp10.777.320, dengan TER 3%."],
  faq: [
    {
      pregunta: "Apakah gross up juga berlaku di bulan Desember?",
      respuesta: "Ya, tetapi di bulan Desember PPh 21 dihitung ulang setahun dengan tarif Pasal 17, jadi tunjangan Desember perlu dihitung dengan cara setahun.",
    },
    {
      pregunta: "Apakah tunjangan pajak ikut dikenai PPh 21?",
      respuesta: "Ya. PMK 168/2023 memasukkan segala jenis tunjangan ke penghasilan pegawai tetap, jadi tunjangan pajak menambah penghasilan bruto bulan itu.",
    },
    {
      pregunta: "Kenapa iuran JHT dan JP tidak dihitung di sini?",
      respuesta: "Untuk TER bulanan yang dipakai hanya penghasilan bruto. Iuran JHT dan JP pekerja baru mengurangi pajak saat dihitung setahun.",
    },
  ],
  glosario: [
    { termino: "Gross up", definicion: "Metode di mana perusahaan memberi tunjangan sebesar pajak karyawan." },
    { termino: "TER", definicion: "Tarif efektif rata-rata untuk PPh 21 bulanan." },
  ],
});
