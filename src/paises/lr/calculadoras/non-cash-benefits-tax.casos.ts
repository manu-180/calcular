import { definirCasos } from "@/motor/calculo";
import calculadora from "./non-cash-benefits-tax";

export default definirCasos(calculadora, [
  {
    nombre: "Housing worth L$240,000 on a L$480,000 salary",
    origen: {
      tipo: "recalculado",
      detalle: "Exempt 100,000, taxable 140,000. PIT on 480,000 = 48,500; on 620,000 = 6,500 + 15% × 420,000 = 69,500. Extra 21,000, a month 1,750.",
    },
    fecha: "2026-10-27",
    entrada: { salario: 480000, beneficios: 240000 },
    esperado: { exento: 100000, gravados: 140000, extra: 21000, mensual: 1750, total: 69500 },
  },
  {
    nombre: "Benefits under the exemption",
    origen: { tipo: "recalculado", detalle: "80,000 of benefits is below the 100,000 exemption: no extra tax." },
    fecha: "2026-10-27",
    entrada: { salario: 480000, beneficios: 80000 },
    esperado: { exento: 80000, gravados: 0, extra: 0 },
  },
  {
    nombre: "No benefits",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { salario: 480000, beneficios: 0 },
    esperaError: true,
  },
]);
