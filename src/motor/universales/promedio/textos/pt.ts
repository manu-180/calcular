import { conVariantes } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

const base: TextosUi<UiPromedio> = {
  slug: "media-ponderada",
  ui: () => ({
    nota: (n) => `Nota ${n}`,
    notaAyuda: "Coloque cada nota ou valor com o seu peso. Deixe em branco as linhas que não usar.",
    peso: (n) => `Peso ${n}`,
    pesoAyuda: "Pode ser uma porcentagem, créditos ou quantas vezes conta. Sem pesos, todos os valores contam igual.",
    ponderado: "Média ponderada",
    simple: "Média simples",
    cantidad: "Valores",
    sumaPesos: "Soma dos pesos",
    errorSinNotas: "Coloque pelo menos um valor.",
    errorFaltaPeso: "Este valor está sem peso. Se usar pesos, preencha o de cada valor.",
    errorFaltaNota: "Este peso está sem valor. Preencha o valor ou apague o peso.",
    errorPesosCero: "Os pesos somam 0: pelo menos um precisa ser maior que zero.",
    sinPesos: "Sem pesos, a média ponderada é igual à simples.",
  }),
};

const portugal = (): Partial<UiPromedio> => ({
  notaAyuda: "Escreva cada nota ou valor com o seu peso. Deixe em branco as linhas que não usar.",
  pesoAyuda: "Pode ser uma percentagem, créditos ou quantas vezes conta. Sem pesos, todos os valores contam o mesmo.",
  errorSinNotas: "Indique pelo menos um valor.",
  errorPesosCero: "Os pesos somam 0: pelo menos um tem de ser maior do que zero.",
});

export const textosPt = conVariantes(base, { "pt-PT": portugal });
