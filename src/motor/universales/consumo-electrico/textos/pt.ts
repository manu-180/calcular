import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosPt: TextosUi<UiConsumoElectrico> = {
  slug: "consumo-de-energia",
  ui: () => ({
    potencia: "Potência do aparelho (W)",
    potenciaAyuda: "Está na etiqueta ou no manual, em watts (W). Se estiver em kW, multiplique por 1000.",
    cantidad: "Quantidade de aparelhos iguais",
    horas: "Horas de uso por dia",
    dias: "Dias de uso por mês",
    precio: "Preço do kWh",
    precioAyuda: "Está na conta de luz: o valor por kWh, com impostos se quiser o custo completo.",
    kwhDia: "Consumo por dia (kWh)",
    kwhMes: "Consumo por mês (kWh)",
    kwhAnio: "Consumo por ano (kWh)",
    costoDia: "Custo por dia",
    costoMes: "Custo por mês",
    costoAnio: "Custo por ano",
    errorHoras: "Um dia tem 24 horas: o uso tem que ficar entre 0 e 24.",
  }),
};
