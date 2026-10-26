import { definirCasos } from "@/motor/calculo";
import calculadora from "./impot-sur-pension";

const CODE = "https://jibaya.tn/wp-content/uploads/2026/03/Code_IRPP_IS_2026_fr.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Pension de 1 200 DT, chef de famille",
    origen: { tipo: "recalculado", url: CODE, detalle: "14 400 − 25 % = 10 800 ; − 300 = 10 500. IRPP 750 + 500 × 25 % = 875 ; CSS 105 ; par mois 81,667." },
    fecha: "2026-10-24",
    entrada: { pension: 1200, chef: true, enfants: 0, etudiants: 0, infirmes: 0 },
    esperado: { abattement: 3600, base: 10500, irpp: 875, css: 105, mensuel: 81.667 },
  },
  {
    nombre: "Petite pension exonérée de CSS",
    origen: { tipo: "recalculado", url: CODE, detalle: "500 × 12 = 6 000 − 25 % = 4 500 ; tranche à 0 %, sous le seuil de CSS." },
    fecha: "2026-10-24",
    entrada: { pension: 500, chef: false, enfants: 0, etudiants: 0, infirmes: 0 },
    esperado: { base: 4500, irpp: 0, css: 0, mensuel: 0 },
  },
  {
    nombre: "Pension nulle",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-24",
    entrada: { pension: 0, chef: false, enfants: 0, etudiants: 0, infirmes: 0 },
    esperaError: true,
  },
]);
