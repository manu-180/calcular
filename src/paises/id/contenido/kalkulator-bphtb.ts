import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "id.kalkulator-bphtb",
  h1: "Kalkulator BPHTB",
  title: "Kalkulator BPHTB: hitung pajak beli rumah dan tanah",
  description: "Hitung bea perolehan hak atas tanah dan bangunan (BPHTB) saat membeli atau mewarisi rumah: NPOP, NPOPTKP dan tarif sesuai UU HKPD.",
  intro: [
    "Pembeli rumah atau tanah membayar BPHTB kepada daerah tempat tanah atau bangunan itu berada.",
    "Tarif dan NPOPTKP ditetapkan Perda masing-masing daerah. Jika Anda tahu angka daerah Anda, isi kolom opsional. Jika tidak, kalkulator memakai batas di undang-undang.",
  ],
  comoSeCalcula: [
    "Nilai perolehan objek pajak (NPOP) adalah harga transaksi. Jika harga itu lebih rendah dari NJOP PBB, yang dipakai NJOP.",
    "NPOP dikurangi NPOPTKP, paling sedikit {{id.npoptkp-minimal}} untuk perolehan hak pertama, atau {{id.npoptkp-waris-minimal}} untuk waris dan hibah wasiat dalam keluarga inti.",
    "Sisanya dikalikan tarif BPHTB daerah, paling tinggi {{id.bphtb-tarif-maks}}.",
  ],
  ejemplo: ["Rumah dibeli Rp500.000.000 dengan NJOP Rp450.000.000: NPOP Rp500.000.000 dikurangi NPOPTKP Rp80.000.000 = Rp420.000.000. Dengan tarif 5%, BPHTB Rp21.000.000."],
  faq: [
    {
      pregunta: "Berapa tarif BPHTB?",
      respuesta: "Tarif BPHTB ditetapkan Perda kabupaten atau kota, paling tinggi {{id.bphtb-tarif-maks}} menurut UU 1/2022.",
    },
    {
      pregunta: "Berapa NPOPTKP?",
      respuesta: "Paling sedikit {{id.npoptkp-minimal}} untuk perolehan hak pertama di daerah itu. Untuk waris atau hibah wasiat dari orang tua, anak atau suami/istri, paling sedikit {{id.npoptkp-waris-minimal}}. Daerah boleh menetapkan angka yang lebih tinggi.",
    },
    {
      pregunta: "Kapan BPHTB terutang?",
      respuesta: "Untuk jual beli, saat perjanjian pengikatan jual beli dibuat dan ditandatangani.",
    },
  ],
  glosario: [
    { termino: "BPHTB", definicion: "Bea perolehan hak atas tanah dan bangunan, pajak daerah atas perolehan rumah atau tanah." },
    { termino: "NPOPTKP", definicion: "Nilai perolehan objek pajak tidak kena pajak, pengurang sebelum tarif dikenakan." },
    { termino: "NJOP", definicion: "Nilai jual objek pajak yang tercantum di SPPT PBB." },
  ],
});
