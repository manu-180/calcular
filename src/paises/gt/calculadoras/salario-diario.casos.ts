import { definirCasos } from "@/motor/calculo";
import salarioDiario from "./salario-diario";

export default definirCasos(salarioDiario, [
  {
    nombre: "Q4,500 en jornada diurna",
    origen: { tipo: "recalculado", detalle: "4500 / 30 = 150 al día; 150 / 8 (CT art. 116) = 18.75 la hora; semana 1050; quincena 2250." },
    fecha: "2026-10-12",
    entrada: { salario: 4500, jornada: "diurna" },
    esperado: { quincenal: 2250, semanal: 1050, diario: 150, hora: 18.75, horas: 8 },
  },
  {
    nombre: "Jornada nocturna",
    origen: { tipo: "recalculado", detalle: "6000 / 30 / 6 = 33.33." },
    fecha: "2026-10-12",
    entrada: { salario: 6000, jornada: "nocturna" },
    esperado: { diario: 200, hora: 33.33, horas: 6 },
  },
]);
