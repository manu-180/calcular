import { definirCasos } from "@/motor/calculo";
import calc from "./neto-bruto-kalkulator";

export default definirCasos(calc, [
  { nombre: "Neto 1.600", origen: { tipo: "recalculado", detalle: "Bruto 2509,09 da neto 1600,00: prispevki 618,96, akontacija 290,13, strošek 2509,09 + 17,1 % = 2938,14" }, fecha: "2026-10-31", entrada: { neto: 1600, otroci: 0, do29: false }, esperado: { bruto: 2509.09, netoDobljeno: 1600, strosek: 2938.14 } },
]);
