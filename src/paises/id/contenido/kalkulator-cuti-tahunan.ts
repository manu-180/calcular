import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "id.kalkulator-cuti-tahunan",
  h1: "Kalkulator Cuti Tahunan",
  title: "Kalkulator Cuti Tahunan: sisa cuti dan uang pengganti cuti",
  description: "Hitung sisa cuti tahunan Anda dan uang pengganti cuti yang belum diambil saat PHK, dengan hak cuti minimal 12 hari kerja sesuai UU Cipta Kerja.",
  intro: [
    "Setiap pekerja berhak atas cuti tahunan setelah bekerja 12 bulan berturut-turut.",
    "Kalkulator ini menghitung sisa cuti dan perkiraan uang pengganti untuk cuti yang belum diambil, yang termasuk uang penggantian hak saat PHK.",
  ],
  comoSeCalcula: [
    "Hak cuti tahunan paling sedikit {{id.cuti-tahunan}} kerja setelah masa kerja {{id.cuti-tahunan-masa-kerja}} terus-menerus.",
    "Sisa cuti adalah hak cuti dikurangi cuti yang sudah diambil.",
    "Upah sehari adalah upah sebulan dibagi {{id.upah-sebulan-pengali-harian[6-hari]}} untuk 6 hari kerja seminggu atau {{id.upah-sebulan-pengali-harian[5-hari]}} untuk 5 hari kerja seminggu, kebalikan dari cara PP 35/2021 mengubah upah harian menjadi bulanan.",
  ],
  ejemplo: ["Masa kerja 18 bulan, sudah mengambil 4 hari, upah Rp6.300.000 dengan 6 hari kerja: sisa 8 hari dan uang pengganti Rp2.016.000."],
  faq: [
    {
      pregunta: "Berapa hari cuti tahunan menurut undang-undang?",
      respuesta: "Paling sedikit {{id.cuti-tahunan}} kerja setelah bekerja {{id.cuti-tahunan-masa-kerja}} terus-menerus. Pelaksanaannya diatur di perjanjian kerja, peraturan perusahaan atau perjanjian kerja bersama.",
    },
    {
      pregunta: "Apakah cuti yang belum diambil dibayar saat PHK?",
      respuesta: "Ya. Cuti tahunan yang belum diambil dan belum gugur termasuk uang penggantian hak yang wajib dibayar saat PHK.",
    },
    {
      pregunta: "Apakah perusahaan boleh memberi lebih dari 12 hari?",
      respuesta: "Boleh. Angka di undang-undang adalah batas paling sedikit.",
    },
  ],
  glosario: [
    { termino: "Cuti tahunan", definicion: "Hak istirahat tahunan pekerja, paling sedikit {{id.cuti-tahunan}} kerja setelah {{id.cuti-tahunan-masa-kerja}} bekerja." },
    { termino: "Uang penggantian hak", definicion: "Pembayaran saat PHK, termasuk untuk cuti tahunan yang belum diambil." },
  ],
});
