import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-ir-salaire";

export default definirCasos(calculadora, [
  {
    nombre: "10 000 DH bruts par mois, sans charge de famille",
    origen: {
      tipo: "recalculado",
      detalle: "Brut annuel 120 000 > 78 000 : frais 25 % = 30 000. Net imposable 90 000. Barème : 20 000 × 10 % + 20 000 × 20 % + 10 000 × 30 % = 9 000 par an, 750 par mois.",
    },
    fecha: "2026-10-16",
    entrada: { brut: 10000, cotisations: 0, personnes: 0 },
    esperado: { fraisProfessionnels: 30000, netImposable: 90000, impotAnnuel: 9000, impotMensuel: 750, tauxMoyen: 7.5 },
  },
  {
    nombre: "15 000 DH bruts, 2 personnes à charge (2026)",
    origen: {
      tipo: "recalculado",
      detalle: "Brut annuel 180 000 : frais 25 % = 45 000 plafonnés à 35 000. Net 145 000. Barème 2 000 + 4 000 + 6 000 + 45 000 × 34 % = 27 300. Charges de famille 2 × 600 = 1 200. Impôt 26 100, soit 2 175 par mois.",
    },
    fecha: "2026-10-16",
    entrada: { brut: 15000, cotisations: 0, personnes: 2 },
    esperado: { fraisProfessionnels: 35000, impotBrut: 27300, chargesDeFamille: 1200, impotAnnuel: 26100, impotMensuel: 2175 },
  },
  {
    nombre: "Même salaire en 2025 : 500 DH par personne",
    origen: { tipo: "recalculado", detalle: "Charges de famille 2025 : 2 × 500 = 1 000. Impôt 26 300, soit 2 191,67 par mois." },
    fecha: "2025-06-01",
    entrada: { brut: 15000, cotisations: 0, personnes: 2 },
    esperado: { chargesDeFamille: 1000, impotAnnuel: 26300, impotMensuel: 2191.67 },
  },
  {
    nombre: "6 000 DH bruts avec cotisations : impôt absorbé par les charges de famille",
    origen: {
      tipo: "recalculado",
      detalle: "Brut annuel 72 000 ≤ 78 000 : frais 35 % = 25 200. Cotisations 400 × 12 = 4 800. Net 42 000. Barème 2 000 × 10 % = 200. Charges 3 × 600 = 1 800, limitées à l'impôt : 200. Impôt 0.",
    },
    fecha: "2026-10-16",
    entrada: { brut: 6000, cotisations: 400, personnes: 3 },
    esperado: { fraisProfessionnels: 25200, netImposable: 42000, impotBrut: 200, chargesDeFamille: 200, impotAnnuel: 0 },
  },
  {
    nombre: "Salaire nul",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-16",
    entrada: { brut: 0, cotisations: 0, personnes: 0 },
    esperaError: true,
  },
]);
