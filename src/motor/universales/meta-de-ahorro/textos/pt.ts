import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosPt: TextosUi<UiMetaDeAhorro> = {
  slug: "meta-financeira",
  ui: () => ({
    meta: "Quanto você quer juntar?",
    actual: "O que você já tem guardado (opcional)",
    meses: "Meses para chegar lá",
    rendimiento: "Rendimento anual do dinheiro guardado (%, opcional)",
    rendimientoAyuda: "Se o dinheiro fica numa conta ou investimento que rende juros. Deixe em branco se não rende nada.",
    aporteMensual: "Você precisa guardar por mês",
    aporteSemanal: "Por semana, isso dá",
    totalAportado: "Total que você vai guardar",
    intereses: "Juros ganhos",
    errorMeta: "Coloque quanto você quer juntar.",
    yaLlegas: "O que você já tem chega à meta nesse prazo sem precisar guardar mais.",
  }),
};
