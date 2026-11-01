import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-its";

export default definirCasos(calculadora, [
  {
    nombre: "250 000 F par mois, célibataire sans enfant",
    origen: {
      tipo: "recalculado",
      detalle:
        "Base 3 000 000. Barème : 248 400 × 5 % + 598 000 × 12 % + 613 333 × 18 % + 594 462 × 26 % + 615 805 × 31 % = 540 040. Moins 2 % de 3 000 000 (60 000) = 480 040, soit 40 003 par mois.",
    },
    fecha: "2026-10-27",
    entrada: { brut: 250000, retraite: 0, situation: "celibataire", enfants: 0, infirmes: 0 },
    esperado: { itsMensuel: 40003, impotBareme: 540040, reductionPoints: 60000, itsAnnuel: 480040 },
  },
  {
    nombre: "250 000 F, retenue retraite 9 000 F, marié avec deux enfants",
    origen: {
      tipo: "recalculado",
      detalle: "Base (250 000 − 9 000) × 12 = 2 892 000. Barème 506 560. Réduction 10 % + 2 × 2,5 % = 15 % : 75 984. Moins 2 % de la base (57 840) = 372 736, soit 31 061 par mois.",
    },
    fecha: "2026-10-27",
    entrada: { brut: 250000, retraite: 9000, situation: "marie", enfants: 2, infirmes: 0 },
    esperado: { itsMensuel: 31061, tauxReduction: 15, reductionFamille: 75984, itsAnnuel: 372736 },
  },
  {
    nombre: "Salaire au SMIG : pas d'impôt",
    origen: { tipo: "recalculado", detalle: "Base 480 000. Barème 150 000 × 5 % = 7 500, entièrement absorbé par les 2 % de la base (9 600)." },
    fecha: "2026-10-27",
    entrada: { brut: 40000, retraite: 0, situation: "celibataire", enfants: 0, infirmes: 0 },
    esperado: { itsMensuel: 0, impotBareme: 7500, reductionPoints: 7500 },
  },
  {
    nombre: "Retenue retraite au-delà de 4 % du brut",
    origen: { tipo: "recalculado", detalle: "Seuls 6 000 (4 % de 150 000) se déduisent. Base 1 728 000, barème 183 468, réduction 2,5 % : 4 587, moins 34 560 = 144 321, soit 12 027 par mois." },
    fecha: "2026-10-27",
    entrada: { brut: 150000, retraite: 10000, situation: "celibataire", enfants: 1, infirmes: 0 },
    esperado: { imposableMensuel: 144000, itsMensuel: 12027 },
  },
  {
    nombre: "Cadre marié, trois enfants dont un majeur infirme",
    origen: { tipo: "recalculado", detalle: "Base 964 000 × 12 = 11 568 000. Barème 3 680 552. Réduction 10 + 2 × 2,5 + 10 = 25 % : 920 138. Moins 231 360 = 2 529 054, soit 210 755 par mois." },
    fecha: "2026-10-27",
    entrada: { brut: 1000000, retraite: 36000, situation: "marie", enfants: 3, infirmes: 1 },
    esperado: { itsMensuel: 210755, tauxReduction: 25 },
  },
  {
    nombre: "Plus d'enfants infirmes que d'enfants à charge",
    origen: { tipo: "recalculado", detalle: "Entrée incohérente." },
    fecha: "2026-10-27",
    entrada: { brut: 200000, retraite: 0, situation: "marie", enfants: 1, infirmes: 2 },
    esperaError: true,
  },
]);
