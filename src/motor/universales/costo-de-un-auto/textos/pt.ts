import type { TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

export const textosPt: TextosUi<UiCostoDeUnAuto> = {
  slug: "custo-de-manter-um-carro",
  ui: () => ({
    precio: "Valor do carro",
    precioAyuda: "O que você pagou, ou quanto ele vale hoje se já tem o carro há algum tempo.",
    depreciacion: "Valor perdido por ano (%)",
    depreciacionAyuda: "Um carro novo perde de 15% a 25% no primeiro ano. Um usado, menos.",
    cuota: "Parcela mensal do financiamento (opcional)",
    cuotaAyuda: "Só para mostrar o que sai da sua conta por mês. Não entra no custo real.",
    seguro: "Seguro por mês",
    distanciaKm: "Quilômetros por mês",
    distanciaMi: "Milhas por mês",
    consumoL100: "Consumo (litros a cada 100 km)",
    consumoMpg: "Consumo (milhas por galão)",
    precioLitro: "Preço do litro de combustível",
    precioGalon: "Preço do galão de combustível",
    mantenimiento: "Manutenção por mês",
    mantenimientoAyuda: "Revisões, pneus, consertos e lavagens, em média por mês.",
    estacionamiento: "Estacionamento por mês (opcional)",
    otros: "Impostos, pedágios e outros gastos por mês (opcional)",
    otrosAyuda: "Impostos anuais do veículo, inspeções, pedágios e multas, em média por mês.",
    costoMensual: "Custo real por mês",
    costoAnual: "Custo real por ano",
    porKm: "Custo por quilômetro",
    porMilla: "Custo por milha",
    combustible: "Combustível por mês",
    depreciacionMensual: "Valor perdido por mês",
    gastoBolsillo: "O que sai da sua conta por mês",
    errorConsumo: "Coloque o consumo do carro para calcular o gasto com combustível.",
    observacionCuota:
      "A parcela do financiamento não entra no custo real porque uma parte dela paga o próprio carro, que já está contado como valor perdido. Os juros do financiamento são um custo a mais.",
  }),
};
