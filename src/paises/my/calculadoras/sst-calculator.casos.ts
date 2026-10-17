import { definirCasos } from "@/motor/calculo";
import calculadora from "./sst-calculator";

const SVC = "https://mysst.customs.gov.my/faq-services-tax/";

export default definirCasos(calculadora, [
  {
    nombre: "RM100 of a standard-rated service",
    origen: { tipo: "oficial", url: SVC, detalle: "Service tax FAQ: 8% for all taxable services except the 6% ones. 100 × 8% = 8." },
    fecha: "2026-10-16",
    entrada: { importe: 100, tipo: "service-standard", modo: "add" },
    esperado: { total: 108, impuesto: 8, tasa: 8 },
  },
  {
    nombre: "RM250 restaurant bill at 6%",
    origen: { tipo: "oficial", url: SVC, detalle: "F&B is taxed at 6%. 250 × 6% = 15." },
    fecha: "2026-10-16",
    entrada: { importe: 250, tipo: "service-reduced", modo: "add" },
    esperado: { total: 265, impuesto: 15 },
  },
  {
    nombre: "RM110 including 10% sales tax",
    origen: { tipo: "recalculado", detalle: "110 / 1.10 = 100 before tax; tax 10." },
    fecha: "2026-10-16",
    entrada: { importe: 110, tipo: "sales-10", modo: "remove" },
    esperado: { neto: 100, impuesto: 10, total: 110 },
  },
  {
    nombre: "RM39.90 of 5% goods",
    origen: { tipo: "recalculado", detalle: "39.90 × 5% = 1.995, rounded to 2.00. Total 41.90." },
    fecha: "2026-10-16",
    entrada: { importe: 39.9, tipo: "sales-5", modo: "add" },
    esperado: { impuesto: 2, total: 41.9 },
  },
]);
