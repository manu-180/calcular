import { conVariantes } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

const base: TextosUi<UiPuntoDeEquilibrio> = {
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

const portugal = (): Partial<UiPuntoDeEquilibrio> => ({
  fijosAyuda: "O que paga mesmo sem vender nada: renda, salários fixos, contas, software.",
  variableAyuda: "O que lhe custa cada unidade vendida: material, mercadoria, comissões, portes.",
  facturacion: "Faturação para empatar",
  facturacionObjetivo: "Faturação para o lucro desejado",
  errorPrecio: "Indique o preço de venda de uma unidade.",
  errorMargen: "O custo variável é igual ou maior do que o preço: cada venda dá prejuízo e nunca chega a empatar. Reveja o preço ou o custo.",
  observacionRedondeo: "As unidades são arredondadas para cima, porque não é possível vender uma parte de uma unidade.",
});

export const textosPt = conVariantes(base, { "pt-PT": portugal });
