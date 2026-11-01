import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "id.kalkulator-pph-final-umkm",
  h1: "Kalkulator PPh Final UMKM",
  title: "Kalkulator PPh Final UMKM {{id.pph-final-umkm}}: hitung pajak dari omzet",
  description: "Hitung PPh final UMKM dari omzet bulanan, termasuk bagian omzet orang pribadi yang tidak kena pajak setiap tahun. Sesuai PP 55/2022 dan PP 20/2026.",
  intro: [
    "Usaha kecil dengan omzet sampai batas tertentu bisa membayar PPh final yang dihitung langsung dari peredaran bruto (omzet) setiap bulan.",
    "Untuk orang pribadi, sebagian omzet setiap tahun tidak dikenai pajak. Isi omzet sejak Januari agar kalkulator tahu berapa sisa bagian bebas itu.",
  ],
  comoSeCalcula: [
    "Tarif PPh final {{id.pph-final-umkm}} dari omzet bulanan.",
    "Wajib pajak orang pribadi tidak dikenai pajak atas omzet sampai {{id.umkm-omzet-tidak-kena-pajak}} dalam satu tahun pajak, dihitung kumulatif sejak bulan pertama.",
    "Skema ini untuk omzet sampai {{id.umkm-batas-omzet}} setahun.",
  ],
  ejemplo: ["Omzet Rp100.000.000 bulan ini dan Rp450.000.000 sejak Januari: sisa bebas Rp50.000.000, jadi yang kena pajak Rp50.000.000 dan PPh final Rp250.000."],
  faq: [
    {
      pregunta: "Siapa yang bisa memakai PPh final UMKM?",
      respuesta: "Wajib pajak orang pribadi, perseroan perorangan yang didirikan satu orang dan koperasi dengan omzet sampai {{id.umkm-batas-omzet}} setahun. Penghasilan dari jasa pekerjaan bebas tidak termasuk.",
    },
    {
      pregunta: "Apakah PPh final UMKM masih dibatasi 7 tahun?",
      respuesta: "Untuk orang pribadi tidak lagi. PP 20/2026 menghapus Pasal 59 PP 55/2022, yang membatasi orang pribadi paling lama 7 tahun pajak. Koperasi tetap dibatasi 4 tahun pajak sejak terdaftar.",
    },
    {
      pregunta: "Pekerjaan bebas apa yang tidak boleh memakai skema ini?",
      respuesta: "Antara lain dokter, pengacara, akuntan, konsultan, notaris, artis, influencer, olahragawan, pengajar, penerjemah, agen asuransi dan agen iklan.",
    },
  ],
  glosario: [
    { termino: "Peredaran bruto", definicion: "Omzet: semua imbalan dari usaha sebelum dikurangi potongan penjualan, potongan tunai dan potongan sejenis." },
    { termino: "PPh final", definicion: "Pajak yang dihitung langsung dari omzet dan tidak dihitung ulang di SPT Tahunan." },
  ],
});
