import { definirCasos } from "@/motor/calculo";
import calculadora from "./assurance-volontaire-cnss";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Revenu de 100 000 F par mois",
    origen: { tipo: "recalculado", detalle: "14 % × 100 000 = 14 000 par mois, 42 000 par trimestre, 168 000 par an." },
    fecha: F,
    entrada: { revenu: 100000 },
    esperado: { mensuelle: 14000, trimestrielle: 42000, annuelle: 168000 },
  },
  {
    nombre: "Revenu nul",
    origen: { tipo: "recalculado", detalle: "Saisie impossible." },
    fecha: F,
    entrada: { revenu: 0 },
    esperaError: true,
  },
]);
