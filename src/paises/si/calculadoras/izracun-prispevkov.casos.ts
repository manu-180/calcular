import { definirCasos } from "@/motor/calculo";
import calc from "./izracun-prispevkov";

export default definirCasos(calc, [
  { nombre: "2.500", origen: { tipo: "recalculado", detalle: "15,5 % = 387,50; 6,36 % = 159; 1 % = 25; 0,24 % = 6; OZP 39,36; skupaj 616,86; delodajalec 427,50" }, fecha: "2026-10-31", entrada: { bruto: 2500, delez: 100 }, esperado: { delavec: 616.86, piz: 387.5, delodajalec: 427.5, skupaj: 1044.36 } },
]);
