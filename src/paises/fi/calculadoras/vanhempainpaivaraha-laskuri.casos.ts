import { definirCasos } from "@/motor/calculo";
import vanhempainpaivaraha from "./vanhempainpaivaraha-laskuri";

const KAAVAT = "https://www.kela.fi/annual-income-calculation";

export default definirCasos(vanhempainpaivaraha, [
  {
    nombre: "Palkka 40 000 euroa, 160 päivää",
    origen: {
      tipo: "recalculado",
      url: KAAVAT,
      detalle: "Vuositulo 40 000 × (1 − 9,07 %) = 36 372. Tavallinen 0,7 × 36 372 / 300 = 84,87. Korotettu 0,9 × 36 372 / 300 = 109,12. 16 × 109,12 + 144 × 84,87 = 13 967,20.",
    },
    fecha: "2026-10-24",
    entrada: { palkka: 40000, paivat: 160 },
    esperado: { tavallinen: 84.87, korotettu: 109.12, yhteensa: 13967.2, kuukaudessa: 2121.75, vuositulo: 36372 },
  },
  {
    nombre: "Palkka 80 000 euroa: kaikki tulorajat ylittyvät",
    origen: {
      tipo: "recalculado",
      url: KAAVAT,
      detalle: "Vuositulo 72 744. Tavallinen 139,58 + 0,25 × (72 744 − 70 379) / 300 = 141,55. Korotettu 211,14 + 0,325 × 2 365 / 300 = 213,70.",
    },
    fecha: "2026-10-24",
    entrada: { palkka: 80000, paivat: 16 },
    esperado: { tavallinen: 141.55, korotettu: 213.7, yhteensa: 3419.2 },
  },
  {
    nombre: "Pienet tulot: vähimmäispäiväraha",
    origen: { tipo: "recalculado", url: KAAVAT, detalle: "Vuositulo 9 093 alittaa 10 664 ja 13 712 euroa, joten molemmat päivärahat ovat vähimmäismäärä 31,99." },
    fecha: "2026-10-24",
    entrada: { palkka: 10000, paivat: 20 },
    esperado: { tavallinen: 31.99, korotettu: 31.99, yhteensa: 639.8 },
  },
]);
