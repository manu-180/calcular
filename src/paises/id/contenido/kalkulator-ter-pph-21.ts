import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "id.kalkulator-ter-pph-21",
  h1: "Kalkulator TER PPh 21",
  title: "Kalkulator TER PPh 21: tarif efektif bulanan A, B dan C",
  description: "Cari tarif efektif rata-rata (TER) PPh 21 kategori A, B atau C dan hitung potongan pajak bulan ini dari penghasilan bruto. Tabel resmi PP 58/2023.",
  intro: [
    "Sejak 2024 pemberi kerja memotong PPh 21 pegawai tetap setiap bulan dengan tarif efektif rata-rata (TER). Caranya sederhana: penghasilan bruto bulan itu dikali satu tarif dari tabel.",
    "Masukkan penghasilan bruto bulan ini dan status PTKP Anda. Kalkulator mencari kategori dan baris tabel yang tepat.",
  ],
  comoSeCalcula: [
    "Status PTKP menentukan kategori: A untuk TK/0, TK/1 dan K/0; B untuk TK/2, TK/3, K/1 dan K/2; C untuk K/3.",
    "Setiap kategori punya tabel sendiri. Misalnya kategori A memakai tarif {{id.ter-kategori-a[0].tasa}} sampai {{id.ter-kategori-a[0].hasta}} dan naik bertahap hingga {{id.ter-kategori-a[-1].tasa}} di atas {{id.ter-kategori-a[-1].desde}}.",
    "Tarif dari baris yang memuat penghasilan Anda dikalikan ke seluruh penghasilan bruto, bukan berlapis.",
  ],
  ejemplo: [
    "Contoh resmi PMK 168/2023: penghasilan bruto Rp15.500.000, status TK/0. Kategori A, tarif 7%, jadi PPh 21 bulan itu Rp1.085.000.",
  ],
  faq: [
    {
      pregunta: "Bulan apa saja TER dipakai?",
      respuesta: "TER dipakai untuk masa pajak Januari sampai November. Di bulan Desember, atau bulan terakhir bekerja, PPh 21 dihitung ulang setahun dengan tarif Pasal 17.",
    },
    {
      pregunta: "Kenapa PPh 21 naik di bulan saya menerima THR atau bonus?",
      respuesta: "THR dan bonus menambah penghasilan bruto bulan itu, jadi Anda masuk baris tabel dengan tarif lebih tinggi. Kelebihannya biasanya terkoreksi di bulan Desember.",
    },
    {
      pregunta: "Apakah tarif TER sudah final?",
      respuesta: "Tidak. TER hanya cara memotong pajak setiap bulan. Pajak yang benar-benar terutang dihitung setahun.",
    },
  ],
  glosario: [
    { termino: "TER", definicion: "Tarif efektif rata-rata, diatur di Lampiran PP 58/2023." },
    { termino: "Status PTKP", definicion: "Kode status kawin dan jumlah tanggungan, misalnya TK/0 atau K/2." },
  ],
});
