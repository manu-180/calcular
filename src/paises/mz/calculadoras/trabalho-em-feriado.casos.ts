import { definirCasos } from "@/motor/calculo";
import trabalhoEmFeriado from "./trabalho-em-feriado";

const LT = "https://www.inss.gov.mz/wp-content/uploads/2025/09/NOVA-LEI-DO-TRABALHO-DE-25-DE-AGOSTO-DE-2023.pdf";

export default definirCasos(trabalhoEmFeriado, [
  {
    nombre: "Oito horas num feriado",
    origen: { tipo: "recalculado", url: LT, detalle: "Artigo 125, n.º 2: mais 100 %. 8 × 144,23 × 2 = 2 307,69. Artigo 98, n.º 4: mais de cinco horas dá um dia de descanso." },
    fecha: "2026-10-26",
    entrada: { salario: 30000, horasSemanais: 48, horas: 8 },
    esperado: { pagamento: 2307.69, descanso: "Um dia completo" },
  },
  {
    nombre: "Quatro horas ao domingo",
    origen: { tipo: "recalculado", url: LT, detalle: "4 × 144,23 × 2 = 1 153,85. Até cinco horas: meio dia de descanso." },
    fecha: "2026-10-26",
    entrada: { salario: 30000, horasSemanais: 48, horas: 4 },
    esperado: { pagamento: 1153.85, descanso: "Meio dia" },
  },
]);
