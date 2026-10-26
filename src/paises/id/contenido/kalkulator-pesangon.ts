import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "id.kalkulator-pesangon",
  h1: "Kalkulator Pesangon",
  title: "Kalkulator Pesangon 2026: hitung pesangon PHK (PP 35/2021)",
  description: "Hitung uang pesangon, uang penghargaan masa kerja dan uang penggantian hak saat PHK, dengan pengali sesuai alasan PHK di PP 35/2021.",
  intro: [
    "Saat terjadi pemutusan hubungan kerja (PHK), pengusaha wajib membayar uang pesangon dan/atau uang penghargaan masa kerja, ditambah uang penggantian hak.",
    "Besarnya bergantung pada masa kerja, upah dan alasan PHK. Kalkulator ini memakai tabel dan pengali di PP 35/2021.",
  ],
  comoSeCalcula: [
    "Uang pesangon menurut masa kerja: {{id.uang-pesangon[0]}} upah untuk masa kerja kurang dari 1 tahun, naik 1 bulan setiap tahun, hingga {{id.uang-pesangon[8]}} upah untuk 8 tahun atau lebih.",
    "Uang penghargaan masa kerja mulai {{id.uang-penghargaan-masa-kerja[3]}} upah untuk masa kerja 3 tahun, hingga {{id.uang-penghargaan-masa-kerja[24]}} upah untuk 24 tahun atau lebih.",
    "Uang pesangon dikalikan pengali sesuai alasan PHK. Contohnya {{id.pesangon-pengali[efisiensi-rugi]}} kali untuk efisiensi karena rugi, {{id.pesangon-pengali[pensiun]}} kali untuk pensiun dan {{id.pesangon-pengali[meninggal]}} kali jika pekerja meninggal dunia.",
    "Upah yang dipakai adalah upah sebulan: gaji pokok ditambah tunjangan tetap.",
    "Perkiraan PPh 21 final memakai tarif uang pesangon di PP 68/2009.",
  ],
  ejemplo: ["Upah Rp8.000.000, masa kerja 5 tahun, PHK karena efisiensi untuk mencegah kerugian: uang pesangon 6 bulan Rp48.000.000 dan uang penghargaan masa kerja 2 bulan Rp16.000.000. Total Rp64.000.000."],
  faq: [
    {
      pregunta: "Berapa pesangon untuk masa kerja 1 tahun?",
      respuesta: "Masa kerja 1 tahun sampai kurang dari 2 tahun mendapat uang pesangon {{id.uang-pesangon[1]}} upah, dikali pengali sesuai alasan PHK. Uang penghargaan masa kerja baru diberikan mulai 3 tahun.",
    },
    {
      pregunta: "Apakah karyawan yang resign dapat pesangon?",
      respuesta: "Tidak. Pekerja yang mengundurkan diri atas kemauan sendiri berhak atas uang penggantian hak dan uang pisah, yang besarnya diatur di perjanjian kerja, peraturan perusahaan atau perjanjian kerja bersama.",
    },
    {
      pregunta: "Apa saja uang penggantian hak?",
      respuesta: "Cuti tahunan yang belum diambil dan belum gugur, ongkos pulang ke tempat pekerja diterima bekerja, dan hal lain yang diatur di perjanjian kerja, peraturan perusahaan atau perjanjian kerja bersama.",
    },
    {
      pregunta: "Berapa pesangon jika perusahaan pailit?",
      respuesta: "Pekerja berhak atas uang pesangon {{id.pesangon-pengali[pailit]}} kali ketentuan, uang penghargaan masa kerja 1 kali dan uang penggantian hak. Pembayarannya dilakukan oleh kurator.",
    },
  ],
  glosario: [
    { termino: "PHK", definicion: "Pemutusan hubungan kerja." },
    { termino: "UPMK", definicion: "Uang penghargaan masa kerja, diberikan mulai masa kerja 3 tahun." },
    { termino: "UPH", definicion: "Uang penggantian hak, misalnya cuti yang belum diambil." },
  ],
});
