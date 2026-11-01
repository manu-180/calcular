import { definirCasos } from "@/motor/calculo";
import danovyBonus from "./danovy-bonus";

const FS = "https://podpora.financnasprava.sk/549090-Da%C5%88ov%C3%BD-bonus-na-vy%C5%BEivovan%C3%A9-die%C5%A5a-v-roku-2026";

export default definirCasos(danovyBonus, [
  { nombre: "Dve deti, základ 23 500 eur", origen: { tipo: "oficial", url: FS, detalle: "Príklad Finančnej správy: 2 400 eur." }, fecha: "2026-06-15", entrada: { zaklad: 23500, detiDo15: 2, deti15az18: 0 }, esperado: { bonus: 2400 } },
  { nombre: "Dve deti, limit 36 % zo základu 6 250 eur", origen: { tipo: "oficial", url: FS, detalle: "Príklad Finančnej správy: 2 250 eur." }, fecha: "2026-06-15", entrada: { zaklad: 6250, detiDo15: 2, deti15az18: 0 }, esperado: { bonus: 2250 } },
  { nombre: "Základ 30 000 eur: zníženie", origen: { tipo: "recalculado", url: FS, detalle: "(30 000 − 27 432) / 10 = 256,80 na dieťa; 2 × (1 200 − 256,80) = 1 886,40." }, fecha: "2026-06-15", entrada: { zaklad: 30000, detiDo15: 2, deti15az18: 0 }, esperado: { bonus: 1886.4 } },
  { nombre: "Dieťa od 15 rokov", origen: { tipo: "recalculado", url: FS, detalle: "50 × 12 = 600 eur." }, fecha: "2026-06-15", entrada: { zaklad: 20000, detiDo15: 0, deti15az18: 1 }, esperado: { bonus: 600 } },
]);
