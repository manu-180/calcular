import { conVariantes } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

const base: TextosUi<UiMetaDeAhorro> = {
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

const portugal = (): Partial<UiMetaDeAhorro> => ({
  meta: "Quanto quer juntar?",
  actual: "O que já tem poupado (opcional)",
  rendimiento: "Rendimento anual das poupanças (%, opcional)",
  rendimientoAyuda: "Se o dinheiro está numa conta ou investimento que rende juros. Deixe em branco se não rende nada.",
  aporteMensual: "Precisa de poupar por mês",
  aporteSemanal: "Por semana, isso dá",
  totalAportado: "Total que vai poupar",
  errorMeta: "Indique quanto quer juntar.",
  yaLlegas: "O que já tem chega para a meta nesse prazo, sem precisar de poupar mais.",
});

export const textosPt = conVariantes(base, { "pt-PT": portugal });
