import { definirCasos } from "@/motor/calculo";
import trabalhoNocturno from "./trabalho-nocturno";

const LT = "https://www.inss.gov.mz/wp-content/uploads/2025/09/NOVA-LEI-DO-TRABALHO-DE-25-DE-AGOSTO-DE-2023.pdf";

export default definirCasos(trabalhoNocturno, [
  {
    nombre: "40 horas nocturnas com 30 000 MT",
    origen: { tipo: "recalculado", url: LT, detalle: "Artigo 125, n.º 3: mais 25 %. Hora 144,23; acréscimo 40 × 36,06 = 1 442,31. Hora nocturna 180,29." },
    fecha: "2026-10-26",
    entrada: { salario: 30000, horasSemanais: 48, horas: 40 },
    esperado: { acrescimo: 1442.31, horaNocturna: 180.29 },
  },
]);
