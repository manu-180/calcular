import { definirCasos } from "@/motor/calculo";
import calculadora from "./allocations-familiales";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Trois enfants pendant un an",
    origen: { tipo: "recalculado", detalle: "3 × 2 000 = 6 000 F par mois ; 72 000 F sur 12 mois." },
    fecha: F,
    entrada: { enfants: 3, mois: 12, grossesse: false },
    esperado: { mensuel: 6000, total: 72000 },
  },
  {
    nombre: "Six enfants et une grossesse",
    origen: { tipo: "recalculado", detalle: "Quatre enfants au plus : 8 000 F par mois, 96 000 F sur 12 mois, plus 18 000 F d'allocations prénatales." },
    fecha: F,
    entrada: { enfants: 6, mois: 12, grossesse: true },
    esperado: { retenus: 4, familiales: 96000, prenatales: 18000, total: 114000 },
  },
]);
