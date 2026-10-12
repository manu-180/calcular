import { definirCasos } from "@/motor/calculo";
import descanso from "./descanso-semanal";

export default definirCasos(descanso, [
  {
    nombre: "Un domingo de ocho horas con $600",
    origen: {
      tipo: "recalculado",
      url: "https://www.jurisprudencia.gob.sv/DocumentosBoveda/D/2/1970-1979/1972/07/886E0.PDF",
      detalle: "Art. 175: 50 % más por las horas. Hora 600 / 30 / 8 = 2,50. 8 horas = 20; recargo 10; total 30 y un día compensatorio.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 600, horas: 8, veces: 1 },
    esperado: { hora: 2.5, pagoHoras: 20, recargo: 10, total: 30, compensatorios: 1 },
  },
  {
    nombre: "Dos descansos de cinco horas con el mínimo de comercio",
    origen: { tipo: "recalculado", detalle: "Hora 1,7033 × 10 = 17,03; recargo 8,52; total 25,55." },
    fecha: "2026-10-12",
    entrada: { salario: 408.8, horas: 5, veces: 2 },
    esperado: { pagoHoras: 17.03, recargo: 8.52, total: 25.55, compensatorios: 2 },
  },
]);
