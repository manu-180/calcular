import { definirCasos } from "@/motor/calculo";
import calculadora from "./bareme-irpp";

const CODE = "https://jibaya.tn/wp-content/uploads/2026/03/Code_IRPP_IS_2026_fr.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "20 000 DT, taux effectif du code à la limite de la tranche",
    origen: { tipo: "oficial", url: CODE, detalle: "Le code indique un taux effectif de 16,25 % à 20 000 DT : 3 250 DT d'impôt. CSS 1 % = 200." },
    fecha: "2026-10-24",
    entrada: { base: 20000, salaire: true },
    esperado: { irpp: 3250, css: 200, total: 3450 },
  },
  {
    nombre: "4 000 DT de salaires : rien à payer",
    origen: { tipo: "recalculado", url: CODE, detalle: "Tranche à 0 % et exonération de CSS sous 5 000 DT." },
    fecha: "2026-10-24",
    entrada: { base: 4000, salaire: true },
    esperado: { irpp: 0, css: 0, total: 0 },
  },
  {
    nombre: "80 000 DT de revenus professionnels",
    origen: { tipo: "recalculado", url: CODE, detalle: "750 + 2 500 + 3 000 + 3 300 + 3 600 + 7 600 + 10 000 × 40 % = 24 750 ; CSS 800." },
    fecha: "2026-10-24",
    entrada: { base: 80000, salaire: false },
    esperado: { irpp: 24750, css: 800, total: 25550 },
  },
]);
