import { definirCasos } from "@/motor/calculo";
import salarioPorHora from "./salario-por-hora";

const R670 = "https://www.mtess.gov.py/wp-content/uploads/2026/07/Resolucion-MTESS-N%C2%B0-670-REGLAMENTACION-SALARIO-2026.pdf" as const;

export default definirCasos(salarioPorHora, [
  {
    nombre: "Salario mínimo diurno",
    origen: { tipo: "oficial", url: R670, detalle: "Res. MTESS 670/2026, art. 1: jornal 117.077, diario del mensualizado 101.467 y hora 12.683." },
    fecha: "2026-10-12",
    entrada: { salario: 3044000, jornada: "diurna" },
    esperado: { diario: 101467, hora: 12683, jornal: 117077, horaJornal: 14635 },
  },
  {
    nombre: "Salario mínimo nocturno",
    origen: { tipo: "oficial", url: R670, detalle: "Res. MTESS 670/2026, art. 1: mensual nocturno 3.957.200, jornal 152.200, diario 131.907 y hora 18.844. La hora del jornalero nocturno (152.200 / 7 = 21.743) coincide con la hora a tiempo parcial nocturna del art. 2." },
    fecha: "2026-10-12",
    entrada: { salario: 3957200, jornada: "nocturna" },
    esperado: { diario: 131907, hora: 18844, jornal: 152200, horaJornal: 21743 },
  },
]);
