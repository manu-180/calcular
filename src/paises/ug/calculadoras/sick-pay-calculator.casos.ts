import { definirCasos } from "@/motor/calculo";
import calculadora from "./sick-pay-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Three months off sick on Ushs 1,000,000",
    origen: {
      tipo: "recalculado",
      url: "https://media.ulii.org/media/legislation/128859/source_file/107fdd589735b99e/ug-act-2026-10-publication-document.pdf",
      detalle: "Section 54 as amended in 2026: 2 months full pay = 2,000,000; 1 month half pay = 500,000. Total 2,500,000.",
    },
    fecha: "2026-10-24",
    entrada: { mensual: 1000000, meses: 3, servicio: true },
    esperado: { total: 2500000, completo: 2000000, mitad: 500000, mesesCompletos: 2, mesesMitad: 1 },
  },
  {
    nombre: "Eight months off sick",
    origen: { tipo: "recalculado", detalle: "2 months full (1,600,000) + 4 months half (1,600,000). Nothing after month six." },
    fecha: "2026-10-24",
    entrada: { mensual: 800000, meses: 8, servicio: true },
    esperado: { total: 3200000, mesesMitad: 4 },
  },
  {
    nombre: "Two weeks off sick",
    origen: { tipo: "recalculado", detalle: "0.5 month on full pay: 600,000." },
    fecha: "2026-10-24",
    entrada: { mensual: 1200000, meses: 0.5, servicio: true },
    esperado: { total: 600000, mitad: 0 },
  },
  {
    nombre: "Less than a month of service",
    origen: { tipo: "recalculado", detalle: "Section 54(1) needs one month of continuous service." },
    fecha: "2026-10-24",
    entrada: { mensual: 1000000, meses: 1, servicio: false },
    esperado: { total: 0 },
  },
]);
