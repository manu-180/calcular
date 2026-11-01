import { definirCasos } from "@/motor/calculo";
import calc from "./zimski-regres";

export default definirCasos(calc, [
  { nombre: "Polni znesek", origen: { tipo: "recalculado", detalle: "1481,88 / 2 = 740,94 (2. člen ZPZR)" }, fecha: "2026-10-31", entrada: { meseci: 12, delez: 100 }, esperado: { znesek: 740.94 } },
  { nombre: "Polovica časa, šest mesecev", origen: { tipo: "recalculado", detalle: "740,94 × 0,5 × 0,5 = 185,24" }, fecha: "2026-10-31", entrada: { meseci: 6, delez: 50 }, esperado: { znesek: 185.24 } },
]);
