import { definirCasos } from "@/motor/calculo";
import salarioDiario from "./salario-diario";

export default definirCasos(salarioDiario, [
  {
    nombre: "Jornada diurna con $240",
    origen: { tipo: "recalculado", detalle: "LOTTT art. 173 y Decreto 4.653 (mensual entre 30). 240 / 30 = 8; / 8 h = 1; semana 56; quincena 120." },
    fecha: "2026-10-12",
    entrada: { moneda: "USD", salario: 240, jornada: "diurna" },
    esperado: { horasJornada: 8, diarioUsd: 8, horaUsd: 1, semanalUsd: 56, quincenaUsd: 120, diarioBs: null },
  },
  {
    nombre: "Jornada mixta en bolívares",
    origen: { tipo: "recalculado", detalle: "Bs 4.500 / 30 = 150; / 7,5 h = 20; semana 1.050; quincena 2.250." },
    fecha: "2026-10-12",
    entrada: { moneda: "VES", salario: 4500, jornada: "mixta" },
    esperado: { horasJornada: 7.5, diarioBs: 150, horaBs: 20, semanalBs: 1050, quincenaBs: 2250 },
  },
  {
    nombre: "Jornada nocturna",
    origen: { tipo: "recalculado", detalle: "$210 / 30 = 7; / 7 h = 1." },
    fecha: "2026-10-12",
    entrada: { moneda: "USD", salario: 210, jornada: "nocturna" },
    esperado: { horasJornada: 7, diarioUsd: 7, horaUsd: 1 },
  },
]);
