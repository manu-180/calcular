import { definirCasos } from "@/motor/calculo";
import calculadora from "./income-tax-calculator";

const IR340 = "https://www.ird.govt.nz/-/media/project/ir/home/documents/forms-and-guides/ir300---ir399/ir340/ir340-apr-2026.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "$50,000 with the ACC levy",
    origen: { tipo: "recalculado", detalle: "15,600 × 10.5% = 1,638 + 34,400 × 17.5% = 6,020, tax 7,658. ACC 50,000 × 1.75% = 875. Total 8,533. Average 7,658 / 50,000 = 15.316%." },
    fecha: "2026-10-14",
    entrada: { ingreso: 50000, conAcc: true },
    esperado: { impuesto: 7658, acc: 875, total: 8533, neto: 41467, promedio: 15.316, marginal: 17.5 },
    tolerancia: 0.001,
  },
  {
    nombre: "$78,000 matches the IR340 weekly table",
    origen: { tipo: "oficial", url: IR340, detalle: "IR340 April 2026, weekly $1,500 code M: $326.64 a week. × 52 = 16,985.28; the exact yearly figure is 15,620.50 tax + 1,365 ACC = 16,985.50 (the table rounds each week down)." },
    fecha: "2026-10-14",
    entrada: { ingreso: 78000, conAcc: true },
    esperado: { impuesto: 15620.5, acc: 1365, total: 16985.5, marginal: 30 },
  },
  {
    nombre: "$180,000 without the levy",
    origen: { tipo: "recalculado", detalle: "1,638 + 6,632.50 + 7,380 + 101,900 × 33% = 33,627. Tax 49,277.50." },
    fecha: "2026-10-14",
    entrada: { ingreso: 180000, conAcc: false },
    esperado: { impuesto: 49277.5, acc: 0, total: 49277.5, marginal: 33 },
  },
  {
    nombre: "$15,600 stays in the first band",
    origen: { tipo: "recalculado", detalle: "15,600 × 10.5% = 1,638." },
    fecha: "2026-10-14",
    entrada: { ingreso: 15600, conAcc: false },
    esperado: { impuesto: 1638, marginal: 10.5 },
  },
  {
    nombre: "Negative income",
    origen: { tipo: "recalculado", detalle: "A negative income is not valid." },
    fecha: "2026-10-14",
    entrada: { ingreso: -1, conAcc: true },
    esperaError: true,
  },
]);
