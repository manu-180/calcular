import { definirCasos } from "@/motor/calculo";
import resico from "./resico";

export default definirCasos(resico, [
  {
    nombre: "Ingresos de 20,000 en el mes",
    origen: { tipo: "recalculado", detalle: "LISR art. 113-E: hasta 25,000 la tasa es 1.00 %. 20000 × 1 % = 200." },
    fecha: "2026-10-15",
    entrada: { ingresos: 20000, retenido: 0 },
    esperado: { tasa: 1, isr: 200, pagar: 200 },
  },
  {
    nombre: "Justo en el límite del primer renglón",
    origen: { tipo: "recalculado", detalle: "25000 todavía paga 1.00 % (250); 25000.01 ya paga 1.10 % sobre todo (275.00)." },
    fecha: "2026-10-15",
    entrada: { ingresos: 25000, retenido: 0 },
    esperado: { tasa: 1, isr: 250 },
  },
  {
    nombre: "Un centavo más",
    origen: { tipo: "recalculado", detalle: "25000.01 × 1.10 % = 275.00." },
    fecha: "2026-10-15",
    entrada: { ingresos: 25000.01, retenido: 0 },
    esperado: { tasa: 1.1, isr: 275 },
  },
  {
    nombre: "Con retención de personas morales",
    origen: { tipo: "recalculado", detalle: "100000 × 2 % = 2000; menos 1.25 % retenido (1250, LISR art. 113-J) = 750." },
    fecha: "2026-10-15",
    entrada: { ingresos: 100000, retenido: 1250 },
    esperado: { tasa: 2, isr: 2000, pagar: 750 },
  },
  {
    nombre: "Ingresos por encima del tope del régimen",
    origen: { tipo: "recalculado", detalle: "Más de 3,500,000 no puede tributar en el RESICO." },
    fecha: "2026-10-15",
    entrada: { ingresos: 4000000, retenido: 0 },
    esperaError: true,
  },
]);
