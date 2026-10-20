import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost";

export default definirCasos(calculadora, [
  {
    nombre: "GH₵5,000 basic and GH₵1,000 allowances",
    origen: { tipo: "recalculado", detalle: "Employer SSNIT 13% of 5,000 = 650. Cost 6,650 a month." },
    fecha: "2026-10-18",
    entrada: { basico: 5000, subsidios: 1000, empleados: 1 },
    esperado: { ssnit: 650, mensual: 6650, anual: 79800 },
  },
  {
    nombre: "Ten workers",
    origen: { tipo: "recalculado", detalle: "2,000 + 13% = 2,260 each, 22,600 for ten." },
    fecha: "2026-10-18",
    entrada: { basico: 2000, subsidios: 0, empleados: 10 },
    esperado: { total: 22600 },
  },
  {
    nombre: "Zero",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-18",
    entrada: { basico: 0, subsidios: 0, empleados: 1 },
    esperaError: true,
  },
]);
