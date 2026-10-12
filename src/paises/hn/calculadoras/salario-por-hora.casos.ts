import { definirCasos } from "@/motor/calculo";
import salarioPorHora from "./salario-por-hora";

export default definirCasos(salarioPorHora, [
  {
    nombre: "Salario mínimo de agricultura de 1 a 10 trabajadores, de día",
    origen: {
      tipo: "oficial",
      url: "https://tsc.gob.hn/web/leyes/Acuerdo-SETRASS-233-2026.pdf",
      detalle: "El Acuerdo SETRASS-233-2026 publica L9,596.64 al mes, L319.89 por jornada y L39.99 por hora. 9596.64 / 30 = 319.888; / 8 = 39.986.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 9596.64, jornada: "diurna" },
    esperado: { horasJornada: 8, diario: 319.89, hora: 39.99 },
  },
  {
    nombre: "L14,400 en jornada nocturna",
    origen: { tipo: "recalculado", detalle: "CT art. 322: jornada nocturna de 6 horas. 14400 / 30 = 480; 480 / 6 = 80. Semana 480 × 7 = 3360; quincena 7200." },
    fecha: "2026-10-12",
    entrada: { salario: 14400, jornada: "nocturna" },
    esperado: { diario: 480, semanal: 3360, quincenal: 7200, hora: 80 },
  },
  {
    nombre: "L14,400 en jornada mixta",
    origen: { tipo: "recalculado", detalle: "CT art. 321: jornada mixta de 7 horas. 480 / 7 = 68.57." },
    fecha: "2026-10-12",
    entrada: { salario: 14400, jornada: "mixta" },
    esperado: { horasJornada: 7, hora: 68.57 },
  },
]);
