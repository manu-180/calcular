import { definirCasos } from "@/motor/calculo";
import calculadora from "./redundancy-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "FJ$25,000 redundancy on top of FJ$40,000 of wages",
    origen: {
      tipo: "recalculado",
      url: "https://frcs.org.fj/files/2026/08/Employer-Guide-2026.pdf",
      detalle: "Exempt 15,000. Taxable 10,000. Tax on 40,000 = 18% × 10,000 = 1,800. Tax on 50,000 = 3,600. Extra tax 1,800. Net 23,200.",
    },
    fecha: "2026-10-29",
    entrada: { pago: 25000, ingreso: 40000 },
    esperado: { exento: 15000, gravable: 10000, impuesto: 1800, neto: 23200 },
  },
  {
    nombre: "FJ$12,000 redundancy, fully exempt",
    origen: { tipo: "recalculado", detalle: "12,000 is below 15,000, so the whole payment is exempt and no tax is added." },
    fecha: "2026-10-29",
    entrada: { pago: 12000, ingreso: 60000 },
    esperado: { exento: 12000, gravable: 0, impuesto: 0, neto: 12000 },
  },
  {
    nombre: "FJ$40,000 redundancy with no other income",
    origen: { tipo: "recalculado", detalle: "Exempt 15,000. Taxable 25,000. Tax on 25,000 = 0 (below 30,000). Extra tax 0. Net 40,000." },
    fecha: "2026-10-29",
    entrada: { pago: 40000, ingreso: 0 },
    esperado: { exento: 15000, gravable: 25000, impuesto: 0, neto: 40000 },
  },
  { nombre: "Zero payment is rejected", origen: { tipo: "recalculado", detalle: "Payment must be above zero." }, fecha: "2026-10-29", entrada: { pago: 0, ingreso: 1000 }, esperaError: true },
]);
