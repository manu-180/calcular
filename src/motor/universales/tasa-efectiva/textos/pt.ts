import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosPt: TextosUi<UiTasaEfectiva> = {
  slug: "taxa-nominal-e-efetiva",
  ui: () => ({
    direccion: "Que taxa você tem?",
    nominalAEfectiva: "Taxa nominal (converter em efetiva)",
    efectivaANominal: "Taxa efetiva (converter em nominal)",
    tasa: "Taxa anual (%)",
    tasaAyuda: "Coloque exatamente como aparece na proposta ou no contrato.",
    capitalizacion: "Capitalização",
    capitalizacionAyuda: "A cada quanto tempo os juros são somados ao saldo. Empréstimos e cartões costumam capitalizar todo mês.",
    mensual: "Mensal (12 vezes por ano)",
    trimestral: "Trimestral (4 vezes por ano)",
    semestral: "Semestral (2 vezes por ano)",
    diaria: "Diária (365 vezes por ano)",
    efectiva: "Taxa efetiva anual",
    nominal: "Taxa nominal anual",
    periodica: "Taxa por período",
    errorNegativa: "A taxa não pode ser negativa. Coloque um número a partir de 0.",
    observacionDiferencia: (puntos) => `A taxa efetiva fica ${puntos} pontos acima da nominal porque os juros também rendem juros.`,
  }),
};
