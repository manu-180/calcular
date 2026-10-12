import { definirCasos } from "@/motor/calculo";
import jornadaNocturna from "./jornada-nocturna";

export default definirCasos(jornadaNocturna, [
  {
    nombre: "Toda la jornada de noche con el salario básico",
    origen: { tipo: "recalculado", detalle: "Art. 49 del Código del Trabajo: 482 + 25 % = 482 + 120,50 = 602,50. Hora 482 / 240 = 2,01; nocturna 2,0083 × 1,25 = 2,51." },
    fecha: "2026-10-07",
    entrada: { sueldo: 482, todaLaJornada: true, horas: 0 },
    esperado: { hora: 2.01, horaNocturna: 2.51, recargo: 120.5, total: 602.5 },
  },
  {
    nombre: "Solo algunas horas de noche",
    origen: { tipo: "recalculado", detalle: "Sueldo 960: hora 960 / 240 = 4; recargo por hora 25 % = 1. 20 horas nocturnas = 20. Total 980." },
    fecha: "2026-10-07",
    entrada: { sueldo: 960, todaLaJornada: false, horas: 20 },
    esperado: { hora: 4, horaNocturna: 5, recargo: 20, total: 980 },
  },
]);
