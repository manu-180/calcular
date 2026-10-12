import { definirCasos } from "@/motor/calculo";
import nocturnidad from "./nocturnidad";

export default definirCasos(nocturnidad, [
  {
    nombre: "Veinte horas nocturnas con $600",
    origen: {
      tipo: "recalculado",
      url: "https://www.jurisprudencia.gob.sv/DocumentosBoveda/D/2/1970-1979/1972/07/886E0.PDF",
      detalle: "Art. 168: 25 % de recargo. 600 / 30 / 8 = 2,50; noche 3,125. Recargo 0,625 × 20 = 12,50; total 62,50.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 600, horasNocturnas: 20 },
    esperado: { horaDiurna: 2.5, horaNocturna: 3.13, recargo: 12.5, totalNocturnas: 62.5 },
  },
  {
    nombre: "Salario mínimo de comercio, 56 horas de noche",
    origen: { tipo: "recalculado", detalle: "408,80 / 30 / 8 = 1,7033; recargo 0,4258 × 56 = 23,85; total 2,1292 × 56 = 119,23." },
    fecha: "2026-10-12",
    entrada: { salario: 408.8, horasNocturnas: 56 },
    esperado: { recargo: 23.85, totalNocturnas: 119.23 },
  },
]);
