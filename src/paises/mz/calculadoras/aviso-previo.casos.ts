import { definirCasos } from "@/motor/calculo";
import avisoPrevio from "./aviso-previo";

const LT = "https://www.inss.gov.mz/wp-content/uploads/2025/09/NOVA-LEI-DO-TRABALHO-DE-25-DE-AGOSTO-DE-2023.pdf";

export default definirCasos(avisoPrevio, [
  {
    nombre: "Dois anos de serviço: 15 dias",
    origen: { tipo: "recalculado", url: LT, detalle: "Artigo 140, n.º 3, a): mais de seis meses e até três anos, 15 dias. Aviso a 1/10/2026, cessação a 16/10/2026." },
    fecha: "2026-10-26",
    entrada: { caso: "trabalhador", admissao: "2024-09-01", aviso: "2026-10-01", saida: null, salario: 30000 },
    esperado: { prazo: 15, cessacao: "2026-10-16", falta: 0 },
  },
  {
    nombre: "Cinco anos e saída antecipada",
    origen: { tipo: "recalculado", url: LT, detalle: "Mais de três anos: 30 dias. Sai 10 dias depois do aviso: faltam 20 dias × 1 000 = 20 000 (artigo 140, n.º 5)." },
    fecha: "2026-10-26",
    entrada: { caso: "trabalhador", admissao: "2021-03-01", aviso: "2026-10-01", saida: "2026-10-11", salario: 30000 },
    esperado: { prazo: 30, falta: 20, compensacao: 20000 },
  },
  {
    nombre: "Quatro meses de casa: a lei não fixa prazo",
    origen: { tipo: "recalculado", url: LT, detalle: "O artigo 140, n.º 3 só cobre mais de seis meses de serviço." },
    fecha: "2026-10-26",
    entrada: { caso: "trabalhador", admissao: "2026-06-01", aviso: "2026-10-01", saida: null, salario: 30000 },
    esperado: { prazo: 0 },
  },
  {
    nombre: "Empregador por motivos económicos",
    origen: { tipo: "recalculado", url: LT, detalle: "Artigo 142, n.º 2: comunicação com pelo menos 30 dias. Aviso a 1/10/2026: cessação a 31/10/2026." },
    fecha: "2026-10-26",
    entrada: { caso: "empregador", admissao: null, aviso: "2026-10-01", saida: null, salario: 30000 },
    esperado: { prazo: 30, cessacao: "2026-10-31", compensacao: null },
  },
]);
