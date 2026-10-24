import { definirCasos } from "@/motor/calculo";
import calculadora from "./retenue-revenus-capitaux-mobiliers";

export default definirCasos(calculadora, [
  {
    nombre: "Dividende de 1 million",
    origen: { tipo: "recalculado", detalle: "1 000 000 × 10 % = 100 000." },
    fecha: "2026-10-18",
    entrada: { type: "actions", montant: 1000000 },
    esperado: { net: 900000, retenue: 100000 },
  },
]);
