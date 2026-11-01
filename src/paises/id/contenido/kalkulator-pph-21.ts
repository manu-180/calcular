import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "id.kalkulator-pph-21",
  h1: "Kalkulator PPh 21 Tahunan",
  title: "Kalkulator PPh 21 {{anio}}: hitung pajak penghasilan setahun",
  description: "Hitung PPh 21 setahun dengan tarif Pasal 17, PTKP dan biaya jabatan, lalu cek berapa potongan PPh 21 di bulan Desember. Sesuai PMK 168/2023.",
  intro: [
    "Kalkulator ini menghitung PPh 21 terutang setahun untuk pegawai tetap, cara yang sama dengan hitungan pemberi kerja di bulan Desember.",
    "Jika Anda mengisi potongan PPh 21 Januari sampai November, hasilnya juga menunjukkan kekurangan atau kelebihan potong yang diselesaikan di gaji Desember.",
  ],
  comoSeCalcula: [
    "Penghasilan bruto setahun dikurangi biaya jabatan {{id.biaya-jabatan-tarif}} dari bruto, paling banyak {{id.biaya-jabatan-maks-tahun}}.",
    "Lalu dikurangi iuran JHT dan pensiun yang Anda bayar sendiri, serta zakat yang dibayar lewat kantor. Hasilnya penghasilan neto.",
    "Penghasilan neto dikurangi PTKP sesuai status Anda, lalu dibulatkan ke bawah hingga ribuan rupiah. Itulah penghasilan kena pajak (PKP).",
    "PKP dikenai tarif Pasal 17 berlapis: {{id.tarif-pasal-17[0].tasa}} sampai {{id.tarif-pasal-17[0].hasta}}, {{id.tarif-pasal-17[1].tasa}} sampai {{id.tarif-pasal-17[1].hasta}}, {{id.tarif-pasal-17[2].tasa}} sampai {{id.tarif-pasal-17[2].hasta}}, {{id.tarif-pasal-17[3].tasa}} sampai {{id.tarif-pasal-17[3].hasta}} dan {{id.tarif-pasal-17[-1].tasa}} di atasnya.",
  ],
  ejemplo: [
    "Contoh di PMK 168/2023: penghasilan bruto Rp450.960.000 setahun, status K/0, iuran pensiun Rp1.200.000 dan zakat Rp2.400.000. PKP Rp382.860.000 dan PPh 21 setahun Rp64.715.000. Karena sudah dipotong Rp50.120.000, potongan Desember Rp14.595.000.",
  ],
  faq: [
    {
      pregunta: "Apa beda PPh 21 TER dengan PPh 21 tahunan?",
      respuesta: "TER dipakai untuk memotong pajak Januari sampai November. Pajak yang sebenarnya terutang dihitung setahun dengan tarif Pasal 17. Bulan Desember menutup selisihnya.",
    },
    {
      pregunta: "Apa saja yang termasuk penghasilan bruto?",
      respuesta: "Gaji, semua tunjangan, lembur, THR, bonus, dan iuran JKK, JKM serta BPJS Kesehatan yang dibayar pemberi kerja. Iuran JHT dan JP bagian kantor tidak termasuk.",
    },
    {
      pregunta: "Apakah zakat mengurangi PPh 21?",
      respuesta: "Ya, jika zakat atau sumbangan keagamaan wajib dibayar lewat pemberi kerja kepada badan atau lembaga yang disahkan pemerintah. Zakat itu mengurangi penghasilan bruto.",
    },
    {
      pregunta: "Berapa PTKP tahun ini?",
      respuesta: "PTKP diri sendiri {{id.ptkp-diri}}, tambahan {{id.ptkp-kawin}} jika kawin dan {{id.ptkp-tanggungan}} per tanggungan, paling banyak {{id.ptkp-tanggungan-maks}} orang.",
    },
  ],
  glosario: [
    { termino: "Biaya jabatan", definicion: "Pengurang tetap untuk pegawai tetap, dihitung dari penghasilan bruto dengan batas setahun." },
    { termino: "PKP", definicion: "Penghasilan kena pajak: penghasilan neto dikurangi PTKP." },
    { termino: "Masa pajak terakhir", definicion: "Bulan Desember, atau bulan terakhir bekerja, saat PPh 21 setahun dihitung ulang." },
  ],
});
