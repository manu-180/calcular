import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosPt: TextosUi<UiFondoDeEmergencia> = {
  slug: "reserva-de-emergencia",
  ui: () => ({
    gastos: "Gastos essenciais por mês",
    gastosAyuda: "O que você não pode deixar de pagar: moradia, comida, contas da casa, transporte, saúde e parcelas de dívidas.",
    meses: "Meses de gastos a cobrir",
    mesesAyuda: "De 3 a 6 meses se a sua renda é estável. Mais se ela varia ou se a casa vive de uma renda só.",
    actual: "O que você já tem separado (opcional)",
    aporte: "Quanto você consegue guardar por mês (opcional)",
    meta: "Reserva de emergência recomendada",
    falta: "Ainda falta guardar",
    mesesParaLlegar: "Meses para completar",
    cobertura: "Meses que a sua reserva cobre hoje",
    errorGastos: "Coloque os seus gastos essenciais de um mês.",
    yaCubierto: "A sua reserva está completa. O que guardar daqui em diante pode ir para outras metas.",
    sinAporte: "Coloque quanto consegue guardar por mês e mostramos quanto tempo leva.",
    observacionDonde: "Guarde numa conta separada, que você possa sacar no mesmo dia e que não perca valor, como uma aplicação de liquidez diária.",
  }),
};
