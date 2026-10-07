import { definirCasos } from "@/motor/calculo";
import horasExtra from "./horas-extra";

export default definirCasos(horasExtra, [
  {
    nombre: "Ejemplo del MTPS: hora de $1.50, una hora extra de día",
    origen: {
      tipo: "oficial",
      url: "https://www.mtps.gob.sv/2025/11/24/direccion-general-de-inspeccion-de-trabajo/",
      detalle: "$1.50 (salario por hora) + $1.50 (recargo del 100 %) = $3.00. Un salario de 360 da 360 / 30 / 8 = 1,50 por hora.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 360, jornada: "diurna", diurnas: 1, nocturnas: 0 },
    esperado: { hora: 1.5, extraDia: 3, pagoDiurnas: 3, total: 3 },
  },
  {
    nombre: "Mismo ejemplo, hora extra de noche",
    origen: {
      tipo: "recalculado",
      url: "https://www.mtps.gob.sv/2025/11/24/direccion-general-de-inspeccion-de-trabajo/",
      detalle: "El MTPS suma el 25 % sobre los $3.00: 3,00 + 0,75 = 3,75. En su texto escribe $3.74 porque trunca el 25 %.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 360, jornada: "diurna", diurnas: 0, nocturnas: 1 },
    esperado: { extraNoche: 3.75, total: 3.75 },
  },
  {
    nombre: "Diez horas de día y cuatro de noche con $600",
    origen: { tipo: "recalculado", detalle: "600 / 30 / 8 = 2,50. Día: 5,00 × 10 = 50. Noche: 6,25 × 4 = 25. Total 75." },
    fecha: "2026-10-07",
    entrada: { salario: 600, jornada: "diurna", diurnas: 10, nocturnas: 4 },
    esperado: { hora: 2.5, pagoDiurnas: 50, pagoNocturnas: 25, total: 75 },
  },
  {
    nombre: "Jornada nocturna de 7 horas",
    origen: { tipo: "recalculado", detalle: "Art. 161: la jornada nocturna es de 7 horas. 420 / 30 / 7 = 2. Hora extra de noche 2 × 2 × 1,25 = 5; tres horas = 15." },
    fecha: "2026-10-07",
    entrada: { salario: 420, jornada: "nocturna", diurnas: 0, nocturnas: 3 },
    esperado: { hora: 2, extraNoche: 5, total: 15 },
  },
]);
