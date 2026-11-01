import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "id.kalkulator-pph-21-bukan-pegawai",
  h1: "Kalkulator PPh 21 Bukan Pegawai",
  title: "Kalkulator PPh 21 Bukan Pegawai: freelancer dan tenaga ahli",
  description: "Hitung PPh 21 atas honorarium freelancer, konsultan, tenaga ahli dan jasa lain bukan pegawai: tarif Pasal 17 dikali 50% imbalan bruto.",
  intro: [
    "Jika Anda dibayar sebagai bukan pegawai (freelancer, konsultan, pembicara, penulis, tenaga ahli), pemberi kerja memotong PPh 21 dari setiap pembayaran.",
    "Kalkulator ini memakai cara di PMK 168/2023: tarif Pasal 17 dikalikan dengan separuh imbalan bruto.",
  ],
  comoSeCalcula: [
    "Dari imbalan bruto, keluarkan dulu upah pekerja, material atau tagihan pihak ketiga yang tercantum terpisah di kontrak.",
    "Dasar pemotongan adalah {{id.dpp-bukan-pegawai}} dari sisa itu.",
    "Dasar pemotongan dikenai tarif Pasal 17 berlapis, mulai {{id.tarif-pasal-17[0].tasa}} sampai {{id.tarif-pasal-17[0].hasta}} dan {{id.tarif-pasal-17[1].tasa}} untuk lapisan berikutnya.",
  ],
  ejemplo: [
    "Contoh resmi PMK 168/2023: jasa perawatan AC Rp10.000.000, dengan upah teknisi Rp4.500.000 dan komponen Rp1.000.000. Dasar pemotongan Rp2.250.000 dan PPh 21 Rp112.500.",
  ],
  faq: [
    {
      pregunta: "Apakah PPh 21 bukan pegawai bersifat final?",
      respuesta: "Tidak. Potongan ini menjadi kredit pajak yang Anda laporkan di SPT Tahunan.",
    },
    {
      pregunta: "Kenapa hanya separuh imbalan yang dikenai pajak?",
      respuesta: "PMK 168/2023 menetapkan dasar pemotongan bukan pegawai sebesar {{id.dpp-bukan-pegawai}} dari penghasilan bruto. Separuh sisanya dianggap biaya untuk menghasilkan jasa itu.",
    },
    {
      pregunta: "Apakah dokter di rumah sakit juga memakai cara ini?",
      respuesta: "Ya. Untuk dokter, penghasilan brutonya adalah jasa dokter yang dibayar pasien lewat rumah sakit atau klinik sebelum dipotong bagi hasil.",
    },
  ],
  glosario: [
    { termino: "Bukan pegawai", definicion: "Orang pribadi yang menerima imbalan jasa tanpa hubungan kerja tetap dengan pemberi penghasilan." },
    { termino: "Bukti potong", definicion: "Dokumen dari pemotong pajak yang membuktikan PPh 21 sudah dipotong." },
  ],
});
