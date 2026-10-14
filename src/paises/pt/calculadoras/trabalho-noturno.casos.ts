import { definirCasos } from "@/motor/calculo";
import trabalhoNoturno from "./trabalho-noturno";

const CT = "https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2009-34546475";

export default definirCasos(trabalhoNoturno, [
  {
    nombre: "40 horas noturnas com 1 200 €",
    origen: { tipo: "recalculado", url: CT, detalle: "Hora: 1200 × 12 / (52 × 40) = 6,9231. Acréscimo de 25 % = 1,7308 por hora; × 40 = 69,23." },
    fecha: "2026-10-14",
    entrada: { retribuicao: 1200, horasSemana: 40, horasNoturnas: 40 },
    esperado: { valorHora: 6.92, acrescimoHora: 1.73, acrescimo: 69.23 },
  },
  {
    nombre: "Horário de 35 horas",
    origen: { tipo: "recalculado", url: CT, detalle: "1000 × 12 / (52 × 35) = 6,5934; 25 % = 1,6484; × 20 = 32,97." },
    fecha: "2026-10-14",
    entrada: { retribuicao: 1000, horasSemana: 35, horasNoturnas: 20 },
    esperado: { acrescimo: 32.97 },
  },
]);
