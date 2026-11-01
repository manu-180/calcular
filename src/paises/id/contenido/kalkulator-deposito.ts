import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "id.kalkulator-deposito",
  h1: "Kalkulator Deposito",
  title: "Kalkulator Deposito: bunga bersih setelah pajak {{id.pph-bunga-deposito}}",
  description: "Hitung bunga deposito bersih setelah PPh final {{id.pph-bunga-deposito}}, dana saat jatuh tempo dan imbal hasil bersih per tahun, dengan atau tanpa ARO.",
  intro: [
    "Masukkan nominal, suku bunga per tahun dan tenor deposito Anda. Hasilnya bunga yang benar-benar Anda terima setelah pajak.",
    "Jika memilih ARO plus, bunga bersih setiap bulan ditambahkan ke pokok dan ikut berbunga.",
  ],
  comoSeCalcula: [
    "Bunga sebelum pajak = nominal x suku bunga per tahun x tenor dalam bulan / 12.",
    "Bunga deposito dikenai PPh final {{id.pph-bunga-deposito}} dari bunga bruto.",
    "Bunga tidak dipotong pajak jika jumlah deposito dan tabungan tidak melebihi {{id.deposito-batas-tidak-dipotong}} dan bukan hasil memecah simpanan.",
  ],
  ejemplo: ["Deposito Rp100.000.000 dengan bunga 4,5% selama 12 bulan: bunga Rp4.500.000, pajak Rp900.000, bunga bersih Rp3.600.000."],
  faq: [
    {
      pregunta: "Berapa pajak bunga deposito?",
      respuesta: "PPh final {{id.pph-bunga-deposito}} dari jumlah bunga bruto, dipotong langsung oleh bank.",
    },
    {
      pregunta: "Apakah deposito kecil kena pajak?",
      respuesta: "Tidak, jika jumlah deposito dan tabungan tidak melebihi {{id.deposito-batas-tidak-dipotong}} dan bukan jumlah yang dipecah-pecah.",
    },
    {
      pregunta: "Kenapa hasil di bank sedikit berbeda?",
      respuesta: "Bank bisa menghitung bunga per hari dengan jumlah hari sebenarnya. Kalkulator ini memakai bulan penuh, jadi bisa ada selisih kecil.",
    },
  ],
  glosario: [
    { termino: "Tenor", definicion: "Jangka waktu deposito sampai jatuh tempo." },
    { termino: "ARO", definicion: "Automatic roll over, deposito diperpanjang otomatis saat jatuh tempo." },
  ],
});
