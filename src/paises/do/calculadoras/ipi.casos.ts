import { definirCasos } from "@/motor/calculo";
import ipi from "./ipi";

export default definirCasos(ipi, [
  {
    nombre: "Inmuebles por RD$15,000,000",
    origen: { tipo: "recalculado", detalle: "Exento 2026: 10,695,494. Excedente 4,304,506 × 1 % = 43,045.06. Cuotas de 21,522.53." },
    fecha: "2026-10-12",
    entrada: { valor: 15000000, mayor65: false },
    esperado: { exento: 10695494, excedente: 4304506, anual: 43045.06, cuota: 21522.53 },
  },
  {
    nombre: "Debajo del monto exento",
    origen: { tipo: "recalculado", detalle: "8,000,000 es menos que 10,695,494: no paga." },
    fecha: "2026-10-12",
    entrada: { valor: 8000000, mayor65: false },
    esperado: { excedente: 0, anual: 0 },
  },
  {
    nombre: "Mayor de 65 años con única vivienda",
    origen: { tipo: "recalculado", detalle: "Exención de la vivienda única de personas de 65 años o más." },
    fecha: "2026-10-12",
    entrada: { valor: 15000000, mayor65: true },
    esperado: { anual: 0 },
  },
]);
