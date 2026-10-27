import { definirCasos } from "@/motor/calculo";
import calculadora from "./impot-sur-les-societes";

const LFC2015 = "https://www.joradp.dz/FTP/jo-francais/2015/F2015040.pdf" as const;
const LF2022 = "https://www.joradp.dz/FTP/jo-francais/2021/F2021100.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Services, 10 millions de bénéfice",
    origen: { tipo: "recalculado", url: LFC2015, detalle: "Autres activités 26 % : 10 000 000 × 26 % = 2 600 000." },
    fecha: "2026-10-27",
    entrada: { benefice: 10000000, activite: "autres", reinvesti: null },
    esperado: { ibs: 2600000, taux: 26, apresImpot: 7400000 },
  },
  {
    nombre: "Production, 4 millions dont 1 million réinvesti",
    origen: { tipo: "recalculado", url: LF2022, detalle: "3 000 000 × 19 % = 570 000 ; 1 000 000 × 10 % = 100 000 ; total 670 000, taux effectif 16,75 %." },
    fecha: "2026-10-27",
    entrada: { benefice: 4000000, activite: "production", reinvesti: 1000000 },
    esperado: { ibsNormal: 570000, ibsReduit: 100000, ibs: 670000, tauxEffectif: 16.75 },
  },
  {
    nombre: "BTPH, 2 millions",
    origen: { tipo: "recalculado", url: LFC2015, detalle: "23 % × 2 000 000 = 460 000." },
    fecha: "2026-10-27",
    entrada: { benefice: 2000000, activite: "btph-tourisme", reinvesti: null },
    esperado: { ibs: 460000 },
  },
  {
    nombre: "Réinvestissement supérieur au bénéfice",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-27",
    entrada: { benefice: 1000000, activite: "autres", reinvesti: 2000000 },
    esperaError: true,
  },
]);
