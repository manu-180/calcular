import { definirCasos } from "@/motor/calculo";
import periodoProbatorio from "./periodo-probatorio";

const LT = "https://www.inss.gov.mz/wp-content/uploads/2025/09/NOVA-LEI-DO-TRABALHO-DE-25-DE-AGOSTO-DE-2023.pdf";

export default definirCasos(periodoProbatorio, [
  {
    nombre: "Tempo indeterminado, regra geral",
    origen: { tipo: "recalculado", url: LT, detalle: "Artigo 48, n.º 1: até dois meses. Início a 1/11/2026, último dia 31/12/2026." },
    fecha: "2026-10-26",
    entrada: { contrato: "indeterminado", funcao: "geral", duracao: null, inicio: "2026-11-01" },
    esperado: { fim: "2026-12-31", duracao: "2 meses" },
  },
  {
    nombre: "Técnico superior",
    origen: { tipo: "recalculado", url: LT, detalle: "Artigo 48, n.º 1, b): seis meses. Início a 15/1/2026, último dia 14/7/2026." },
    fecha: "2026-10-26",
    entrada: { contrato: "indeterminado", funcao: "superior", duracao: null, inicio: "2026-01-15" },
    esperado: { fim: "2026-07-14" },
  },
  {
    nombre: "Prazo certo de nove meses",
    origen: { tipo: "recalculado", url: LT, detalle: "Artigo 48, n.º 2, b): um mês. Início a 1/3/2026, último dia 31/3/2026." },
    fecha: "2026-10-26",
    entrada: { contrato: "prazo", funcao: null, duracao: 9, inicio: "2026-03-01" },
    esperado: { fim: "2026-03-31", duracao: "1 mês" },
  },
  {
    nombre: "Prazo certo de quatro meses",
    origen: { tipo: "recalculado", url: LT, detalle: "Artigo 48, n.º 2, c): 15 dias. Início a 1/3/2026, último dia 15/3/2026." },
    fecha: "2026-10-26",
    entrada: { contrato: "prazo", funcao: null, duracao: 4, inicio: "2026-03-01" },
    esperado: { fim: "2026-03-15", duracao: "15 dias" },
  },
]);
