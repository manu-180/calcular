import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-tva";

const LF2017 = "https://www.joradp.dz/FTP/jo-francais/2016/F2016077.pdf" as const;
const LF2026 = "https://www.joradp.dz/FTP/jo-francais/2025/F2025088.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Ajouter 19 % à 10 000 DA",
    origen: { tipo: "recalculado", url: LF2017, detalle: "10 000 × 19 % = 1 900 ; TTC 11 900." },
    fecha: "2026-10-27",
    entrada: { montant: 10000, sens: "ajouter", taux: "normal" },
    esperado: { tva: 1900, ht: 10000, ttc: 11900, taux: 19 },
  },
  {
    nombre: "Retirer 19 % de 11 900 DA",
    origen: { tipo: "recalculado", url: LF2017, detalle: "11 900 ÷ 1,19 = 10 000 HT ; TVA 1 900." },
    fecha: "2026-10-27",
    entrada: { montant: 11900, sens: "retirer", taux: "normal" },
    esperado: { tva: 1900, ht: 10000 },
  },
  {
    nombre: "Taux réduit sur 5 000 DA TTC",
    origen: { tipo: "recalculado", url: LF2026, detalle: "5 000 ÷ 1,09 = 4 587,16 HT ; TVA 412,84." },
    fecha: "2026-10-27",
    entrada: { montant: 5000, sens: "retirer", taux: "reduit" },
    esperado: { ht: 4587.16, tva: 412.84, taux: 9 },
  },
  {
    nombre: "Montant nul",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-27",
    entrada: { montant: 0, sens: "ajouter", taux: "normal" },
    esperaError: true,
  },
]);
