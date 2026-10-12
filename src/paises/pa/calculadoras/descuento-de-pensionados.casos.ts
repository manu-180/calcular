import { definirCasos } from "@/motor/calculo";
import descuentoDePensionados from "./descuento-de-pensionados";

export default definirCasos(descuentoDePensionados, [
  {
    nombre: "Pensión de B/. 800",
    origen: { tipo: "recalculado", detalle: "Ley 462, art. 101, num. 6: 6.75% de 800 = 54. Neta 746." },
    fecha: "2026-10-12",
    entrada: { pension: 800 },
    esperado: { css: 54, neta: 746 },
  },
  {
    nombre: "Pensión de B/. 265",
    origen: { tipo: "recalculado", detalle: "265 × 6.75% = 17.89. Neta 247.11." },
    fecha: "2026-10-12",
    entrada: { pension: 265 },
    esperado: { css: 17.89, neta: 247.11 },
  },
]);
