import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosPt: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "ponto-de-equilibrio",
  ui: () => ({
    fijos: "Custos fixos por mês",
    fijosAyuda: "O que você paga mesmo sem vender nada: aluguel, salários fixos, contas, sistemas.",
    precio: "Preço de venda por unidade",
    variable: "Custo variável por unidade",
    variableAyuda: "O que cada unidade vendida custa para você: material, mercadoria, comissões, frete.",
    objetivo: "Lucro desejado por mês (opcional)",
    objetivoAyuda: "Para ver quanto vender além de cobrir os custos.",
    unidades: "Unidades para empatar",
    facturacion: "Faturamento para empatar",
    contribucion: "Margem de contribuição por unidade",
    contribucionAyuda: "O que cada venda deixa para pagar os custos fixos: preço menos custo variável.",
    contribucionPct: "Margem de contribuição (%)",
    unidadesObjetivo: "Unidades para o lucro desejado",
    facturacionObjetivo: "Faturamento para o lucro desejado",
    errorPrecio: "Coloque o preço de venda de uma unidade.",
    errorMargen: "O custo variável é igual ou maior que o preço: cada venda dá prejuízo e você nunca empata. Revise o preço ou o custo.",
    observacionRedondeo: "As unidades são arredondadas para cima, porque não dá para vender uma parte de uma unidade.",
  }),
};
