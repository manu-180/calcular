import { definirCasos } from "@/motor/calculo";
import calc from "./godisnji-odmor";

const U = "https://narodne-novine.nn.hr/clanci/sluzbeni/2014_07_93_1872.html";
const B = { maloljetnik: false, placa: 2000 };

export default definirCasos(calc, [
  { nombre: "Puna godina, pet dana", origen: { tipo: "recalculado", url: U, detalle: "Čl. 77.: 4 tjedna x 5 = 20 dana; 2.000 x 12 / 260 = 92,31 po danu; 20 dana = 1.846,15." }, fecha: "2026-11-01", entrada: { danaTjedno: 5, mjeseci: 12, prestanak: false, ...B }, esperado: { dani: 20, dnevna: 92.31, naknada: 1846.15 } },
  { nombre: "Tri mjeseca, razmjerno", origen: { tipo: "recalculado", url: U, detalle: "Čl. 78.: 20 x 3 / 12 = 5." }, fecha: "2026-11-01", entrada: { danaTjedno: 5, mjeseci: 3, prestanak: false, ...B }, esperado: { dani: 5 } },
  { nombre: "Šest mjeseci, puno pravo", origen: { tipo: "recalculado", url: U, detalle: "Čl. 77. st. 3.: nakon šest mjeseci puno pravo, 20 dana." }, fecha: "2026-11-01", entrada: { danaTjedno: 5, mjeseci: 6, prestanak: false, ...B }, esperado: { dani: 20 } },
  { nombre: "Prestanak nakon sedam mjeseci, zaokruživanje", origen: { tipo: "recalculado", url: U, detalle: "Čl. 79. st. 4.: 20 x 7 / 12 = 11,67, zaokruženo na 12." }, fecha: "2026-11-01", entrada: { danaTjedno: 5, mjeseci: 7, prestanak: true, ...B }, esperado: { dani: 12 } },
  { nombre: "Maloljetnik", origen: { tipo: "recalculado", url: U, detalle: "5 tjedana x 5 = 25." }, fecha: "2026-11-01", entrada: { danaTjedno: 5, mjeseci: 12, prestanak: false, maloljetnik: true, placa: 2000 }, esperado: { dani: 25 } },
]);
