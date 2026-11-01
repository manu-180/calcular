import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflyatsiin-tootsooluur";

export default definirCasos(calculadora, [
  { nombre: "2016 оны 9 дүгээр сар", origen: { tipo: "recalculado", detalle: "ХҮИ 2023=100: 131.7 / 58.9 × 1,000,000 = 2,235,993.21." }, fecha: "2026-11-01", entrada: { dun: 1000000, on: 2016, sar: 9 }, esperado: { odoo: 2235993.21, jiliin: 12.9, khuu: 12.5 }, tolerancia: 0.01 },
  { nombre: "2023 оны 9 дүгээр сар", origen: { tipo: "recalculado", detalle: "131.7 / 100.6 × 1,000,000 = 1,309,145.13." }, fecha: "2026-11-01", entrada: { dun: 1000000, on: 2023, sar: 9 }, esperado: { odoo: 1309145.13 }, tolerancia: 0.01 },
  { nombre: "Эрт он", origen: { tipo: "recalculado", detalle: "Индекс байхгүй." }, fecha: "2026-11-01", entrada: { dun: 1000000, on: 2009, sar: 1 }, esperaError: true },
]);
