import { definirCasos } from "@/motor/calculo";
import duchodovaKalkulacka from "./duchodova-kalkulacka";

const ZDUCH = "https://www.zakonyprolidi.cz/cs/1995-155";

export default definirCasos(duchodovaKalkulacka, [
  {
    nombre: "Výdělek 40 000 Kč a 40 let pojištění",
    origen: {
      tipo: "recalculado",
      url: ZDUCH,
      detalle: "§ 15 odst. 3: 21 546 × 99 % = 21 330,54 + 18 454 × 26 % = 4 798,04 → výpočtový základ 26 129. § 34: 26 129 × 1,495 % × 40 = 15 625,14 → 15 626. Důchod 4 900 + 15 626 = 20 526.",
    },
    fecha: "2026-10-24",
    entrada: { ovz: 40000, roky: 40, deti: 0 },
    esperado: { vypocetniZaklad: 26129, procentni: 15626, duchod: 20526 },
  },
  {
    nombre: "Nízký výdělek 15 000 Kč a 35 let",
    origen: { tipo: "recalculado", url: ZDUCH, detalle: "Výpočtový základ 14 850; procentní 14 850 × 1,495 % × 35 = 7 770,26 → 7 771; důchod 12 671." },
    fecha: "2026-10-24",
    entrada: { ovz: 15000, roky: 35, deti: 0 },
    esperado: { procentni: 7771, duchod: 12671 },
  },
  {
    nombre: "Minimální procentní výměra",
    origen: {
      tipo: "oficial",
      url: "https://www.cssz.gov.cz/-/prehled-nejdulezitejsich-udaju-pro-socialni-zabezpeceni-v-roce-2026",
      detalle: "ČSSZ: minimální starobní důchod 2026 je 9 800 Kč (základní 4 900 + procentní 4 900).",
    },
    fecha: "2026-10-24",
    entrada: { ovz: 8000, roky: 35, deti: 0 },
    esperado: { procentni: 4900, duchod: 9800 },
  },
  {
    nombre: "Vysoký výdělek nad druhou redukční hranicí",
    origen: { tipo: "recalculado", url: ZDUCH, detalle: "21 330,54 + 174 322 × 26 % = 66 654,26 → 66 655; × 1,495 % × 45 = 44 842,17 → 44 843; důchod 49 743." },
    fecha: "2026-10-24",
    entrada: { ovz: 250000, roky: 45, deti: 0 },
    esperado: { vypocetniZaklad: 66655, duchod: 49743 },
  },
  {
    nombre: "Dvě vychované děti",
    origen: { tipo: "recalculado", url: ZDUCH, detalle: "Výchovné 2 × 500 = 1 000 Kč k důchodu 20 526 Kč." },
    fecha: "2026-10-24",
    entrada: { ovz: 40000, roky: 40, deti: 2 },
    esperado: { vychovne: 1000, duchod: 21526 },
  },
  {
    nombre: "Bez výdělku",
    origen: { tipo: "recalculado", url: ZDUCH, detalle: "Bez výdělku nelze odhad spočítat." },
    fecha: "2026-10-24",
    entrada: { ovz: 0, roky: 40, deti: 0 },
    esperaError: true,
  },
]);
