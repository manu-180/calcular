import { definirCasos } from "@/motor/calculo";
import calculadora from "./bonus-tax";

export default definirCasos(calculadora, [
  {
    nombre: "ប្រាក់រង្វាន់ស្មើប្រាក់ខែមួយខែ",
    origen: { tipo: "recalculado", detalle: "5,000,000 x 10% - 175,000 = 325,000; 2,500,000 x 10% - 175,000 = 75,000; ខុសគ្នា 250,000" },
    fecha: "2026-10-01",
    entrada: { salario: 2500000, bono: 2500000, dependientes: 0 },
    esperado: { extra: 250000, neto: 2250000, con: 325000, sin: 75000 },
  },
  {
    nombre: "ប្រាក់រង្វាន់ក្នុងកម្រិត 0%",
    origen: { tipo: "recalculado", detalle: "1,000,000 + 500,000 = 1,500,000 ជាប់ 0%" },
    fecha: "2026-10-01",
    entrada: { salario: 1000000, bono: 500000, dependientes: 0 },
    esperado: { extra: 0, neto: 500000 },
  },
]);
