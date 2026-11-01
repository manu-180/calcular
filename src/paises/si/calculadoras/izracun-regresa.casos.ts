import { definirCasos } from "@/motor/calculo";
import calc from "./izracun-regresa";

export default definirCasos(calc, [
  { nombre: "Sorazmerni del", origen: { tipo: "recalculado", detalle: "1481,88 × 0,75 × 6 / 12 = 555,71" }, fecha: "2026-10-31", entrada: { meseci: 6, delez: 75, izplacan: null }, esperado: { najmanj: 555.71, obdavcen: 0 } },
  { nombre: "Nad povprečno plačo", origen: { tipo: "recalculado", detalle: "3000 − 2695,56 (SURS, avgust 2026) = 304,44" }, fecha: "2026-10-31", entrada: { meseci: 12, delez: 100, izplacan: 3000 }, esperado: { najmanj: 1481.88, obdavcen: 304.44, neobdavcen: 2695.56 } },
]);
