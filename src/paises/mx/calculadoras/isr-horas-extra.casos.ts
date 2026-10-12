import { definirCasos } from "@/motor/calculo";
import isrHorasExtra from "./isr-horas-extra";

export default definirCasos(isrHorasExtra, [
  {
    nombre: "1,000 de horas dobles con 15,000 al mes",
    origen: { tipo: "recalculado", detalle: "LISR art. 93 fr. I: 50 % exento hasta 5 UMA por semana (5 × 117.31 = 586.55). 50 % de 1000 = 500 exento; 500 gravado." },
    fecha: "2026-10-15",
    entrada: { pago: 1000, triples: null, sueldo: 15000, periodo: "mensual", region: "general" },
    esperado: { tope: 586.55, exento: 500, gravado: 500 },
  },
  {
    nombre: "Pasa el tope de 5 UMA y hay horas triples",
    origen: { tipo: "recalculado", detalle: "50 % de 2000 = 1000 > 586.55: exento 586.55. Gravado 1413.45 + 300 triples = 1713.45." },
    fecha: "2026-10-15",
    entrada: { pago: 2000, triples: 300, sueldo: 15000, periodo: "mensual", region: "general" },
    esperado: { exento: 586.55, gravado: 1713.45 },
  },
  {
    nombre: "Trabajador de salario mínimo",
    origen: { tipo: "recalculado", detalle: "Gana 315.04 diarios: todo lo que está dentro del límite legal es exento." },
    fecha: "2026-10-15",
    entrada: { pago: 700, triples: null, sueldo: 315.04, periodo: "diario", region: "general" },
    esperado: { exento: 700, gravado: 0 },
  },
]);
