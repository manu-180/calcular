import { definirCasos } from "@/motor/calculo";
import lomakorvauslaskuri from "./lomakorvauslaskuri";

const VLL = "https://www.finlex.fi/fi/lainsaadanto/2005/162";

export default definirCasos(lomakorvauslaskuri, [
  {
    nombre: "Kuukausipalkka 3 000 euroa, 10 pitämätöntä päivää ja 5 kuukautta",
    origen: { tipo: "recalculado", url: VLL, detalle: "17 §: 5 × 2,5 = 12,5 → 13 päivää; yhteensä 23 päivää. Jakaja 25: 3 000 / 25 = 120; 23 × 120 = 2 760." },
    fecha: "2026-10-24",
    entrada: { palkkaus: "kuukausi", vuosi: true, kuukausipalkka: 3000, pitamattomat: 10, kuukaudet: 5, palkat: null },
    esperado: { kertyneet: 13, paivatYhteensa: 23, lomakorvaus: 2760 },
  },
  {
    nombre: "Lyhyt työsuhde: 4 kuukautta, 2 päivää kuukaudelta",
    origen: { tipo: "recalculado", url: VLL, detalle: "4 × 2 = 8 päivää; 2 600 / 25 = 104; 8 × 104 = 832." },
    fecha: "2026-10-24",
    entrada: { palkkaus: "kuukausi", vuosi: false, kuukausipalkka: 2600, pitamattomat: 0, kuukaudet: 4, palkat: null },
    esperado: { kertyneet: 8, lomakorvaus: 832 },
  },
  {
    nombre: "Prosenttiperusteinen lomakorvaus 9 prosenttia",
    origen: { tipo: "recalculado", url: VLL, detalle: "16 §: 9 % × 10 000 = 900." },
    fecha: "2026-10-24",
    entrada: { palkkaus: "prosentti", vuosi: false, kuukausipalkka: null, pitamattomat: null, kuukaudet: null, palkat: 10000 },
    esperado: { lomakorvaus: 900 },
  },
]);
