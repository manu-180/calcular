import { definirCasos } from "@/motor/calculo";
import zalohyOsvc from "./zalohy-osvc";

const ZALOHY = "https://www.cssz.gov.cz/zalohy-na-pojistne-na-duchodove-pojisteni";

export default definirCasos(zalohyOsvc, [
  {
    nombre: "Základ 400 000 Kč, hlavní činnost",
    origen: {
      tipo: "recalculado",
      url: ZALOHY,
      detalle: "Sociální: 55 % z 400 000 / 12 = 18 333,33 → 18 334 × 29,2 % = 5 353,53 → 5 354. Zdravotní: 50 % = 16 666,67 → 16 667 × 13,5 % = 2 250,05 → 2 251, minimum 3 306.",
    },
    fecha: "2026-10-24",
    entrada: { prijmy: 1000000, vydaje: 600000, mesice: 12, cinnost: "hlavni" },
    esperado: { socialni: 5354, zdravotni: 3306, celkem: 8660, vzSocialni: 18334 },
  },
  {
    nombre: "Nízký základ od července 2026: minimum 5 005 Kč",
    origen: { tipo: "oficial", url: ZALOHY, detalle: "ČSSZ: minimální záloha při hlavní činnosti od 1. 7. 2026 je 5 005 Kč (vyměřovací základ 17 139 Kč)." },
    fecha: "2026-10-24",
    entrada: { prijmy: 400000, vydaje: 200000, mesice: 12, cinnost: "hlavni" },
    esperado: { socialni: 5005, zdravotni: 3306 },
  },
  {
    nombre: "Stejný základ v březnu 2026: minimum 5 720 Kč",
    origen: {
      tipo: "oficial",
      url: "https://www.cssz.gov.cz/-/prehled-nejdulezitejsich-udaju-pro-socialni-zabezpeceni-v-roce-2026",
      detalle: "ČSSZ: minimální záloha při hlavní činnosti v roce 2026 (do června) 5 720 Kč.",
    },
    fecha: "2026-03-01",
    entrada: { prijmy: 400000, vydaje: 200000, mesice: 12, cinnost: "hlavni" },
    esperado: { socialni: 5720 },
  },
  {
    nombre: "Vedlejší činnost pod rozhodnou částkou",
    origen: { tipo: "recalculado", url: ZALOHY, detalle: "Základ 100 000 Kč je pod rozhodnou částkou 117 521 Kč: zálohy se neplatí." },
    fecha: "2026-10-24",
    entrada: { prijmy: 200000, vydaje: 100000, mesice: 12, cinnost: "vedlejsi" },
    esperado: { socialni: 0, zdravotni: 0, celkem: 0 },
  },
  {
    nombre: "Vedlejší činnost se základem 300 000 Kč",
    origen: { tipo: "recalculado", url: ZALOHY, detalle: "55 % z 300 000 / 12 = 13 750 × 29,2 % = 4 015 Kč (víc než minimum 1 574 Kč)." },
    fecha: "2026-10-24",
    entrada: { prijmy: 500000, vydaje: 200000, mesice: 12, cinnost: "vedlejsi" },
    esperado: { socialni: 4015 },
  },
  {
    nombre: "Velmi vysoký základ: maximální záloha",
    origen: { tipo: "oficial", url: ZALOHY, detalle: "ČSSZ: maximální záloha při výkonu hlavní i vedlejší činnosti činí 57 194 Kč." },
    fecha: "2026-10-24",
    entrada: { prijmy: 8000000, vydaje: 2000000, mesice: 12, cinnost: "hlavni" },
    esperado: { socialni: 57194 },
  },
  {
    nombre: "Nulové příjmy",
    origen: { tipo: "recalculado", url: ZALOHY, detalle: "Bez příjmů nelze zálohy spočítat." },
    fecha: "2026-10-24",
    entrada: { prijmy: 0, vydaje: 0, mesice: 12, cinnost: "hlavni" },
    esperaError: true,
  },
]);
