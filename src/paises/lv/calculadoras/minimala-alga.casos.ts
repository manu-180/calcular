import { definirCasos } from "@/motor/calculo";
import minimalaAlga from "./minimala-alga";

const VID = "https://www.vid.gov.lv/lv/media/2471/download";

export default definirCasos(minimalaAlga, [
  {
    nombre: "Pilna slodze ar grāmatiņu",
    origen: { tipo: "recalculado", url: VID, detalle: "780 × 10,5% = 81,90. (780 - 81,90 - 550) × 25,5% = 37,77. Neto 660,33. Darba devējs 780 × 23,59% = 184,00, izmaksas 964,00." },
    fecha: "2026-11-01",
    entrada: { slodze: 100, gramatina: true },
    esperado: { bruto: 780, neto: 660.33, vsaoi: 81.9, iin: 37.77, izmaksas: 964 },
  },
  {
    nombre: "Puse slodzes",
    origen: { tipo: "recalculado", url: VID, detalle: "390 × 10,5% = 40,95. Apliekamais nerodas. Neto 349,05." },
    fecha: "2026-11-01",
    entrada: { slodze: 50, gramatina: true },
    esperado: { bruto: 390, neto: 349.05, iin: 0 },
  },
]);
