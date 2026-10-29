import { definirCasos } from "@/motor/calculo";
import calculadora from "./withholding-tax-calculator";

const URL = "https://revenue.gov.ws/wp-content/uploads/2026/10/IS01_Income-Tax-1-2026.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Resident contractor paid by a ministry",
    origen: { tipo: "recalculado", url: URL, detalle: "10% of 10,000 = 1,000. Paid 9,000." },
    fecha: "2026-10-29",
    entrada: { monto: 10000, caso: "residente" },
    esperado: { retenido: 1000, neto: 9000 },
  },
  {
    nombre: "Non-resident consultant",
    origen: { tipo: "recalculado", url: URL, detalle: "15% of 10,000 = 1,500. Paid 8,500." },
    fecha: "2026-10-29",
    entrada: { monto: 10000, caso: "no-residente" },
    esperado: { retenido: 1500, neto: 8500 },
  },
  {
    nombre: "Non-resident life insurance premium",
    origen: { tipo: "recalculado", url: URL, detalle: "7.5% of 10,000 = 750." },
    fecha: "2026-10-29",
    entrada: { monto: 10000, caso: "no-residente-seguro" },
    esperado: { retenido: 750, neto: 9250 },
  },
]);
