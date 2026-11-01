import { definirCasos } from "@/motor/calculo";
import calculadora from "./withholding-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Technical services of BND 20,000",
    origen: { tipo: "recalculado", detalle: "20,000 x 10% = 2,000." },
    fecha: "2026-10-29",
    entrada: { pago: 20000, naturaleza: "technical-services", modo: "gross" },
    esperado: { retencion: 2000, tasa: 10, aRecibir: 18000 },
  },
  {
    nombre: "Loan interest of BND 100,000",
    origen: { tipo: "recalculado", detalle: "Interest is withheld at 2.5%: 100,000 x 2.5% = 2,500." },
    fecha: "2026-10-29",
    entrada: { pago: 100000, naturaleza: "interest", modo: "gross" },
    esperado: { retencion: 2500, tasa: 2.5, aRecibir: 97500 },
  },
  {
    nombre: "Net amount of BND 18,000 for management fees",
    origen: { tipo: "recalculado", detalle: "18,000 / (1 - 10%) = 20,000 gross, tax 2,000." },
    fecha: "2026-10-29",
    entrada: { pago: 18000, naturaleza: "management", modo: "net" },
    esperado: { bruto: 20000, retencion: 2000 },
  },
  {
    nombre: "Directors' remuneration",
    origen: { tipo: "recalculado", detalle: "5,000 x 10% = 500." },
    fecha: "2026-10-29",
    entrada: { pago: 5000, naturaleza: "directors", modo: "gross" },
    esperado: { retencion: 500, aRecibir: 4500 },
  },
]);
