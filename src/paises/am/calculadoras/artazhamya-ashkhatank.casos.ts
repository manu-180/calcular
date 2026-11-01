import { definirCasos } from "@/motor/calculo";
import artazhamyaAshkhatank from "./artazhamya-ashkhatank";

const LEY = "https://www.arlis.am/hy/acts/66489/latest";

export default definirCasos(artazhamyaAshkhatank, [
  { nombre: "10 արտաժամյա, 5 գիշերային, 8 տոնական", origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 184, 185: 336 000 / 168 = 2000. 10 × 2000 × 1,5 = 30 000. 5 × 600 = 3000. 8 × 2000 × 2 = 32 000. Ընդամենը 65 000." }, fecha: "2026-11-01", entrada: { ashkhatavardz: 336000, amsaZham: 168, artazhamya: 10, gisher: 5, ton: 8 }, esperado: { lrats: 65000, zham: 2000, artazhamya: 30000, gisher: 3000, ton: 32000 } },
  { nombre: "Միայն արտաժամյա", origen: { tipo: "oficial", url: LEY, detalle: "20 × 2000 × 1,5 = 60 000." }, fecha: "2026-11-01", entrada: { ashkhatavardz: 336000, amsaZham: 168, artazhamya: 20, gisher: 0, ton: 0 }, esperado: { lrats: 60000 } },
]);
