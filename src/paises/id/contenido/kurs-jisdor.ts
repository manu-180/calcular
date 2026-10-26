import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "id.kurs-jisdor",
  h1: "Kurs Dolar Hari Ini (JISDOR)",
  title: "Kurs JISDOR hari ini: konversi dolar AS ke rupiah",
  description: "Konversi dolar AS ke rupiah dan sebaliknya dengan kurs referensi JISDOR terbaru dari Bank Indonesia: {{id.jisdor}} per dolar.",
  intro: [
    "JISDOR (Jakarta Interbank Spot Dollar Rate) adalah kurs referensi rupiah terhadap dolar AS yang diterbitkan Bank Indonesia setiap hari kerja.",
    "Kalkulator ini memakai kurs JISDOR terbaru yang tersedia, saat ini {{id.jisdor}} per dolar AS pada {{id.jisdor#desde}}.",
  ],
  comoSeCalcula: [
    "Dolar ke rupiah: jumlah dolar dikalikan kurs JISDOR.",
    "Rupiah ke dolar: jumlah rupiah dibagi kurs JISDOR.",
  ],
  ejemplo: ["Dengan kurs Rp18.069 per dolar, USD 100 setara Rp1.806.900."],
  faq: [
    {
      pregunta: "Berapa kurs dolar hari ini?",
      respuesta: "Kurs JISDOR terbaru adalah {{id.jisdor}} per dolar AS, tanggal {{id.jisdor#desde}}.",
    },
    {
      pregunta: "Kenapa kurs di bank berbeda?",
      respuesta: "Bank dan money changer menetapkan kurs jual dan kurs beli sendiri, dengan selisih dari kurs referensi.",
    },
    {
      pregunta: "Kapan JISDOR diperbarui?",
      respuesta: "Bank Indonesia menerbitkan JISDOR setiap hari kerja. Di hari libur kalkulator ini memakai kurs hari kerja terakhir.",
    },
  ],
  glosario: [
    { termino: "JISDOR", definicion: "Jakarta Interbank Spot Dollar Rate, kurs referensi USD/IDR dari Bank Indonesia." },
  ],
});
