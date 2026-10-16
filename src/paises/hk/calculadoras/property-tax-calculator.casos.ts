import { definirCasos } from "@/motor/calculo";
import calculadora from "./property-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "GovHK example 1: $10,000 a month, tenant pays rates",
    origen: {
      tipo: "oficial",
      url: "https://www.gov.hk/en/residents/taxes/property/propertycompute.htm",
      detalle: "Assessable value 120,000 less 20% = NAV 96,000. Tax 14,400 and provisional tax 14,400, total 28,800.",
    },
    fecha: "2026-10-16",
    entrada: { renta: 120000, meses: 12, incobrable: 0, rates: 0 },
    esperado: { valorNeto: 96000, impuesto: 14400, provisional: 14400, total: 28800 },
  },
  {
    nombre: "GovHK example 2: let from 1 July at $30,000, owner pays $12,000 rates",
    origen: {
      tipo: "oficial",
      url: "https://www.gov.hk/en/residents/taxes/property/propertycompute.htm",
      detalle: "270,000 less rates 12,000 = 258,000, less 20% (51,600) = NAV 206,400. Tax 30,960. Provisional: 206,400 x 12/9 = 275,200 x 15% = 41,280.",
    },
    fecha: "2026-10-16",
    entrada: { renta: 270000, meses: 9, incobrable: 0, rates: 12000 },
    esperado: { asignacion: 51600, valorNeto: 206400, impuesto: 30960, provisional: 41280 },
  },
  {
    nombre: "Irrecoverable rent is taken off first",
    origen: { tipo: "recalculado", detalle: "120,000 less 20,000 irrecoverable = 100,000, less 20% = 80,000. Tax 12,000." },
    fecha: "2026-10-16",
    entrada: { renta: 120000, meses: 12, incobrable: 20000, rates: 0 },
    esperado: { valorTasable: 100000, valorNeto: 80000, impuesto: 12000 },
  },
  {
    nombre: "Irrecoverable rent above the rent is not valid",
    origen: { tipo: "recalculado", detalle: "incobrable > renta." },
    fecha: "2026-10-16",
    entrada: { renta: 10000, meses: 12, incobrable: 20000, rates: 0 },
    esperaError: true,
  },
]);
