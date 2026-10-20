import { definirCasos } from "@/motor/calculo";
import calculadora from "./vat-calculator";

const GRA = "https://gra.gov.gh/domestic-tax/tax-types/vat/" as const;

export default definirCasos(calculadora, [
  {
    nombre: "GRA example: GH₵1,000",
    origen: { tipo: "oficial", url: GRA, detalle: "NHIL 25, GETFund Levy 25, VAT 150; total GH₵1,200." },
    fecha: "2026-10-18",
    entrada: { monto: 1000, modo: "exclusive" },
    esperado: { nhil: 25, getfund: 25, iva: 150, totalImpuestos: 200, final: 1200, tasa: 20 },
  },
  {
    nombre: "Remove VAT and levies from GH₵1,200",
    origen: { tipo: "recalculado", detalle: "1,200 / 1.20 = 1,000." },
    fecha: "2026-10-18",
    entrada: { monto: 1200, modo: "inclusive" },
    esperado: { base: 1000, totalImpuestos: 200 },
  },
  {
    nombre: "Zero",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-18",
    entrada: { monto: 0, modo: "exclusive" },
    esperaError: true,
  },
]);
