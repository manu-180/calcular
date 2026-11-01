import { definirCasos } from "@/motor/calculo";
import calculadora from "./seniority-pay";

export default definirCasos(calculadora, [
  {
    nombre: "ប្រាក់ខែ 2,600,000 រៀល",
    origen: { tipo: "recalculado", detalle: "ប្រកាស 443 ប្រការ 2: 7.5 x 100,000 = 750,000; 15 x 100,000 = 1,500,000" },
    fecha: "2026-10-01",
    entrada: { salario: 2600000, diasMes: 26 },
    esperado: { semestre: 750000, anual: 1500000, diario: 100000 },
  },
]);
