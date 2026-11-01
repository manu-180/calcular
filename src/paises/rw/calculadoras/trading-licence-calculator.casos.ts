import { definirCasos } from "@/motor/calculo";
import calculadora from "./trading-licence-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Turnover of RWF 50,000,000",
    origen: { tipo: "recalculado", detalle: "Band 20,000,000 to 200,000,000: 280,000 a year, 70,000 a quarter." },
    fecha: "2026-10-26",
    entrada: { actividad: "turnover", facturacion: 50000000 },
    esperado: { anual: 280000, trimestral: 70000 },
  },
  {
    nombre: "Turnover of RWF 15,000,000",
    origen: { tipo: "recalculado", detalle: "Band 12,000,000 to 20,000,000: 160,000 a year." },
    fecha: "2026-10-26",
    entrada: { actividad: "turnover", facturacion: 15000000 },
    esperado: { anual: 160000, trimestral: 40000 },
  },
  {
    nombre: "Unregistered shop in town",
    origen: { tipo: "recalculado", detalle: "Urban zone, not registered for income tax: 60,000 a year." },
    fecha: "2026-10-26",
    entrada: { actividad: "urban", facturacion: null },
    esperado: { anual: 60000, trimestral: 15000 },
  },
  {
    nombre: "Motorcycle taxi",
    origen: { tipo: "recalculado", detalle: "Transport by motorcycle: 8,000 a year." },
    fecha: "2026-10-26",
    entrada: { actividad: "motorcycle", facturacion: null },
    esperado: { anual: 8000, trimestral: 2000 },
  },
  {
    nombre: "Turnover below the bands",
    origen: { tipo: "recalculado", detalle: "The turnover table starts at 12,000,000." },
    fecha: "2026-10-26",
    entrada: { actividad: "turnover", facturacion: 5000000 },
    esperaError: true,
  },
]);
