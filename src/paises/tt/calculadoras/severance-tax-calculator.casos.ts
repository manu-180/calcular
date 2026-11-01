import { definirCasos } from "@/motor/calculo";
import calculadora from "./severance-tax-calculator";

const IRD = "https://www.ird.gov.tt/general-guidelines-for-severance-gratuity";

export default definirCasos(calculadora, [
  {
    nombre: "Severance of TT$300,000",
    origen: { tipo: "oficial", url: IRD, detalle: "Severance payments of $500,000 or less are exempt from tax." },
    fecha: "2026-10-27",
    entrada: { tipo: "severance", monto: 300000, tasaPromedio: 0 },
    esperado: { neto: 300000, impuesto: 0, exento: 300000, gravado: 0 },
  },
  {
    nombre: "Severance of TT$650,000 with an 18% average rate",
    origen: { tipo: "recalculado", detalle: "500,000 exempt. 150,000 taxed at the previous year's average rate: 18% = 27,000. Net 623,000." },
    fecha: "2026-10-27",
    entrada: { tipo: "severance", monto: 650000, tasaPromedio: 18 },
    esperado: { neto: 623000, impuesto: 27000, exento: 500000, gravado: 150000 },
  },
  {
    nombre: "Contract gratuity of TT$1,200,000",
    origen: { tipo: "recalculado", detalle: "25% × 1,000,000 + 30% × 200,000 = 310,000. Net 890,000." },
    fecha: "2026-10-27",
    entrada: { tipo: "gratuity", monto: 1200000, tasaPromedio: null },
    esperado: { impuesto: 310000, neto: 890000, exento: 0 },
  },
  {
    nombre: "Contract gratuity of TT$80,000",
    origen: { tipo: "oficial", url: IRD, detalle: "Contract gratuity: 25% up to $1,000,000, no exemptions. 80,000 × 25% = 20,000." },
    fecha: "2026-10-27",
    entrada: { tipo: "gratuity", monto: 80000, tasaPromedio: null },
    esperado: { impuesto: 20000 },
  },
]);
