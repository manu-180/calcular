import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosPt: TextosUi<UiRendimientoInversion> = {
  slug: "calculadora-de-roi",
  ui: () => ({
    inicial: "Valor investido",
    final: "Valor final",
    finalAyuda: "Quanto o investimento vale hoje, ou quanto você recebeu ao vender.",
    cobrado: "Rendimentos recebidos no caminho (opcional)",
    cobradoAyuda: "Dividendos, juros ou aluguéis que você recebeu e não reinvestiu.",
    anios: "Anos de investimento",
    aniosAyuda: "Pode usar decimais para frações de ano, como um ano e meio.",
    ganancia: "Ganho",
    roi: "Retorno total (ROI)",
    cagr: "Rentabilidade anual (CAGR)",
    cagrAyuda: "A rentabilidade por ano que dá o mesmo resultado se for composta ano após ano.",
    errorInicial: "Coloque quanto você investiu no começo.",
    observacionCorto: "Em menos de um ano, a rentabilidade anual estica um resultado curto como se ele se repetisse o ano inteiro. Leia com cuidado.",
    observacionInflacion: "Para saber se você ganhou poder de compra, compare a rentabilidade anual com a inflação do mesmo período.",
  }),
};
