import { definirCasos } from "@/motor/calculo";
import horasExtra from "./horas-extra";

const ET = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430";

export default definirCasos(horasExtra, [
  {
    nombre: "10 horas extra al precio de la hora normal",
    origen: { tipo: "recalculado", url: ET, detalle: "25.000 / 1.792 = 13,95 por hora. 10 horas: 139,50." },
    fecha: "2026-10-14",
    entrada: { bruto: 25000, jornadaAnual: 1792, horas: 10, recargo: 0, horasAnio: null },
    esperado: { hora: 13.95, horaExtra: 13.95, total: 139.5 },
  },
  {
    nombre: "Con un recargo de convenio del 25 %",
    origen: { tipo: "recalculado", detalle: "13,95 × 1,25 = 17,44 por hora. 10 horas: 174,40." },
    fecha: "2026-10-14",
    entrada: { bruto: 25000, jornadaAnual: 1792, horas: 10, recargo: 25, horasAnio: 90 },
    esperado: { horaExtra: 17.44, total: 174.4 },
  },
]);
