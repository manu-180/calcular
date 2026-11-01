import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period";

const base = { contrato: "indefinido", salario: 2600000, diasMes: 26 } as const;

export default definirCasos(calculadora, [
  { nombre: "3 ខែ", origen: { tipo: "recalculado", detalle: "មាត្រា 75: ក្រោម 6 ខែ = 7 ថ្ងៃ; 7 x 100,000" }, fecha: "2026-10-01", entrada: { ...base, meses: 3 }, esperado: { dias: 7, pago: 700000 } },
  { nombre: "24 ខែ", origen: { tipo: "recalculado", detalle: "មាត្រា 75: 6 ខែ ដល់ 2 ឆ្នាំ = 15 ថ្ងៃ" }, fecha: "2026-10-01", entrada: { ...base, meses: 24 }, esperado: { dias: 15, pago: 1500000 } },
  { nombre: "36 ខែ", origen: { tipo: "recalculado", detalle: "មាត្រា 75: លើស 2 ឆ្នាំដល់ 5 ឆ្នាំ = 1 ខែ" }, fecha: "2026-10-01", entrada: { ...base, meses: 36 }, esperado: { meses: 1, pago: 2600000 } },
  { nombre: "72 ខែ", origen: { tipo: "recalculado", detalle: "មាត្រា 75: លើស 5 ឆ្នាំដល់ 10 ឆ្នាំ = 2 ខែ" }, fecha: "2026-10-01", entrada: { ...base, meses: 72 }, esperado: { meses: 2, pago: 5200000 } },
  { nombre: "130 ខែ", origen: { tipo: "recalculado", detalle: "មាត្រា 75: លើស 10 ឆ្នាំ = 3 ខែ" }, fecha: "2026-10-01", entrada: { ...base, meses: 130 }, esperado: { meses: 3, pago: 7800000 } },
  { nombre: "កិច្ចសញ្ញាកំណត់ 9 ខែ", origen: { tipo: "recalculado", detalle: "មាត្រា 73: លើស 6 ខែ = 10 ថ្ងៃ" }, fecha: "2026-10-01", entrada: { ...base, contrato: "fijo", meses: 9 }, esperado: { dias: 10 } },
  { nombre: "កិច្ចសញ្ញាកំណត់ 18 ខែ", origen: { tipo: "recalculado", detalle: "មាត្រា 73: លើស 1 ឆ្នាំ = 15 ថ្ងៃ" }, fecha: "2026-10-01", entrada: { ...base, contrato: "fijo", meses: 18 }, esperado: { dias: 15 } },
]);
