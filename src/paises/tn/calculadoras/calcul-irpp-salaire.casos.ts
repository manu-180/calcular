import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-irpp-salaire";

const CODE = "https://jibaya.tn/wp-content/uploads/2026/03/Code_IRPP_IS_2026_fr.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "2 000 DT brut, chef de famille, 2 enfants",
    origen: { tipo: "recalculado", url: CODE, detalle: "Base 19 296,8 ; IRPP 3 074,2 par an ; CSS 192,968." },
    fecha: "2026-10-24",
    entrada: { brut: 2000, chef: true, enfants: 2, etudiants: 0, infirmes: 0 },
    esperado: { irppAnnuel: 3074.2, cssAnnuel: 192.968, irppMensuel: 256.183, cssMensuel: 16.081, base: 19296.8, frais: 2000, deductions: 500 },
  },
  {
    nombre: "5 000 DT brut, chef de famille, un enfant et un étudiant",
    origen: {
      tipo: "recalculado",
      url: CODE,
      detalle: "Annuel 60 000 ; CNSS 5 508 ; frais 2 000 ; déductions 300 + 100 + 1 000 ; base 51 092. IRPP 750 + 2 500 + 3 000 + 3 300 + 3 600 + 1 092 × 38 % = 13 564,96 ; CSS 510,92.",
    },
    fecha: "2026-10-24",
    entrada: { brut: 5000, chef: true, enfants: 1, etudiants: 1, infirmes: 0 },
    esperado: { base: 51092, irppAnnuel: 13564.96, cssAnnuel: 510.92, irppMensuel: 1130.413, cssMensuel: 42.577 },
  },
  {
    nombre: "Salaire nul",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-24",
    entrada: { brut: 0, chef: false, enfants: 0, etudiants: 0, infirmes: 0 },
    esperaError: true,
  },
]);
