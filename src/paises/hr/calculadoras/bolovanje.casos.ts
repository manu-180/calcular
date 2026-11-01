import { definirCasos } from "@/motor/calculo";
import calc from "./bolovanje";

const U = "https://hzzo.hr/obvezno-zdravstveno-osiguranje-0/naknada-place-za-vrijeme-privremene-nesposobnosti-za-rad";

export default definirCasos(calc, [
  { nombre: "Prvih 30 dana", origen: { tipo: "recalculado", url: U, detalle: "1.800 x 70 % = 1.260 na teret poslodavca." }, fecha: "2026-11-01", entrada: { osnovica: 1800, dani: 30, razlog: "bolest" }, esperado: { poslodavac: 1260, hzzo: 0, ukupno: 1260 } },
  { nombre: "Dan 60, HZZO od 43. dana", origen: { tipo: "recalculado", url: U, detalle: "42 x 1.400 / 30 = 1.960; 18 x 995,45 / 30 = 597,27." }, fecha: "2026-11-01", entrada: { osnovica: 2000, dani: 60, razlog: "bolest" }, esperado: { daniPoslodavac: 42, poslodavac: 1960, daniHzzo: 18, hzzo: 597.27, ukupno: 2557.27 } },
  { nombre: "Nakon šest mjeseci", origen: { tipo: "recalculado", url: U, detalle: "1.000 x 80 % = 800." }, fecha: "2026-11-01", entrada: { osnovica: 1000, dani: 30, razlog: "nakon" }, esperado: { hzzo: 800 } },
  { nombre: "Njega djeteta, gornja granica", origen: { tipo: "recalculado", url: U, detalle: "100 % ograničeno na 995,45." }, fecha: "2026-11-01", entrada: { osnovica: 2000, dani: 30, razlog: "dijete" }, esperado: { hzzo: 995.45 } },
  { nombre: "Donja granica", origen: { tipo: "recalculado", url: U, detalle: "400 x 80 % = 320, podignuto na 353,15." }, fecha: "2026-11-01", entrada: { osnovica: 400, dani: 30, razlog: "nakon" }, esperado: { hzzo: 353.15 } },
  { nombre: "Ozljeda na radu, bez granice", origen: { tipo: "recalculado", url: U, detalle: "100 % osnovice bez ograničenja." }, fecha: "2026-11-01", entrada: { osnovica: 3000, dani: 30, razlog: "ozljeda" }, esperado: { hzzo: 3000 } },
]);
