import { definirCasos } from "@/motor/calculo";
import calc from "./stimpilgjald";

export default definirCasos(calc, [
  {
    nombre: "Einstaklingur",
    origen: { tipo: "recalculado", detalle: "60.000.000 x 0,8% = 480.000; + 3.800." },
    fecha: "2026-06-15",
    entrada: { mat: 60000000, kaupandi: "einstaklingur", skjol: 1 },
    esperado: { gjald: 480000, samtals: 483800 },
  },
  {
    nombre: "Lögaðili",
    origen: { tipo: "recalculado", detalle: "60.000.000 x 1,6% = 960.000." },
    fecha: "2026-06-15",
    entrada: { mat: 60000000, kaupandi: "logadili", skjol: 0 },
    esperado: { gjald: 960000, samtals: 960000 },
  },
  {
    nombre: "Fyrstu kaup",
    origen: { tipo: "recalculado", detalle: "60.000.000 x 0,4% = 240.000." },
    fecha: "2026-06-15",
    entrada: { mat: 60000000, kaupandi: "fyrstu", skjol: 2 },
    esperado: { gjald: 240000, thinglysing: 7600 },
  },
]);
