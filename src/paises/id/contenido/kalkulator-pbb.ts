import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "id.kalkulator-pbb",
  h1: "Kalkulator PBB",
  title: "Kalkulator PBB: cara menghitung pajak bumi dan bangunan",
  description: "Hitung PBB-P2 setahun dari NJOP bumi dan bangunan, NJOPTKP, persentase NJOP dan tarif daerah, dengan batas dari UU 1/2022 (HKPD).",
  intro: [
    "PBB perdesaan dan perkotaan (PBB-P2) dibayar setiap tahun kepada pemerintah kabupaten atau kota.",
    "Isi NJOP dari SPPT PBB Anda. NJOPTKP, persentase NJOP dan tarif bisa Anda isi sesuai Perda daerah. Jika dikosongkan, kalkulator memakai batas di undang-undang.",
  ],
  comoSeCalcula: [
    "NJOP bumi dan bangunan dijumlahkan, lalu dikurangi NJOP tidak kena pajak, paling sedikit {{id.njoptkp-minimal}} per wajib pajak.",
    "Hasilnya dikalikan persentase NJOP yang ditetapkan daerah, antara {{id.pbb-persen-njop-min}} dan {{id.pbb-persen-njop-maks}}.",
    "Dasar itu dikalikan tarif PBB daerah, paling tinggi {{id.pbb-tarif-maks}}.",
  ],
  ejemplo: ["NJOP bumi Rp300.000.000 dan bangunan Rp200.000.000, NJOPTKP Rp10.000.000, 100% NJOP dan tarif 0,5%: PBB Rp2.450.000 setahun."],
  faq: [
    {
      pregunta: "Berapa tarif PBB?",
      respuesta: "Tarif ditetapkan Perda, paling tinggi {{id.pbb-tarif-maks}}. Tarif untuk lahan produksi pangan dan ternak harus lebih rendah dari lahan lain.",
    },
    {
      pregunta: "Berapa NJOPTKP?",
      respuesta: "Paling sedikit {{id.njoptkp-minimal}} untuk setiap wajib pajak. Jika Anda punya lebih dari satu objek di satu kabupaten atau kota, NJOPTKP hanya diberikan untuk satu objek.",
    },
    {
      pregunta: "Seberapa sering NJOP diperbarui?",
      respuesta: "NJOP ditetapkan setiap 3 tahun, kecuali objek tertentu yang bisa ditetapkan setiap tahun sesuai perkembangan wilayah.",
    },
  ],
  glosario: [
    { termino: "PBB-P2", definicion: "Pajak bumi dan bangunan perdesaan dan perkotaan, pajak daerah tahunan." },
    { termino: "SPPT", definicion: "Surat pemberitahuan pajak terutang PBB yang dikirim setiap tahun." },
  ],
});
