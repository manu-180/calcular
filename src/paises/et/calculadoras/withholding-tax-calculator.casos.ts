import { definirCasos } from "@/motor/calculo";
import calculadora from "./withholding-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Goods worth ETB 50,000",
    origen: { tipo: "recalculado", detalle: "Above 20,000: 50,000 × 3% = 1,500." },
    fecha: "2026-10-27",
    entrada: { importe: 50000, tipo: "goods", tin: true },
    esperado: { retencion: 1500, tasa: 3, aPagar: 48500 },
  },
  {
    nombre: "Goods worth exactly ETB 20,000",
    origen: { tipo: "recalculado", detalle: "Article 97(1)(a) needs more than 20,000: no withholding." },
    fecha: "2026-10-27",
    entrada: { importe: 20000, tipo: "goods", tin: true },
    esperado: { retencion: 0, tasa: 0 },
  },
  {
    nombre: "Services of ETB 10,000",
    origen: { tipo: "recalculado", detalle: "Article 97(1)(b): services involving 10,000. 10,000 × 3% = 300." },
    fecha: "2026-10-27",
    entrada: { importe: 10000, tipo: "services", tin: true },
    esperado: { retencion: 300 },
  },
  {
    nombre: "Services of ETB 9,999",
    origen: { tipo: "recalculado", detalle: "Below 10,000: no withholding." },
    fecha: "2026-10-27",
    entrada: { importe: 9999, tipo: "services", tin: true },
    esperado: { retencion: 0 },
  },
  {
    nombre: "Supplier without TIN",
    origen: { tipo: "recalculado", detalle: "Article 97(4): 50,000 × 30% = 15,000." },
    fecha: "2026-10-27",
    entrada: { importe: 50000, tipo: "goods", tin: false },
    esperado: { retencion: 15000, tasa: 30 },
  },
]);
