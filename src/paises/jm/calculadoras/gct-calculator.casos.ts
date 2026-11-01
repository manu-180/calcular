import { definirCasos } from "@/motor/calculo";
import calculadora from "./gct-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Add 15% GCT to J$10,000",
    origen: { tipo: "recalculado", url: "https://www.jamaicatax.gov.jm/general-consumption-tax1", detalle: "Standard rate 15% since April 2020. 10,000 × 15% = 1,500. Total 11,500." },
    fecha: "2026-10-24",
    entrada: { modo: "add", importe: 10000 },
    esperado: { total: 11500, gct: 1500, neto: 10000, tasa: 15 },
  },
  {
    nombre: "Take GCT out of J$11,500",
    origen: { tipo: "recalculado", detalle: "11,500 / 1.15 = 10,000. GCT 1,500." },
    fecha: "2026-10-24",
    entrada: { modo: "remove", importe: 11500 },
    esperado: { neto: 10000, gct: 1500, total: 11500 },
  },
  {
    nombre: "Take GCT out of J$5,000",
    origen: { tipo: "recalculado", detalle: "5,000 / 1.15 = 4,347.83. GCT 652.17." },
    fecha: "2026-10-24",
    entrada: { modo: "remove", importe: 5000 },
    esperado: { neto: 4347.83, gct: 652.17 },
  },
]);
