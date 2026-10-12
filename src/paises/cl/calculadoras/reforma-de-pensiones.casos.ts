import { definirCasos } from "@/motor/calculo";
import reformaDePensiones from "./reforma-de-pensiones";

export default definirCasos(reformaDePensiones, [
  {
    nombre: "Sueldo de $1.000.000 en octubre de 2026",
    origen: {
      tipo: "recalculado",
      detalle: "Ley 21.735, art. cuarto transitorio: 3,5 % desde agosto de 2026 = 35.000; 4,25 % desde el 1/8/2027 = 42.500.",
    },
    fecha: "2026-10-07",
    entrada: { imponible: 1000000 },
    esperado: { tasa: 3.5, aporte: 35000, proximaFecha: "01-08-2027", proximaTasa: 4.25, proximoAporte: 42500 },
  },
  {
    nombre: "Julio de 2026, último mes con 1 %",
    origen: { tipo: "recalculado", detalle: "1 % hasta julio de 2026: 1.500.000 × 1 % = 15.000. Próxima: 3,5 % el 1/8/2026 = 52.500." },
    fecha: "2026-07-15",
    entrada: { imponible: 1500000 },
    esperado: { tasa: 1, aporte: 15000, proximaFecha: "01-08-2026", proximaTasa: 3.5, proximoAporte: 52500 },
  },
  {
    nombre: "Sueldo sobre el tope",
    origen: { tipo: "recalculado", detalle: "Tope 3.700.309 (UF 41.114,54). 3,5 % = 129.510,8 → 129.511." },
    fecha: "2026-10-07",
    entrada: { imponible: 5000000 },
    esperado: { aporte: 129511 },
  },
]);
