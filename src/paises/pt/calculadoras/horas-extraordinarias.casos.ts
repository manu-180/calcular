import { definirCasos } from "@/motor/calculo";
import horasExtraordinarias from "./horas-extraordinarias";

const CT = "https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2009-34546475";

export default definirCasos(horasExtraordinarias, [
  {
    nombre: "10 horas em 5 dias úteis",
    origen: { tipo: "recalculado", url: CT, detalle: "Artigo 271.º: (1500 × 12) / (52 × 40) = 8,6538. Artigo 268.º: 5 × 1,25 + 5 × 1,375 = 13,125 horas pagas. 8,6538 × 13,125 = 113,58." },
    fecha: "2026-10-14",
    entrada: { retribuicao: 1500, horasSemana: 40, horasUteis: 10, diasUteis: 5, horasDescanso: 0, acimaDe100: false },
    esperado: { valorHora: 8.65, uteis: 113.58, total: 113.58 },
  },
  {
    nombre: "4 horas num feriado",
    origen: { tipo: "recalculado", url: CT, detalle: "8,6538 × 4 × 1,5 = 51,92." },
    fecha: "2026-10-14",
    entrada: { retribuicao: 1500, horasSemana: 40, horasUteis: 0, diasUteis: 0, horasDescanso: 4, acimaDe100: false },
    esperado: { descanso: 51.92, total: 51.92 },
  },
  {
    nombre: "Acima de 100 horas anuais",
    origen: { tipo: "recalculado", url: CT, detalle: "Artigo 268.º, n.º 2: 1000 × 12 / 2080 = 5,7692. Dia útil: 1 × 1,5 + 2 × 1,75 = 5 horas pagas = 28,85. Descanso: 2 × 2 = 4 horas pagas = 23,08." },
    fecha: "2026-10-14",
    entrada: { retribuicao: 1000, horasSemana: 40, horasUteis: 3, diasUteis: 1, horasDescanso: 2, acimaDe100: true },
    esperado: { uteis: 28.85, descanso: 23.08, total: 51.92 },
  },
  {
    nombre: "Horas sem dias",
    origen: { tipo: "recalculado", detalle: "Horas em dias úteis sem indicar os dias." },
    fecha: "2026-10-14",
    entrada: { retribuicao: 1000, horasSemana: 40, horasUteis: 3, diasUteis: 0, horasDescanso: 0, acimaDe100: false },
    esperaError: true,
  },
]);
