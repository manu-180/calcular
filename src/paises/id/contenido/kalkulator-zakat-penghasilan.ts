import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "id.kalkulator-zakat-penghasilan",
  h1: "Kalkulator Zakat Penghasilan",
  title: "Kalkulator Zakat Penghasilan 2026: nisab dan cara menghitung",
  description: "Hitung zakat penghasilan per bulan dari penghasilan bruto dan cek apakah penghasilan Anda sudah mencapai nisab yang ditetapkan BAZNAS.",
  intro: [
    "Zakat penghasilan dibayar dari penghasilan yang sudah mencapai nisab.",
    "Masukkan penghasilan bruto per bulan untuk melihat apakah sudah wajib zakat dan berapa besarnya.",
  ],
  comoSeCalcula: [
    "Penghasilan per bulan dibandingkan dengan nisab bulanan {{id.zakat-nisab-bulan}}.",
    "Jika sudah mencapai nisab, zakat = {{id.zakat-kadar}} x penghasilan bruto.",
  ],
  faq: [],
  glosario: [
    { termino: "Nisab", definicion: "Batas minimal harta atau penghasilan yang membuat seseorang wajib zakat." },
  ],
});
