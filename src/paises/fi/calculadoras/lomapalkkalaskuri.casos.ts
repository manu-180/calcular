import { definirCasos } from "@/motor/calculo";
import lomapalkkalaskuri from "./lomapalkkalaskuri";

const VLL = "https://www.finlex.fi/fi/lainsaadanto/2005/162";
const pohja = { kuukausipalkka: null, palkat: null, tyopaivat: null, viikkopaivat: null } as const;

export default definirCasos(lomapalkkalaskuri, [
  {
    nombre: "Kuukausipalkka 3 000 euroa, koko vuosi",
    origen: { tipo: "recalculado", url: VLL, detalle: "5 §: 12 × 2,5 = 30 lomapäivää. 17 §:n jakaja 25: 3 000 / 25 = 120 euroa päivältä, 30 × 120 = 3 600." },
    fecha: "2026-10-24",
    entrada: { ...pohja, palkkaus: "kuukausi", vuosi: true, kuukaudet: 12, kuukausipalkka: 3000 },
    esperado: { lomapaivat: 30, lomapalkka: 3600, paivanPalkka: 120 },
  },
  {
    nombre: "Ensimmäinen vuosi: 7 kuukautta ja 2 päivää kuukaudelta",
    origen: { tipo: "recalculado", url: VLL, detalle: "5 §: alle vuoden työsuhteessa 2 päivää kuukaudelta: 7 × 2 = 14 lomapäivää. 2 800 / 25 × 14 = 1 568." },
    fecha: "2026-10-24",
    entrada: { ...pohja, palkkaus: "kuukausi", vuosi: false, kuukaudet: 7, kuukausipalkka: 2800 },
    esperado: { lomapaivat: 14, lomapalkka: 1568 },
  },
  {
    nombre: "Päivän osa pyöristetään ylöspäin: 7 kuukautta × 2,5",
    origen: { tipo: "recalculado", url: VLL, detalle: "5 §: 7 × 2,5 = 17,5, joka pyöristetään 18 lomapäivään." },
    fecha: "2026-10-24",
    entrada: { ...pohja, palkkaus: "kuukausi", vuosi: true, kuukaudet: 7, kuukausipalkka: 2500 },
    esperado: { lomapaivat: 18, lomapalkka: 1800 },
  },
  {
    nombre: "Tuntipalkka: keskipäiväpalkka kertaa kerroin",
    origen: { tipo: "recalculado", url: VLL, detalle: "11 §: 30 lomapäivän kerroin 27,8. Keskipäiväpalkka 30 000 / 220 = 136,36; 136,3636 × 27,8 = 3 790,91." },
    fecha: "2026-10-24",
    entrada: { ...pohja, palkkaus: "tunti", vuosi: true, kuukaudet: 12, palkat: 30000, tyopaivat: 220, viikkopaivat: 5 },
    esperado: { lomapaivat: 30, kerroin: 27.8, paivanPalkka: 136.36, lomapalkka: 3790.91 },
  },
  {
    nombre: "Tuntipalkka, neljä työpäivää viikossa ja 20 lomapäivää",
    origen: { tipo: "recalculado", url: VLL, detalle: "11 §: kerroin 18,3. Keskipäiväpalkka 20 000 / 160 × 4 / 5 = 100; 100 × 18,3 = 1 830." },
    fecha: "2026-10-24",
    entrada: { ...pohja, palkkaus: "tunti", vuosi: true, kuukaudet: 8, palkat: 20000, tyopaivat: 160, viikkopaivat: 4 },
    esperado: { lomapaivat: 20, kerroin: 18.3, lomapalkka: 1830 },
  },
  {
    nombre: "Alle 14 päivää kuukaudessa: 11,5 prosenttia",
    origen: { tipo: "recalculado", url: VLL, detalle: "12 §: 11,5 % × 8 000 = 920." },
    fecha: "2026-10-24",
    entrada: { ...pohja, palkkaus: "prosentti", vuosi: true, kuukaudet: null, palkat: 8000 },
    esperado: { lomapalkka: 920 },
  },
  {
    nombre: "Alle 14 päivää kuukaudessa, alle vuoden työsuhde: 9 prosenttia",
    origen: { tipo: "recalculado", url: VLL, detalle: "12 §: 9 % × 8 000 = 720." },
    fecha: "2026-10-24",
    entrada: { ...pohja, palkkaus: "prosentti", vuosi: false, kuukaudet: null, palkat: 8000 },
    esperado: { lomapalkka: 720 },
  },
]);
