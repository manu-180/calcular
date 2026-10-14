import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosPt: TextosUi<UiHipoteca> = {
  slug: "financiamento-imobiliario",
  ui: () => ({
    precio: "Valor do imóvel",
    entradaPorcentaje: "Entrada (% do valor)",
    entradaMonto: "Valor da entrada (opcional)",
    entradaMontoAyuda: "Se você preencher, ele vale no lugar da porcentagem.",
    tasa: "Taxa de juros anual (%)",
    anios: "Prazo em anos",
    gastos: "Gastos mensais da casa (opcional)",
    gastosAyuda: "Impostos do imóvel, seguro ou condomínio que você paga junto com o financiamento.",
    cuota: "Parcela mensal do financiamento",
    cuotaTotal: "Parcela com os gastos",
    entrada: "Entrada",
    prestado: "Valor financiado",
    intereses: "Total de juros",
    total: "Total das parcelas",
    tabla: "Ano a ano",
    colAnio: "Ano",
    colIntereses: "Juros pagos",
    colCapital: "Amortização",
    colSaldo: "Saldo devedor no fim do ano",
    errorPrecio: "Coloque o valor do imóvel.",
    errorEntrada: "A entrada cobre o valor inteiro, então não há financiamento para calcular. Diminua a entrada.",
    observacionPrestado: (porcentaje) => `Você financia ${porcentaje}% do valor do imóvel. Quanto maior essa parte, mais exigências o banco costuma fazer.`,
    observacionCostos: "Os custos de compra (escritura, impostos, avaliação) não estão incluídos. Separe esse dinheiro além da entrada.",
  }),
};
