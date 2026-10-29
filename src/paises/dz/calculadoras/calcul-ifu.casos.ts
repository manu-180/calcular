import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-ifu";

const LF2024 = "https://www.joradp.dz/FTP/jo-francais/2023/F2023086.pdf" as const;
const LF2025 = "https://www.joradp.dz/FTP/jo-francais/2024/F2024084.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Commerce de biens, 3 millions de DA",
    origen: { tipo: "recalculado", url: LF2024, detalle: "Production et vente de biens 5 % : 3 000 000 × 5 % = 150 000." },
    fecha: "2026-10-27",
    entrada: { ca: 3000000, activite: "biens" },
    esperado: { ifu: 150000, taux: 5, mensuel: 12500 },
  },
  {
    nombre: "Services, 2 millions de DA",
    origen: { tipo: "recalculado", url: LF2024, detalle: "Autres activités 12 % : 2 000 000 × 12 % = 240 000." },
    fecha: "2026-10-27",
    entrada: { ca: 2000000, activite: "autres" },
    esperado: { ifu: 240000 },
  },
  {
    nombre: "Auto-entrepreneur, 1,5 million de DA",
    origen: { tipo: "recalculado", url: LF2025, detalle: "0,5 % × 1 500 000 = 7 500, inférieur au minimum de 10 000 (article 365 bis) : 10 000." },
    fecha: "2026-10-27",
    entrada: { ca: 1500000, activite: "auto-entrepreneur" },
    esperado: { calcule: 7500, minimum: 10000, ifu: 10000 },
  },
  {
    nombre: "Petit commerce, 400 000 DA",
    origen: { tipo: "recalculado", url: LF2025, detalle: "5 % × 400 000 = 20 000, sous le minimum de 30 000 : 30 000." },
    fecha: "2026-10-27",
    entrada: { ca: 400000, activite: "biens" },
    esperado: { ifu: 30000 },
  },
]);
