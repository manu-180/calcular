import { definirCasos } from "@/motor/calculo";
import horasExtraordinarias from "./horas-extraordinarias";

const LT = "https://www.inss.gov.mz/wp-content/uploads/2025/09/NOVA-LEI-DO-TRABALHO-DE-25-DE-AGOSTO-DE-2023.pdf";

export default definirCasos(horasExtraordinarias, [
  {
    nombre: "30 000 MT, 8 horas até às 20h e 2 depois",
    origen: { tipo: "recalculado", url: LT, detalle: "Hora = 30 000 × 12 / (52 × 48) = 144,23. Artigo 125: 8 × 144,23 × 1,5 = 1 730,77 e 2 × 144,23 × 2 = 576,92. Total 2 307,69." },
    fecha: "2026-10-26",
    entrada: { salario: 30000, horasSemanais: 48, horasDia: 8, horasNoite: 2 },
    esperado: { hora: 144.23, dia: 1730.77, noite: 576.92, total: 2307.69 },
  },
  {
    nombre: "Semana de 45 horas",
    origen: { tipo: "recalculado", url: LT, detalle: "Hora = 45 000 × 12 / (52 × 45) = 230,77. 10 horas × 1,5 = 3 461,54." },
    fecha: "2026-10-26",
    entrada: { salario: 45000, horasSemanais: 45, horasDia: 10, horasNoite: 0 },
    esperado: { total: 3461.54 },
  },
]);
