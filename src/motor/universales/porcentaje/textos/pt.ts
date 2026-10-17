import { conVariantes } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

const base: TextosUi<UiPorcentaje> = {
  slug: "porcentagem",
  ui: () => ({
    modo: "O que você quer calcular?",
    modoParte: "Quanto é X% de Y?",
    modoProporcion: "X é quantos por cento de Y?",
    modoAumento: "Y mais X%",
    modoRebaja: "Y menos X%",
    x: "Número X",
    xAyuda: "É a porcentagem. Se você escolher “X é quantos por cento de Y?”, é a parte.",
    y: "Número Y",
    resultado: "Resultado",
    porcentaje: "Porcentagem",
    diferencia: "Valor somado ou descontado",
    errorYCero: "Y não pode ser 0: não existe porcentagem de zero.",
    fraseParte: (x, y, r) => `${x}% de ${y} é ${r}.`,
    fraseProporcion: (x, y, p) => `${x} é ${p}% de ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} mais ${x}% é ${r}: somam-se ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} menos ${x}% é ${r}: descontam-se ${d}.`,
  }),
};

const portugal = (): Partial<UiPorcentaje> => ({
  modo: "O que quer calcular?",
  xAyuda: "É a percentagem. Se escolher “X é quantos por cento de Y?”, é a parte.",
  porcentaje: "Percentagem",
  errorYCero: "Y não pode ser 0: não existe percentagem de zero.",
});

export const textosPt = conVariantes(base, { "pt-PT": portugal });
