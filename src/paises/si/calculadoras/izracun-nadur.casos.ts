import { definirCasos } from "@/motor/calculo";
import calc from "./izracun-nadur";

export default definirCasos(calc, [
  { nombre: "10 nadur", origen: { tipo: "recalculado", detalle: "2000/174 × 10 = 114,94; × 30 % = 34,48; skupaj 149,42" }, fecha: "2026-10-31", entrada: { bruto: 2000, ure: 174, nadure: 10, dodatek: 30 }, esperado: { placilo: 149.42, dodatek: 34.48 } },
]);
