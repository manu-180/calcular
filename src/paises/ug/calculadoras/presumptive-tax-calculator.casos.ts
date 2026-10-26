import { definirCasos } from "@/motor/calculo";
import calculadora from "./presumptive-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Ushs 60 million with records",
    origen: {
      tipo: "recalculado",
      url: "https://ura.go.ug/en/taxes-on-small-businesses/",
      detalle: "50 to 80 million: 180,000 + 0.6% × (60,000,000 − 50,000,000) = 240,000. Without records: 400,000.",
    },
    fecha: "2026-10-24",
    entrada: { ventas: 60000000, registros: true },
    esperado: { impuesto: 240000, conRegistros: 240000, sinRegistros: 400000 },
  },
  {
    nombre: "Ushs 25 million without records",
    origen: { tipo: "recalculado", detalle: "10 to 30 million without records: 80,000. With records 0.4% × 15,000,000 = 60,000." },
    fecha: "2026-10-24",
    entrada: { ventas: 25000000, registros: false },
    esperado: { impuesto: 80000, conRegistros: 60000 },
  },
  {
    nombre: "Ushs 150 million with records",
    origen: { tipo: "recalculado", detalle: "360,000 + 0.7% × 70,000,000 = 850,000. Without records 900,000." },
    fecha: "2026-10-24",
    entrada: { ventas: 150000000, registros: true },
    esperado: { impuesto: 850000, sinRegistros: 900000 },
  },
  {
    nombre: "Exactly Ushs 10 million",
    origen: { tipo: "recalculado", detalle: "Turnover that does not exceed 10 million: nil either way." },
    fecha: "2026-10-24",
    entrada: { ventas: 10000000, registros: false },
    esperado: { impuesto: 0, conRegistros: 0, sinRegistros: 0 },
  },
  {
    nombre: "Above Ushs 150 million",
    origen: { tipo: "recalculado", detalle: "Not a small business taxpayer." },
    fecha: "2026-10-24",
    entrada: { ventas: 160000000, registros: true },
    esperaError: true,
  },
]);
