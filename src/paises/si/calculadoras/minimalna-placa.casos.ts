import { definirCasos } from "@/motor/calculo";
import calc from "./minimalna-placa";

export default definirCasos(calc, [
  { nombre: "Poln delovni čas 2026", origen: { tipo: "recalculado", detalle: "Bruto 1481,88 (gov.si); neto 998,12; strošek 1751,16" }, fecha: "2026-10-31", entrada: { delez: 100 }, esperado: { bruto: 1481.88, neto: 998.12, strosek: 1751.16 } },
  { nombre: "Polovični čas", origen: { tipo: "recalculado", detalle: "Bruto 740,94; najnižja osnova sorazmerno 760,81; strošek 875,58" }, fecha: "2026-10-31", entrada: { delez: 50 }, esperado: { bruto: 740.94, neto: 530.37, strosek: 875.58 } },
]);
