import { definirCasos } from "@/motor/calculo";
import calculadora from "./take-home-pay";

export default definirCasos(calculadora, [
  {
    nombre: "BND 2,000 gross, citizen",
    origen: { tipo: "recalculado", detalle: "2,000 minus SPK 170.00 = 1,830.00. No income tax." },
    fecha: "2026-10-29",
    entrada: { bruto: 2000, ciudadano: true },
    esperado: { neto: 1830, spk: 170, impuesto: 0, netoAnual: 21960 },
  },
  {
    nombre: "BND 2,000 gross, foreign employee",
    origen: { tipo: "recalculado", detalle: "No SPK for a non-resident employee, no income tax: 2,000." },
    fecha: "2026-10-29",
    entrada: { bruto: 2000, ciudadano: false },
    esperado: { neto: 2000, spk: 0 },
  },
  {
    nombre: "BND 400 gross",
    origen: { tipo: "oficial", url: "https://www.tap.com.bn/employers-responsibilities-contribution", detalle: "TAP example: 400 x 8.5% = 34.00, so 366.00 is left." },
    fecha: "2026-10-29",
    entrada: { bruto: 400, ciudadano: true },
    esperado: { neto: 366, spk: 34 },
  },
  {
    nombre: "BND 5,000 gross",
    origen: { tipo: "recalculado", detalle: "5,000 x 8.5% = 425.00, no cap, so 4,575.00." },
    fecha: "2026-10-29",
    entrada: { bruto: 5000, ciudadano: true },
    esperado: { neto: 4575, spk: 425 },
  },
]);
