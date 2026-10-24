import { definirCasos } from "@/motor/calculo";
import calculadora from "./indemnite-licenciement-abusif";

export default definirCasos(calculadora, [
  {
    nombre: "Huit ans d'ancienneté, licenciement sans motif",
    origen: { tipo: "recalculado", detalle: "Article 23 bis : 8 × 1 et 8 × 2 mois de 1 500 dinars, soit 12 000 à 24 000." },
    fecha: "2026-10-24",
    entrada: { salaire: 1500, embauche: "2018-01-01", rupture: "2026-10-24", cas: "sans-motif" },
    esperado: { minimum: 12000, maximum: 24000, plafond: 54000 },
  },
  {
    nombre: "Vingt-cinq ans d'ancienneté : plafond de trois ans de salaire",
    origen: { tipo: "recalculado", detalle: "25 × 2 = 50 mois ramenés à 36 ; 25 mois au minimum." },
    fecha: "2026-10-24",
    entrada: { salaire: 2000, embauche: "2001-09-01", rupture: "2026-09-30", cas: "sans-motif" },
    esperado: { minimum: 50000, maximum: 72000, plafond: 72000 },
  },
  {
    nombre: "Motif réel mais procédure non respectée",
    origen: { tipo: "recalculado", detalle: "Un à quatre mois de salaire, quelle que soit l'ancienneté." },
    fecha: "2026-10-24",
    entrada: { salaire: 1800, embauche: "2022-05-01", rupture: "2026-10-01", cas: "procedure" },
    esperado: { minimum: 1800, maximum: 7200 },
  },
]);
