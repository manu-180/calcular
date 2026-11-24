import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-pay";

export default definirCasos(calculadora, [
  {
    nombre: "ថ្ងៃ 2 ម៉ោង យប់ 1 ម៉ោង",
    origen: { tipo: "recalculado", detalle: "2,080,000 x 12 / 52 / 48 = 10,000; 2 x 15,000 + 20,000 = 50,000" },
    fecha: "2026-10-01",
    entrada: { salario: 2080000, horasSemana: 48, horasDia: 2, horasNoche: 1, diasDescanso: 0, diasFeriado: 0 },
    esperado: { total: 50000, hora: 10000, dia: 30000, noche: 20000 },
  },
  {
    nombre: "ថ្ងៃឈប់សម្រាក និងថ្ងៃឈប់បុណ្យ",
    origen: { tipo: "recalculado", detalle: "មួយថ្ងៃ 80,000; ឈប់សម្រាក 80,000 x 2 = 160,000; ឈប់បុណ្យបំណាច់ 80,000" },
    fecha: "2026-10-01",
    entrada: { salario: 2080000, horasSemana: 48, horasDia: 0, horasNoche: 0, diasDescanso: 1, diasFeriado: 1 },
    esperado: { total: 240000, descanso: 160000, feriado: 80000 },
  },
]);
