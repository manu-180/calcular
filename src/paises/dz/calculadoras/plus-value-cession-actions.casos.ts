import { definirCasos } from "@/motor/calculo";
import calculadora from "./plus-value-cession-actions";

const LF2025 = "https://www.joradp.dz/FTP/jo-francais/2024/F2024084.pdf" as const;
const LF2022 = "https://www.joradp.dz/FTP/jo-francais/2021/F2021100.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Parts achetées 2 millions, cédées 5 millions",
    origen: { tipo: "recalculado", url: LF2025, detalle: "Plus-value 3 000 000 × 15 % = 450 000 ; produit net 4 550 000." },
    fecha: "2026-10-27",
    entrada: { cession: 5000000, frais: 0, acquisition: 2000000, situation: "normal" },
    esperado: { plusValue: 3000000, taux: 15, impot: 450000, net: 4550000 },
  },
  {
    nombre: "Engagement de réinvestir, avec frais",
    origen: { tipo: "recalculado", url: LF2025, detalle: "Plus-value 5 000 000 − 100 000 − 2 000 000 = 2 900 000 × 5 % = 145 000." },
    fecha: "2026-10-27",
    entrada: { cession: 5000000, frais: 100000, acquisition: 2000000, situation: "reinvesti" },
    esperado: { plusValue: 2900000, taux: 5, impot: 145000 },
  },
  {
    nombre: "Cédant domicilié à l'étranger",
    origen: { tipo: "recalculado", url: LF2022, detalle: "Retenue de 20 % × 3 000 000 = 600 000." },
    fecha: "2026-10-27",
    entrada: { cession: 5000000, frais: 0, acquisition: 2000000, situation: "non-resident" },
    esperado: { taux: 20, impot: 600000 },
  },
  {
    nombre: "Moins-value",
    origen: { tipo: "recalculado", url: LF2022, detalle: "Pas de différence positive : pas d'impôt." },
    fecha: "2026-10-27",
    entrada: { cession: 1000000, frais: 0, acquisition: 2000000, situation: "normal" },
    esperado: { plusValue: 0, impot: 0 },
  },
]);
