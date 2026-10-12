import { definirCasos } from "@/motor/calculo";
import trabajoNocturno from "./trabajo-nocturno";

export default definirCasos(trabajoNocturno, [
  {
    nombre: "Salario mínimo nocturno",
    origen: {
      tipo: "oficial",
      url: "https://www.mtess.gov.py/wp-content/uploads/2026/07/Resolucion-MTESS-N%C2%B0-670-REGLAMENTACION-SALARIO-2026.pdf",
      detalle: "Res. MTESS 670/2026, art. 1: jornada nocturna, mensual Gs. 3.957.200, diario del mensualizado 131.907 y hora 18.844 (3.044.000 más 30 %).",
    },
    fecha: "2026-10-12",
    entrada: { salario: 3044000 },
    esperado: { recargo: 913200, nocturno: 3957200, diario: 131907, hora: 18844, minimo: 3957200 },
  },
  {
    nombre: "Salario de 5 millones",
    origen: { tipo: "recalculado", detalle: "5.000.000 × 30 % = 1.500.000; nocturno 6.500.000. Diario 6.500.000 / 30 = 216.666,67 (216.667). Hora 216.666,67 / 7 = 30.952,38 (30.952)." },
    fecha: "2026-10-12",
    entrada: { salario: 5000000 },
    esperado: { recargo: 1500000, nocturno: 6500000, diario: 216667, hora: 30952 },
  },
]);
