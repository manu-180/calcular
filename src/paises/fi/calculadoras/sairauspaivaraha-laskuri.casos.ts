import { definirCasos } from "@/motor/calculo";
import sairauspaivaraha from "./sairauspaivaraha-laskuri";

const KAAVAT = "https://www.kela.fi/annual-income-calculation";

export default definirCasos(sairauspaivaraha, [
  {
    nombre: "Palkka 40 000 euroa, sairaus 30 arkipäivää",
    origen: {
      tipo: "recalculado",
      url: KAAVAT,
      detalle: "Vuositulo 36 372. 0,7 × 36 372 / 300 − 0,55 × (36 372 − 28 899) / 300 = 71,17. Omavastuun jälkeen 20 päivää: 1 423,40. Kuukaudessa 25 × 71,17 = 1 779,25.",
    },
    fecha: "2026-10-24",
    entrada: { palkka: 40000, arkipaivat: 30 },
    esperado: { paivaraha: 71.17, korvattavat: 20, yhteensa: 1423.4, kuukaudessa: 1779.25 },
  },
  {
    nombre: "Palkka 20 000 euroa",
    origen: { tipo: "recalculado", url: KAAVAT, detalle: "Vuositulo 18 186; 0,7 × 18 186 / 300 = 42,43; kuukaudessa 1 060,75." },
    fecha: "2026-10-24",
    entrada: { palkka: 20000, arkipaivat: 10 },
    esperado: { paivaraha: 42.43, kuukaudessa: 1060.75, korvattavat: 0, yhteensa: 0 },
  },
  {
    nombre: "Pienet tulot: vähimmäispäiväraha",
    origen: { tipo: "recalculado", url: KAAVAT, detalle: "Vuositulo 9 093 on 1 757 ja 13 712 euron välillä: 31,99 euroa." },
    fecha: "2026-10-24",
    entrada: { palkka: 10000, arkipaivat: 15 },
    esperado: { paivaraha: 31.99, yhteensa: 159.95 },
  },
  {
    nombre: "Hyvin pienet tulot: ei tuloihin perustuvaa päivärahaa",
    origen: { tipo: "recalculado", url: KAAVAT, detalle: "Vuositulo 909,30 alittaa 1 756 euroa." },
    fecha: "2026-10-24",
    entrada: { palkka: 1000, arkipaivat: 15 },
    esperado: { paivaraha: 0 },
  },
]);
