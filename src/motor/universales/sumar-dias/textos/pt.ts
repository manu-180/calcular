import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosPt: TextosUi<UiSumarDias> = {
  slug: "somar-dias",
  ui: () => ({
    fecha: "Data inicial",
    operacion: "Operação",
    sumar: "Somar dias",
    restar: "Subtrair dias",
    dias: "Quantidade de dias",
    tipo: "Tipo de dias",
    corridos: "Dias corridos",
    habiles: "Dias úteis (de segunda a sexta)",
    resultado: "Data resultante",
    diaSemana: "Dia da semana",
    diasCorridos: "Total de dias corridos",
    nombresDias: ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"],
    errorDias: "A quantidade de dias tem que ser um número inteiro, de até 100 anos.",
    notaHabiles: "Os dias úteis pulam sábados e domingos, mas não os feriados. Se houver um no meio, some à parte.",
  }),
};
