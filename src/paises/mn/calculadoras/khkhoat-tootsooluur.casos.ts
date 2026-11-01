import { definirCasos } from "@/motor/calculo";
import calculadora from "./khkhoat-tootsooluur";

export default definirCasos(calculadora, [
  { nombre: "20 сая", origen: { tipo: "recalculado", detalle: "21.1: 10% = 2,000,000. 23.1: 18-24 сая = 168,000. Төлөх 1,832,000." }, fecha: "2026-11-01", entrada: { orlogo: 20000000 }, esperado: { tolokh: 1832000, tatvar: 2000000, khongololt: 168000 } },
  { nombre: "150 сая, 15%", origen: { tipo: "recalculado", detalle: "12,000,000 + 30,000,000 × 15% = 16,500,000; хөнгөлөлт 0." }, fecha: "2026-11-01", entrada: { orlogo: 150000000 }, esperado: { tolokh: 16500000, khongololt: 0 } },
  { nombre: "200 сая, 20%", origen: { tipo: "recalculado", detalle: "21,000,000 + 20,000,000 × 20% = 25,000,000." }, fecha: "2026-11-01", entrada: { orlogo: 200000000 }, esperado: { tolokh: 25000000 } },
  { nombre: "5 сая, хамгийн их хөнгөлөлт", origen: { tipo: "recalculado", detalle: "500,000 − 240,000 = 260,000." }, fecha: "2026-11-01", entrada: { orlogo: 5000000 }, esperado: { tolokh: 260000, khongololt: 240000 } },
]);
