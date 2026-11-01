import { definirCasos } from "@/motor/calculo";
import calc from "./obezshtenie-za-otglezhdane-na-dete";

const ZB = "https://www.noi.bg/wp-content/uploads/zbdoo-2026.pdf";

export default definirCasos(calc, [
  {
    nombre: "12 месеца",
    origen: { tipo: "recalculado", url: ZB, detalle: "Чл. 12: 398,81 × 12 = 4785,72." },
    fecha: "2026-10-31",
    entrada: { mesetsi: 12 },
    esperado: { mesechno: 398.81, obshto: 4785.72 },
  },
]);
