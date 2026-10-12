import { definirCasos } from "@/motor/calculo";
import asueto from "./dia-de-asueto";

export default definirCasos(asueto, [
  {
    nombre: "Un asueto trabajado con salario mínimo de comercio",
    origen: {
      tipo: "recalculado",
      url: "https://www.mtps.gob.sv/2026/03/23/voceria-oficial-informa-sobre-derechos-laborales-en-fechas-de-asueto/",
      detalle: "Art. 192: salario ordinario más 100 %. 408,80 / 30 = 13,6267; × 2 = 27,25.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 408.8, jornada: "diurna", diasAsueto: 1, horasExtra: 0 },
    esperado: { diario: 13.63, extraordinario: 27.25, total: 27.25 },
  },
  {
    nombre: "Tres días de Semana Santa con dos horas extra",
    origen: {
      tipo: "recalculado",
      detalle: "600 / 30 = 20; extraordinario 40 por día; 3 días = 120. Hora extraordinaria 40 / 8 = 5; hora extra 5 × 2 = 10; 2 horas = 20. Total 140.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 600, jornada: "diurna", diasAsueto: 3, horasExtra: 2 },
    esperado: { extraordinario: 40, horaExtra: 10, pagoExtra: 20, total: 140 },
  },
]);
