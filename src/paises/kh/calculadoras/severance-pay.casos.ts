import { definirCasos } from "@/motor/calculo";
import calculadora from "./severance-pay";

export default definirCasos(calculadora, [
  {
    nombre: "មិនកំណត់ថិរវេលា 4 ខែ",
    origen: { tipo: "recalculado", detalle: "មាត្រា 89 ថ្មី: 1 ខែដល់ក្រោម 6 ខែ = 7 ថ្ងៃ; 7 x 100,000" },
    fecha: "2026-10-01",
    entrada: { contrato: "indefinido", salario: 2600000, diasMes: 26, meses: 4, total: null },
    esperado: { pago: 700000 },
  },
  {
    nombre: "មិនកំណត់ថិរវេលា 5 ឆ្នាំ",
    origen: { tipo: "recalculado", detalle: "មាត្រា 91 ថ្មី: 15 ថ្ងៃ x 5 ឆ្នាំ x 100,000 = 7,500,000" },
    fecha: "2026-10-01",
    entrada: { contrato: "indefinido", salario: 2600000, diasMes: 26, meses: 60, total: null },
    esperado: { pago: 0, dano: 7500000 },
  },
  {
    nombre: "កំណត់ថិរវេលា 5%",
    origen: { tipo: "recalculado", detalle: "ប្រកាស 443 ប្រការ 1: 24,000,000 x 5% = 1,200,000" },
    fecha: "2026-10-01",
    entrada: { contrato: "fijo", salario: null, diasMes: null, meses: null, total: 24000000 },
    esperado: { pago: 1200000 },
  },
]);
