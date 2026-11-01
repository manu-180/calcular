import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave";

export default definirCasos(calculadora, [
  {
    nombre: "អតីតភាព 3 ឆ្នាំ ពេញមួយឆ្នាំ",
    origen: { tipo: "recalculado", detalle: "មាត្រា 166: 12 x 1.5 + 1 = 19 ថ្ងៃ; 19 x 100,000 = 1,900,000" },
    fecha: "2026-10-01",
    entrada: { salario: 2600000, anios: 3, meses: 12, diasMes: 26 },
    esperado: { dias: 19, anual: 19, extra: 1, pago: 1900000 },
  },
  {
    nombre: "ឆ្នាំដំបូង 6 ខែ",
    origen: { tipo: "recalculado", detalle: "6 x 1.5 = 9 ថ្ងៃ" },
    fecha: "2026-10-01",
    entrada: { salario: 2600000, anios: 0, meses: 6, diasMes: 26 },
    esperado: { dias: 9, anual: 18, pago: 900000 },
  },
]);
