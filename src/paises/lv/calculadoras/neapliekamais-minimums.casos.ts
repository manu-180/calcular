import { definirCasos } from "@/motor/calculo";
import calc from "./neapliekamais-minimums";

const VID = "https://www.vid.gov.lv/lv/neapliekamais-minimums";

export default definirCasos(calc, [
  {
    nombre: "Darba alga bez apgādājamiem",
    origen: { tipo: "oficial", url: VID, detalle: "VID: 550 eiro mēnesī, 6600 eiro gadā." },
    fecha: "2026-11-01",
    entrada: { statuss: "alga", apgadajamie: 0, atvieglojums: "nav" },
    esperado: { menesi: 550, gada: 6600, ietaupijums: 140.25 },
  },
  {
    nombre: "Pensija",
    origen: { tipo: "oficial", url: VID, detalle: "VID: 1000 eiro mēnesī, 12 000 eiro gadā." },
    fecha: "2026-11-01",
    entrada: { statuss: "pensija", apgadajamie: 0, atvieglojums: "nav" },
    esperado: { menesi: 1000, gada: 12000 },
  },
  {
    nombre: "Divi apgādājamie un I grupas invaliditāte",
    origen: { tipo: "recalculado", url: "https://www.vid.gov.lv/lv/papildu-nodokla-atvieglojums", detalle: "550 + 2 × 250 + 154 = 1204." },
    fecha: "2026-11-01",
    entrada: { statuss: "alga", apgadajamie: 2, atvieglojums: "invaliditate-1-2" },
    esperado: { menesi: 1204, papildu: 154 },
  },
]);
