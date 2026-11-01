import { definirCasos } from "@/motor/calculo";
import calculadora from "./tax-on-income";

export default definirCasos(calculadora, [
  { nombre: "នីតិបុគ្គល 20%", origen: { tipo: "recalculado", detalle: "100,000,000 x 20% = 20,000,000" }, fecha: "2026-10-01", entrada: { tipo: "legal", ganancia: 100000000 }, esperado: { impuesto: 20000000 } },
  { nombre: "ឯកបុគ្គល 30 លាន", origen: { tipo: "recalculado", detalle: "អនុក្រឹត្យ 48 មាត្រា 4: 6,000,000 x 5% + 6,000,000 x 10% = 900,000" }, fecha: "2026-10-01", entrada: { tipo: "persona", ganancia: 30000000 }, esperado: { impuesto: 900000 } },
  { nombre: "ធនធានធម្មជាតិ 30%", origen: { tipo: "recalculado", detalle: "100,000,000 x 30% = 30,000,000" }, fecha: "2026-10-01", entrada: { tipo: "resource", ganancia: 100000000 }, esperado: { impuesto: 30000000 } },
]);
