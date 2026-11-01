import { definirCasos } from "@/motor/calculo";
import calc from "./drattarvextir";

export default definirCasos(calc, [
  {
    nombre: "30 dagar af milljón",
    origen: { tipo: "recalculado", detalle: "1.000.000 x 15,75% x 30 / 365 = 12.945." },
    fecha: "2026-11-15",
    entrada: { krafa: 1000000, dagar: 30 },
    esperado: { vextir: 12945, samtals: 1012945 },
  },
]);
