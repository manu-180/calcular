import { definirCasos } from "@/motor/calculo";
import calc from "./personuafslattur";

export default definirCasos(calc, [
  {
    nombre: "Mánaðarlaun",
    origen: { tipo: "oficial", url: "https://www.skatturinn.is/einstaklingar/stadgreidsla/stadgreidsla/2026/", detalle: "72.492 kr. á mánuði og 869.898 kr. á ári. Skattleysismörk: 72.492 / 31,49% / 0,96 = 239.798." },
    fecha: "2026-06-15",
    entrada: { timabil: "man", dagar: null, nyting: 100 },
    esperado: { afslattur: 72492, ars: 869898, skattleysismork: 239798 },
  },
  {
    nombre: "Fjórtán dagar",
    origen: { tipo: "oficial", url: "https://www.skatturinn.is/einstaklingar/stadgreidsla/stadgreidsla/2026/", detalle: "33.366 kr. fyrir fjórtán daga." },
    fecha: "2026-06-15",
    entrada: { timabil: "fjortan", dagar: null, nyting: 100 },
    esperado: { afslattur: 33366 },
  },
  {
    nombre: "Annað tímabil, 10 dagar",
    origen: { tipo: "recalculado", detalle: "869.898 x 10 / 365 = 23.833." },
    fecha: "2026-06-15",
    entrada: { timabil: "annad", dagar: 10, nyting: 100 },
    esperado: { afslattur: 23833 },
  },
]);
