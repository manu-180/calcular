import { conVariantes } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

const base: TextosUi<UiFondoDeEmergencia> = {
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

const portugal = (): Partial<UiFondoDeEmergencia> => ({
  gastosAyuda: "O que não pode deixar de pagar: habitação, alimentação, contas da casa, transportes, saúde e prestações de dívidas.",
  mesesAyuda: "De 3 a 6 meses se o seu rendimento é estável. Mais se varia ou se a casa vive de um só rendimento.",
  actual: "O que já tem de parte (opcional)",
  aporte: "Quanto consegue poupar por mês (opcional)",
  meta: "Fundo de emergência recomendado",
  falta: "Ainda falta poupar",
  cobertura: "Meses que o seu fundo cobre hoje",
  errorGastos: "Indique os seus gastos essenciais de um mês.",
  yaCubierto: "O seu fundo está completo. O que poupar daqui em diante pode ir para outros objetivos.",
  sinAporte: "Indique quanto consegue poupar por mês e mostramos quanto tempo demora.",
  observacionDonde: "Guarde-o numa conta à parte, de onde possa levantar o dinheiro no próprio dia e que não perca valor, como uma conta poupança ou um depósito mobilizável.",
});

export const textosPt = conVariantes(base, { "pt-PT": portugal });
