import { definirCasos } from "@/motor/calculo";
import calculadora from "./business-income-tax-calculator";

const URL = "https://revenue.gov.ws/wp-content/uploads/2026/10/IS01_Income-Tax-1-2026.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Company with WST 60,000 of taxable income",
    origen: { tipo: "recalculado", url: URL, detalle: "27% × 60,000 = 16,200." },
    fecha: "2026-10-29",
    entrada: { utilidad: 60000, entidad: "empresa" },
    esperado: { impuesto: 16200, neto: 43800, cuota: 5400 },
  },
  {
    nombre: "Sole trader with WST 60,000",
    origen: { tipo: "recalculado", url: URL, detalle: "10,000 × 20% = 2,000, plus 35,000 × 27% = 9,450. Tax 11,450." },
    fecha: "2026-10-29",
    entrada: { utilidad: 60000, entidad: "individual" },
    esperado: { impuesto: 11450, neto: 48550 },
  },
  {
    nombre: "Sole trader under the tax-free band",
    origen: { tipo: "oficial", url: URL, detalle: "The first 15,000 of income is taxed at nil." },
    fecha: "2026-10-29",
    entrada: { utilidad: 12000, entidad: "individual" },
    esperado: { impuesto: 0 },
  },
]);
