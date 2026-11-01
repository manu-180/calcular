import { definirCasos } from "@/motor/calculo";
import calc from "./izracun-bolniske";

export default definirCasos(calc, [
  { nombre: "Bolezen do 90 dni", origen: { tipo: "recalculado", detalle: "80 % × 2000 = 1600 (31. člen ZZVZZ)" }, fecha: "2026-10-31", entrada: { osnova: 2000, vzrok: "bolezen", trajanje: "do90" }, esperado: { nadomestilo: 1600, stopnja: 80 } },
  { nombre: "Poškodba po 90 dneh", origen: { tipo: "recalculado", detalle: "80 % × 2000 = 1600" }, fecha: "2026-10-31", entrada: { osnova: 2000, vzrok: "poskodba", trajanje: "nad90" }, esperado: { nadomestilo: 1600, stopnja: 80 } },
  { nombre: "Poklicna bolezen", origen: { tipo: "recalculado", detalle: "100 %" }, fecha: "2026-10-31", entrada: { osnova: 2000, vzrok: "poklicna", trajanje: "do90" }, esperado: { nadomestilo: 2000 } },
  { nombre: "Najnižje nadomestilo", origen: { tipo: "recalculado", detalle: "60 % × 1481,88 = 889,13" }, fecha: "2026-10-31", entrada: { osnova: 500, vzrok: "bolezen", trajanje: "do90" }, esperado: { nadomestilo: 889.13 } },
]);
