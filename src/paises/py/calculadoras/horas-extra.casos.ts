import { definirCasos } from "@/motor/calculo";
import horasExtra from "./horas-extra";

const RES670 = "https://www.mtess.gov.py/wp-content/uploads/2026/07/Resolucion-MTESS-N%C2%B0-670-REGLAMENTACION-SALARIO-2026.pdf" as const;

export default definirCasos(horasExtra, [
  {
    nombre: "Hora del mensualero con el mínimo diurno",
    origen: { tipo: "oficial", url: RES670, detalle: "Resolución MTESS 670/2026, art. 1: salario por hora del mensualizado, jornada diurna, Gs. 12.683 (3.044.000 / 30 / 8)." },
    fecha: "2026-10-07",
    entrada: { salario: 3044000, jornada: "diurna", extraDiurnas: 0, extraNocturnas: 0, feriado: 0 },
    esperado: { hora: 12683, total: 0 },
  },
  {
    nombre: "Hora del mensualero con el mínimo nocturno",
    origen: { tipo: "oficial", url: RES670, detalle: "Resolución MTESS 670/2026, art. 1: salario por hora nocturna del mensualizado, Gs. 18.844 (3.957.200 / 30 / 7)." },
    fecha: "2026-10-07",
    entrada: { salario: 3957200, jornada: "nocturna", extraDiurnas: 0, extraNocturnas: 3, feriado: 0 },
    esperado: { hora: 18844, valorExtraNocturna: 37688, pagoNocturnas: 113063 },
  },
  {
    nombre: "Jornada diurna con extras de día, de noche y feriado",
    origen: {
      tipo: "recalculado",
      url: "https://www.bacn.gov.py/leyes-paraguayas/2608/ley-n-213-establece-el-codigo-del-trabajo",
      detalle: "Hora 4.800.000 / 30 / 8 = 20.000. Art. 234: extra de día +50 % = 30.000 × 10; extra de noche 100 % sobre la hora nocturna (20.000 × 1,3 = 26.000) = 52.000 × 2; feriado +100 % = 40.000 × 8. Total 724.000.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 4800000, jornada: "diurna", extraDiurnas: 10, extraNocturnas: 2, feriado: 8 },
    esperado: { hora: 20000, valorExtraDiurna: 30000, valorExtraNocturna: 52000, valorFeriado: 40000, pagoDiurnas: 300000, pagoNocturnas: 104000, pagoFeriado: 320000, total: 724000 },
  },
]);
