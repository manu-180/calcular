import { definirCasos } from "@/motor/calculo";
import salarioPorHora from "./salario-por-hora";

export default definirCasos(salarioPorHora, [
  {
    nombre: "15,000 al mes en jornada diurna",
    origen: { tipo: "recalculado", detalle: "LFT art. 61: diurna de 8 horas. 500 / 8 = 62.50; doble 125; triple 187.50." },
    fecha: "2026-10-15",
    entrada: { sueldo: 15000, periodo: "mensual", jornada: "diurna" },
    esperado: { diario: 500, horas: 8, hora: 62.5, doble: 125, triple: 187.5 },
  },
  {
    nombre: "Jornada nocturna",
    origen: { tipo: "recalculado", detalle: "Nocturna de 7 horas: 500 / 7 = 71.43; doble 142.86; triple 214.29." },
    fecha: "2026-10-15",
    entrada: { sueldo: 3500, periodo: "semanal", jornada: "nocturna" },
    esperado: { horas: 7, hora: 71.43, doble: 142.86, triple: 214.29 },
  },
]);
