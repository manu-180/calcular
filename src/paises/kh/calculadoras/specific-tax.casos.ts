import { definirCasos } from "@/motor/calculo";
import calculadora from "./specific-tax";

export default definirCasos(calculadora, [
  { nombre: "ស្រាបៀរ 30%", origen: { tipo: "recalculado", detalle: "1,000,000 x 30% = 300,000" }, fecha: "2026-10-01", entrada: { bien: "beer", base: 1000000 }, esperado: { impuesto: 300000 } },
  { nombre: "ទូរគមនាគមន៍ 3%", origen: { tipo: "recalculado", detalle: "1,000,000 x 3% = 30,000" }, fecha: "2026-10-01", entrada: { bien: "telecom", base: 1000000 }, esperado: { impuesto: 30000 } },
]);
