import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosPt: TextosUi<UiVariacion> = {
  slug: "variacao-percentual",
  ui: () => ({
    inicial: "Valor inicial",
    final: "Valor final",
    variacion: "Variação percentual",
    diferencia: "Diferença",
    vuelta: "Para voltar ao valor inicial",
    vueltaAyuda: "Quanto o valor final teria que mudar para voltar ao valor de partida.",
    errorInicialCero: "O valor inicial não pode ser 0: não existe variação percentual a partir de zero.",
    subio: (p) => `Subiu ${p}%.`,
    bajo: (p) => `Caiu ${p}%.`,
    igual: "Sem variação: os dois valores são iguais.",
  }),
};
