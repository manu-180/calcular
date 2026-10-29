import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "id.kalkulator-gaji-bersih",
  h1: "Kalkulator Gaji Bersih",
  title: "Kalkulator Gaji Bersih {{anio}}: gaji setelah PPh 21 dan BPJS",
  description: "Hitung gaji bersih Anda setelah PPh 21 metode TER, iuran JHT, JP dan BPJS Kesehatan. Tarif resmi PP 58/2023 dan PMK 168/2023.",
  intro: [
    "Masukkan gaji bruto per bulan dan status PTKP Anda. Hasilnya adalah gaji yang benar-benar masuk ke rekening setelah semua potongan wajib.",
    "PPh 21 dihitung seperti di slip gaji: tarif efektif rata-rata (TER) untuk Januari sampai November, lalu dihitung ulang dengan tarif Pasal 17 di bulan Desember.",
  ],
  comoSeCalcula: [
    "Iuran BPJS Ketenagakerjaan yang dipotong dari gaji Anda: JHT {{id.jht-pekerja}} dan JP {{id.jp-pekerja}} dari upah.",
    "BPJS Kesehatan: {{id.bpjs-kes-pekerja}} dari upah, dengan batas upah {{id.bpjs-kes-batas-upah}}.",
    "Penghasilan bruto untuk pajak adalah gaji ditambah iuran JKK, JKM dan BPJS Kesehatan yang dibayar kantor. Angka ini dikalikan tarif TER sesuai kategori status PTKP Anda.",
    "Untuk Desember, penghasilan setahun dikurangi biaya jabatan {{id.biaya-jabatan-tarif}} (paling banyak {{id.biaya-jabatan-maks-tahun}} setahun), iuran JHT dan JP, lalu PTKP. Sisanya dikenai tarif Pasal 17 mulai {{id.tarif-pasal-17[0].tasa}}.",
    "PPh 21 Desember adalah pajak setahun dikurangi potongan TER Januari sampai November.",
  ],
  ejemplo: [
    "Gaji Rp10.000.000 per bulan, status TK/0, risiko JKK sangat rendah: PPh 21 per bulan Rp261.350 (TER 2,5%), iuran JHT, JP dan BPJS Kesehatan Rp400.000. Gaji bersih Januari sampai November Rp9.338.650.",
  ],
  faq: [
    {
      pregunta: "Kenapa potongan PPh 21 di bulan Desember berbeda?",
      respuesta:
        "TER hanya alat potong bulanan. Di Desember pemberi kerja menghitung pajak setahun dengan tarif Pasal 17, lalu mengurangkan potongan Januari sampai November. Selisihnya bisa lebih besar, lebih kecil, atau dikembalikan.",
    },
    {
      pregunta: "Apa itu kategori TER A, B dan C?",
      respuesta:
        "Kategori ditentukan oleh status PTKP pada awal tahun. A untuk TK/0, TK/1 dan K/0. B untuk TK/2, TK/3, K/1 dan K/2. C untuk K/3.",
    },
    {
      pregunta: "Berapa PTKP untuk karyawan lajang?",
      respuesta: "PTKP untuk diri sendiri {{id.ptkp-diri}} setahun. Tambahan {{id.ptkp-kawin}} jika kawin dan {{id.ptkp-tanggungan}} untuk setiap tanggungan, paling banyak {{id.ptkp-tanggungan-maks}} orang.",
    },
    {
      pregunta: "Kenapa iuran BPJS Kesehatan saya tidak naik meski gaji naik?",
      respuesta: "Iuran BPJS Kesehatan pekerja penerima upah dihitung dari upah paling tinggi {{id.bpjs-kes-batas-upah}} per bulan. Di atas angka itu iurannya tetap.",
    },
    {
      pregunta: "Kenapa hasilnya sedikit berbeda dengan slip gaji saya?",
      respuesta:
        "Lembur, bonus, THR atau tunjangan tidak tetap mengubah PPh 21 bulan itu. Kalkulator ini memakai gaji tetap yang sama sepanjang tahun tanpa tambahan.",
    },
  ],
  glosario: [
    { termino: "TER", definicion: "Tarif efektif rata-rata untuk memotong PPh 21 bulanan pegawai tetap, diatur di PP 58/2023." },
    { termino: "PTKP", definicion: "Penghasilan tidak kena pajak, bagian penghasilan setahun yang tidak dikenai pajak." },
    { termino: "JHT dan JP", definicion: "Jaminan Hari Tua dan Jaminan Pensiun dari BPJS Ketenagakerjaan. Iuran pekerja untuk keduanya mengurangi penghasilan kena pajak." },
  ],
});
