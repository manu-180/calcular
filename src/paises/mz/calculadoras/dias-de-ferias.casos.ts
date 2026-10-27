import { definirCasos } from "@/motor/calculo";
import diasDeFerias from "./dias-de-ferias";

const LT = "https://www.inss.gov.mz/wp-content/uploads/2025/09/NOVA-LEI-DO-TRABALHO-DE-25-DE-AGOSTO-DE-2023.pdf";

export default definirCasos(diasDeFerias, [
  {
    nombre: "Primeiro ano de trabalho",
    origen: { tipo: "recalculado", url: LT, detalle: "Artigo 108, n.º 1: 12 dias no primeiro ano de trabalho efectivo. De 6/1/2025 a 15/12/2025 vão 11 meses." },
    fecha: "2026-10-26",
    entrada: { contrato: "normal", admissao: "2025-01-06", referencia: "2025-12-15" },
    esperado: { dias: 12, anos: 0, meses: 11 },
  },
  {
    nombre: "Três anos de casa",
    origen: { tipo: "recalculado", url: LT, detalle: "Artigo 108, n.º 1: 30 dias nos anos seguintes ao primeiro." },
    fecha: "2026-10-26",
    entrada: { contrato: "normal", admissao: "2023-01-10", referencia: "2026-10-26" },
    esperado: { dias: 30, anos: 3 },
  },
  {
    nombre: "Contrato a prazo de oito meses",
    origen: { tipo: "recalculado", url: LT, detalle: "Artigo 108, n.º 3: um dia por mês de serviço efectivo. De 1/1 a 15/8 vão 7 meses completos: 7 dias." },
    fecha: "2026-10-26",
    entrada: { contrato: "curto", admissao: "2026-01-01", referencia: "2026-08-15" },
    esperado: { dias: 7 },
  },
  {
    nombre: "Contrato curto com mais de um ano dá erro",
    origen: { tipo: "recalculado", url: LT, detalle: "O artigo 108, n.º 3 só cobre contratos de menos de um ano." },
    fecha: "2026-10-26",
    entrada: { contrato: "curto", admissao: "2024-03-01", referencia: "2026-08-15" },
    esperaError: true,
  },
]);
