import { definirCasos } from "@/motor/calculo";
import compensacaoPorDespedimento from "./compensacao-por-despedimento";

const LGT = "https://faolex.fao.org/docs/pdf/ang223057.pdf";

export default definirCasos(compensacaoPorDespedimento, [
  {
    nombre: "Causas objectivas com 8 anos e 7 meses",
    origen: {
      tipo: "recalculado",
      url: LGT,
      detalle: "Artigo 311.º: 7 meses contam como ano, 9 anos. Artigo 308.º: 350 000 × 5 + 50 % × 350 000 × 4 = 2 450 000.",
    },
    fecha: "2026-10-24",
    entrada: { motivo: "objectivo", salarioBase: 350000, admissao: "2018-03-01", cessacao: "2026-10-24" },
    esperado: { anos: 9, valor: 2450000, tempo: "8 anos e 7 meses" },
  },
  {
    nombre: "Fracção de 2 meses não conta",
    origen: { tipo: "recalculado", url: LGT, detalle: "3 anos e 2 meses: a fracção é inferior a 3 meses. 200 000 × 3 = 600 000." },
    fecha: "2026-10-24",
    entrada: { motivo: "objectivo", salarioBase: 200000, admissao: "2023-08-15", cessacao: "2026-10-24" },
    esperado: { anos: 3, valor: 600000 },
  },
  {
    nombre: "Caducidade ou insolvência",
    origen: { tipo: "recalculado", url: LGT, detalle: "Artigo 307.º: 50 % × 350 000 × 9 = 1 575 000." },
    fecha: "2026-10-24",
    entrada: { motivo: "caducidade", salarioBase: 350000, admissao: "2018-03-01", cessacao: "2026-10-24" },
    esperado: { valor: 1575000 },
  },
  {
    nombre: "Despedimento ilícito com 1 ano: mínimo de 3 salários",
    origen: { tipo: "recalculado", url: LGT, detalle: "Artigo 310.º: 200 000 × 1 = 200 000, abaixo do mínimo de 3 × 200 000 = 600 000." },
    fecha: "2026-10-24",
    entrada: { motivo: "ilicito", salarioBase: 200000, admissao: "2025-09-01", cessacao: "2026-10-24" },
    esperado: { anos: 1, valor: 600000 },
  },
  {
    nombre: "Não reintegração com 6 anos e 8 meses",
    origen: { tipo: "recalculado", url: LGT, detalle: "Dia 5 antes do dia 10: 80 meses, 6 anos e 8 meses, 7 anos. Artigo 309.º: 50 % × 300 000 × 7 = 1 050 000." },
    fecha: "2026-10-24",
    entrada: { motivo: "nao-reintegracao", salarioBase: 300000, admissao: "2020-01-10", cessacao: "2026-10-05" },
    esperado: { anos: 7, valor: 1050000 },
  },
  {
    nombre: "Datas trocadas",
    origen: { tipo: "recalculado", url: LGT, detalle: "A cessação antes da admissão dá erro." },
    fecha: "2026-10-24",
    entrada: { motivo: "objectivo", salarioBase: 200000, admissao: "2026-10-01", cessacao: "2026-01-01" },
    esperaError: true,
  },
]);
