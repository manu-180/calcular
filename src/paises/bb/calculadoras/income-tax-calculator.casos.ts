import { definirCasos } from "@/motor/calculo";
import calculadora from "./income-tax-calculator";

const PN_RATES =
  "https://bra.gov.bb/attachment?file=Attachments%2fPolicy+Note+2026_Reduction+in+Personal+Income+Tax+Rates_April+2026.pdf&name=Policy+Note+2026_Reduction+in+Personal+Income+Tax+Rates_April+2026";
const PN_CIC =
  "https://bra.gov.bb/attachment?file=Attachments%2fPolicy+Note+2026_Compensatory+Income+Credit.pdf&name=Compensatory+Income+Credit+(CIC)+%e2%80%93+Increase+in+Income+Limit";

export default definirCasos(calculadora, [
  {
    nombre: "OGC 001/2026 example 1: $60,000 in 2026",
    origen: { tipo: "oficial", url: PN_RATES, detalle: "Taxable 60,000 − 25,000 = 35,000. Tax 35,000 × 11.5% = 4,025.00. Above the CIC limit." },
    fecha: "2026-10-27",
    entrada: { ingreso: 60000, cic: true },
    esperado: { neto: 4025, imponible: 35000, credito: 0 },
  },
  {
    nombre: "OGC 001/2026 example 2: $100,000 in 2026",
    origen: { tipo: "oficial", url: PN_RATES, detalle: "Taxable 75,000. 50,000 × 11.5% = 5,750 plus 25,000 × 27.5% = 6,875. Total 12,625." },
    fecha: "2026-10-27",
    entrada: { ingreso: 100000, cic: true },
    esperado: { neto: 12625, bajo: 5750, alto: 6875 },
  },
  {
    nombre: "OGC 002/2026 example 1: $50,000 in 2025",
    origen: { tipo: "oficial", url: PN_CIC, detalle: "Taxable 25,000 at 12.5% = 3,125. CIC 3,125. Net tax payable 0." },
    fecha: "2025-12-31",
    entrada: { ingreso: 50000, cic: true },
    esperado: { neto: 0, bruto: 3125, credito: 3125 },
  },
  {
    nombre: "OGC 002/2026 example 2: $45,000 in 2025",
    origen: { tipo: "oficial", url: PN_CIC, detalle: "Taxable 20,000. Tax 2,500. CIC 2,500. Net tax 0." },
    fecha: "2025-12-31",
    entrada: { ingreso: 45000, cic: true },
    esperado: { neto: 0, credito: 2500 },
  },
  {
    nombre: "$50,000 in 2026, credit capped at $2,875",
    origen: { tipo: "recalculado", detalle: "Taxable 25,000 × 11.5% = 2,875. CIC maximum for 2026 is 2,875. Net 0." },
    fecha: "2026-10-27",
    entrada: { ingreso: 50000, cic: true },
    esperado: { neto: 0, bruto: 2875, credito: 2875 },
  },
  {
    nombre: "$50,000 in 2026 as a company director",
    origen: { tipo: "recalculado", detalle: "Directors cannot claim the CIC. Tax 2,875." },
    fecha: "2026-10-27",
    entrada: { ingreso: 50000, cic: false },
    esperado: { neto: 2875, credito: 0 },
  },
  {
    nombre: "No income",
    origen: { tipo: "recalculado", detalle: "Zero income is rejected." },
    fecha: "2026-10-27",
    entrada: { ingreso: 0, cic: true },
    esperaError: true,
  },
]);
