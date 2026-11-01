import { definirCasos } from "@/motor/calculo";
import calc from "./olajsava-za-otroke";

export default definirCasos(calc, [
  { nombre: "Dva otroka", origen: { tipo: "recalculado", detalle: "2995,83 + 3256,77 = 6252,60; 288,31 − 152,84 = 135,47" }, fecha: "2026-10-31", entrada: { otroci: 2, bruto: 2500 }, esperado: { letna: 6252.6, prihranek: 135.47 } },
  { nombre: "Šest otrok", origen: { tipo: "recalculado", detalle: "Pravilnik: 2995,83; 3256,77; 5432,02; 7607,27; 9782,51; 11957,76, vsota 41032,16" }, fecha: "2026-10-31", entrada: { otroci: 6, bruto: 8000 }, esperado: { letna: 41032.16 } },
]);
