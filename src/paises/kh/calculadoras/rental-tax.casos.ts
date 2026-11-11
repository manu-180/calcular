import { definirCasos } from "@/motor/calculo";
import calculadora from "./rental-tax";

export default definirCasos(calculadora, [
  { nombre: "ជួល 2,000,000", origen: { tipo: "recalculado", detalle: "2,000,000 x 10% = 200,000" }, fecha: "2026-10-01", entrada: { renta: 2000000 }, esperado: { impuesto: 200000, neto: 1800000 } },
  { nombre: "ក្រោម 500,000", origen: { tipo: "recalculado", detalle: "ក្រោម 500,000 រៀល រួចពីពន្ធ" }, fecha: "2026-10-01", entrada: { renta: 400000 }, esperado: { impuesto: 0 } },
]);
