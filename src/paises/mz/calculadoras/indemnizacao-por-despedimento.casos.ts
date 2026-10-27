import { definirCasos } from "@/motor/calculo";
import indemnizacaoPorDespedimento from "./indemnizacao-por-despedimento";

const LT = "https://www.inss.gov.mz/wp-content/uploads/2025/09/NOVA-LEI-DO-TRABALHO-DE-25-DE-AGOSTO-DE-2023.pdf";

export default definirCasos(indemnizacaoPorDespedimento, [
  {
    nombre: "Até sete salários mínimos: 30 dias por ano",
    origen: { tipo: "recalculado", url: LT, detalle: "20 000 / 8 400 = 2,38 salários mínimos. Artigo 141, n.º 3, a): 30 dias por ano. 6 anos completos × 30 × 666,67 = 120 000." },
    fecha: "2026-10-26",
    entrada: { salario: 20000, minimo: 8400, admissao: "2020-03-01", cessacao: "2026-10-26" },
    esperado: { diasPorAno: 30, anos: 6, indemnizacao: 120000 },
  },
  {
    nombre: "Entre 7 e 18 salários mínimos: 15 dias por ano",
    origen: { tipo: "recalculado", url: LT, detalle: "100 000 / 10 000 = 10. Alínea b): 15 dias. 4 × 15 × 3 333,33 = 200 000." },
    fecha: "2026-10-26",
    entrada: { salario: 100000, minimo: 10000, admissao: "2022-05-02", cessacao: "2026-05-02" },
    esperado: { diasPorAno: 15, indemnizacao: 200000 },
  },
  {
    nombre: "Acima de 18 salários mínimos: 5 dias por ano",
    origen: { tipo: "recalculado", url: LT, detalle: "250 000 / 10 000 = 25. Alínea c): 5 dias. 10 × 5 × 8 333,33 = 416 666,67." },
    fecha: "2026-10-26",
    entrada: { salario: 250000, minimo: 10000, admissao: "2016-01-04", cessacao: "2026-02-10" },
    esperado: { diasPorAno: 5, anos: 10, indemnizacao: 416666.67 },
  },
  {
    nombre: "Exactamente sete salários mínimos fica no primeiro escalão",
    origen: { tipo: "recalculado", url: LT, detalle: "70 000 / 10 000 = 7, «entre um a sete»: 30 dias. 1 ano × 30 × 2 333,33 = 70 000." },
    fecha: "2026-10-26",
    entrada: { salario: 70000, minimo: 10000, admissao: "2025-01-01", cessacao: "2026-01-01" },
    esperado: { diasPorAno: 30, indemnizacao: 70000 },
  },
]);
