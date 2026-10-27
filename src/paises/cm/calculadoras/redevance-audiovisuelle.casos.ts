import { definirCasos } from "@/motor/calculo";
import calculadora from "./redevance-audiovisuelle";

const F = "2026-10-26";

export default definirCasos(calculadora, [
  {
    nombre: "250 000 F : tranche de 200 001 à 300 000 F",
    origen: { tipo: "recalculado", detalle: "Article 3 (5) de la loi sur la redevance audiovisuelle : 3 250 F par mois, 39 000 F sur l'année." },
    fecha: F,
    entrada: { brut: 250000, exonere: false },
    esperado: { mois: 3250, annee: 39000 },
  },
  {
    nombre: "Bornes : 50 000 F et 50 001 F",
    origen: { tipo: "recalculado", detalle: "Jusqu'à 50 000 F : rien ; dès 50 001 F : 750 F." },
    fecha: F,
    entrada: { brut: 50000, exonere: false },
    esperado: { mois: 0 },
  },
  {
    nombre: "50 001 F",
    origen: { tipo: "recalculado", detalle: "Tranche de 50 001 à 100 000 F : 750 F." },
    fecha: F,
    entrada: { brut: 50001, exonere: false },
    esperado: { mois: 750 },
  },
  {
    nombre: "Plus de 1 000 000 F",
    origen: { tipo: "recalculado", detalle: "Au-dessus de 1 000 000 F : 13 000 F." },
    fecha: F,
    entrada: { brut: 2500000, exonere: false },
    esperado: { mois: 13000 },
  },
  {
    nombre: "Personnel domestique exonéré",
    origen: { tipo: "recalculado", detalle: "Article 6 : salaires du personnel domestique exonérés." },
    fecha: F,
    entrada: { brut: 120000, exonere: true },
    esperado: { mois: 0, annee: 0 },
  },
]);
