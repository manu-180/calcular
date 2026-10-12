import { definirCasos } from "@/motor/calculo";
import iass from "./iass";

export default definirCasos(iass, [
  {
    nombre: "Jubilación de $ 80.000",
    origen: {
      tipo: "recalculado",
      url: "https://www.bps.gub.uy/18002/el-impuesto-de-asistencia-a-la-seguridad-social-iass.html",
      detalle: "Escala anual del BPS mensualizada con BPC 6.864: exento hasta 9 BPC (61.776), 6 % hasta 15 BPC (102.960). (80.000 − 61.776) × 6 % = 1.093,44.",
    },
    fecha: "2026-10-12",
    entrada: { pasividad: 80000 },
    esperado: { minimoMensual: 61776, mensual: 1093.44, anual: 13121.28, tasaMarginal: 6, liquido: 78906.56 },
  },
  {
    nombre: "Jubilación bajo el mínimo",
    origen: { tipo: "recalculado", detalle: "50.000 no pasa 61.776: IASS 0." },
    fecha: "2026-10-12",
    entrada: { pasividad: 50000 },
    esperado: { mensual: 0, tasaMarginal: 0 },
  },
  {
    nombre: "Jubilación de $ 120.000: segunda franja",
    origen: { tipo: "recalculado", detalle: "41.184 × 6 % = 2.471,04 más (120.000 − 102.960) × 24 % = 4.089,60. Total 6.560,64." },
    fecha: "2026-10-12",
    entrada: { pasividad: 120000 },
    esperado: { mensual: 6560.64, tasaMarginal: 24 },
  },
]);
