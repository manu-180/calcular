import type { TextosUi } from "../../tipos";
import { duracionPt } from "../../dias-entre-fechas/textos/pt";
import type { UiEdad } from "../definicion";

export const textosPt: TextosUi<UiEdad> = {
  slug: "calcular-idade",
  ui: () => ({
    nacimiento: "Data de nascimento",
    referencia: "Idade em",
    referenciaAyuda: "Por padrão é hoje. Mude para ver a idade em outra data.",
    edad: "Idade",
    anios: "Anos completos",
    totalMeses: "Em meses",
    totalSemanas: "Em semanas",
    totalDias: "Em dias",
    proximo: "Próximo aniversário",
    faltan: "Faltam (dias)",
    cumplira: "Vai fazer",
    duracion: duracionPt,
    errorFutura: "A data de nascimento não pode ser depois da data consultada.",
    cumpleHoy: (anios) => `Hoje é o aniversário: ${anios} anos.`,
    nota29: "Para quem nasceu em 29 de fevereiro, o aniversário conta em 28 de fevereiro nos anos que não são bissextos.",
  }),
};
