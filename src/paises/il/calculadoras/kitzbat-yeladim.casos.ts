import { definirCasos } from "@/motor/calculo";
import calculadora from "./kitzbat-yeladim";

export default definirCasos(calculadora, [
  {
    nombre: "Tres hijos",
    origen: { tipo: "oficial", url: "https://www.btl.gov.il/Publications/benefits_update/Documents/hozerkizba2026.pdf", detalle: "173 por el primero y 219 por el segundo y el tercero: 611 por mes." },
    fecha: "2026-10-24",
    entrada: { yeladim: 3 },
    esperado: { chodshi: 611, shnati: 7332 },
  },
  {
    nombre: "Seis hijos",
    origen: { tipo: "recalculado", detalle: "173 + 3 x 219 + 2 x 173 = 1.176." },
    fecha: "2026-10-24",
    entrada: { yeladim: 6 },
    esperado: { chodshi: 1176 },
  },
  {
    nombre: "Un hijo",
    origen: { tipo: "recalculado", detalle: "173." },
    fecha: "2026-10-24",
    entrada: { yeladim: 1 },
    esperado: { chodshi: 173, memutza: 173 },
  },
]);
