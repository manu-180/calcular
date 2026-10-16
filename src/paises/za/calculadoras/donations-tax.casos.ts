import { definirCasos } from "@/motor/calculo";
import calculadora from "./donations-tax";

export default definirCasos(calculadora, [
  {
    nombre: "R500 000 donation",
    origen: { tipo: "recalculado", detalle: "500 000 − 150 000 exemption = 350 000 × 20% = 70 000." },
    fecha: "2026-10-14",
    entrada: { donaciones: 500000, anteriores: 0 },
    esperado: { exento: 150000, gravable: 350000, impuesto: 70000 },
  },
  {
    nombre: "Crossing R30 million cumulative",
    origen: { tipo: "recalculado", detalle: "Earlier 29 900 000. Taxable 1 000 000: 100 000 × 20% = 20 000 plus 900 000 × 25% = 225 000. Total 245 000." },
    fecha: "2026-10-14",
    entrada: { donaciones: 1150000, anteriores: 29900000 },
    esperado: { gravable: 1000000, impuesto: 245000 },
  },
  {
    nombre: "Within the annual exemption",
    origen: { tipo: "recalculado", detalle: "100 000 is below the 150 000 exemption." },
    fecha: "2026-10-14",
    entrada: { donaciones: 100000, anteriores: 0 },
    esperado: { impuesto: 0, exento: 100000 },
  },
]);
