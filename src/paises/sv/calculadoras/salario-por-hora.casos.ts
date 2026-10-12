import { definirCasos } from "@/motor/calculo";
import salarioPorHora from "./salario-por-hora";

export default definirCasos(salarioPorHora, [
  {
    nombre: "Salario mínimo de comercio por hora",
    origen: {
      tipo: "recalculado",
      url: "https://www.jurisprudencia.gob.sv/DocumentosBoveda/D/2/2020-2029/2025/05/10A4DA.PDF",
      detalle: "El D.E. 11/2025 publica $1.680 por hora ordinaria para comercio y servicios. 408,80 / 30 = 13,6267 por día; / 8 = 1,70 (el decreto usa el diario de 13,44, que da 1,68).",
    },
    fecha: "2026-10-12",
    entrada: { monto: 408.8, periodo: "mensual", jornada: "diurna" },
    esperado: { diario: 13.63, hora: 1.7, semanal: 95.39 },
  },
  {
    nombre: "Jornada nocturna con $300 por quincena",
    origen: { tipo: "recalculado", detalle: "300 / 15 = 20 por día; / 7 horas = 2,86. Mes 600; año 7.200." },
    fecha: "2026-10-12",
    entrada: { monto: 300, periodo: "quincenal", jornada: "nocturna" },
    esperado: { diario: 20, hora: 2.86, mensual: 600, anual: 7200 },
  },
]);
