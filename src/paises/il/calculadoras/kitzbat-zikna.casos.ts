import { definirCasos } from "@/motor/calculo";
import calculadora from "./kitzbat-zikna";

export default definirCasos(calculadora, [
  {
    nombre: "Soltero con 35 años de seguro: ותק máximo 50%",
    origen: { tipo: "recalculado", detalle: "1.838 + 50% (919) = 2.757; menos 237 de ביטוח בריאות = 2.520." },
    fecha: "2026-10-26",
    entrada: { shanim: 35, dchiya: 0, benZug: false, yeladim: 0, gil80: false },
    esperado: { achuzVetek: 50, vetek: 919, bruto: 2757, briut: 237, neto: 2520 },
  },
  {
    nombre: "15 años, con cónyuge, mayor de 80",
    origen: { tipo: "recalculado", detalle: "Ejemplo del ביטוח לאומי: 15 años = 30%. 1.838 + 551,40 + 924 + 103 = 3.416,40; menos 340 = 3.076,40." },
    fecha: "2026-10-26",
    entrada: { shanim: 15, dchiya: 0, benZug: true, yeladim: 0, gil80: true },
    esperado: { achuzVetek: 30, vetek: 551.4, tosafot: 1027, bruto: 3416.4, neto: 3076.4 },
  },
  {
    nombre: "3 años de דחייה",
    origen: { tipo: "recalculado", detalle: "(1.838 + 919) x 15% = 413,55; bruto 3.170,55; neto 2.933,55." },
    fecha: "2026-10-26",
    entrada: { shanim: 25, dchiya: 3, benZug: false, yeladim: 0, gil80: false },
    esperado: { dchiya: 413.55, bruto: 3170.55, neto: 2933.55 },
  },
  {
    nombre: "Tres hijos: suplemento solo por dos",
    origen: { tipo: "recalculado", detalle: "1.838 + 2 x 581 = 3.000; neto 2.763." },
    fecha: "2026-10-26",
    entrada: { shanim: 0, dchiya: 0, benZug: false, yeladim: 3, gil80: false },
    esperado: { vetek: 0, tosafot: 1162, bruto: 3000, neto: 2763 },
  },
]);
