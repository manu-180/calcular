import { definirCasos } from "@/motor/calculo";
import revisaoPrestacaoEuribor from "./revisao-prestacao-euribor";

const BPSTAT = "https://bpstat.bportugal.pt/data/v1/domains/22/datasets/2829cb9155cb4f6ba6906db6b204c4bc/?lang=PT&series_ids=13168438&obs_since=2025-01-01";

export default definirCasos(revisaoPrestacaoEuribor, [
  {
    nombre: "Euribor a 6 meses de setembro de 2026 mais 1 % de spread",
    origen: {
      tipo: "recalculado",
      url: BPSTAT,
      detalle: "Euribor 6 meses, média de setembro de 2026: 2,9216 %. Taxa 3,9216 %. 150 000 a 300 meses: i = 0,03268 %/mês; prestação 785,28. Juros 785,28 × 300 − 150 000 = 85 584.",
    },
    fecha: "2026-10-14",
    entrada: { capital: 150000, anos: 25, indexante: "6m", spread: 1, euribor: null, prestacaoAtual: 700 },
    esperado: { euribor: 2.9216, prestacao: 785.28, diferenca: 85.28, juros: 85584, meses: 300 },
  },
  {
    nombre: "Euribor indicada à mão",
    origen: { tipo: "recalculado", detalle: "Taxa 3,5 %, 100 000 a 300 meses: prestação 500,62." },
    fecha: "2026-10-14",
    entrada: { capital: 100000, anos: 25, indexante: "12m", spread: 1, euribor: 2.5, prestacaoAtual: null },
    esperado: { prestacao: 500.62, taxa: 3.5 },
  },
  {
    nombre: "Euribor a 3 meses de setembro de 2026",
    origen: { tipo: "recalculado", url: BPSTAT, detalle: "2,635 % + 0,8 % = 3,435 %. 200 000 a 240 meses: 1153,25." },
    fecha: "2026-10-14",
    entrada: { capital: 200000, anos: 20, indexante: "3m", spread: 0.8, euribor: null, prestacaoAtual: null },
    esperado: { prestacao: 1153.25 },
  },
  {
    nombre: "Taxa negativa fica em zero",
    origen: { tipo: "recalculado", detalle: "−1 % + 0,5 % < 0: taxa 0. 60 000 / 120 = 500." },
    fecha: "2026-10-14",
    entrada: { capital: 60000, anos: 10, indexante: "12m", spread: 0.5, euribor: -1, prestacaoAtual: null },
    esperado: { prestacao: 500, taxa: 0 },
  },
]);
