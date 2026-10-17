import { conVariantes } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

const base: TextosUi<UiInteresSimple> = {
  slug: "juros-simples",
  ui: () => ({
    capital: "Capital",
    tasa: "Taxa de juros anual (%)",
    tiempo: "Prazo",
    unidad: "O prazo está em",
    dias: "Dias",
    meses: "Meses",
    anios: "Anos",
    base: "Dias no ano (para prazos em dias)",
    baseAyuda: "Alguns bancos contam o ano com 360 dias. Se não tiver certeza, deixe 365.",
    base365: "365 dias",
    base360: "360 dias (ano comercial)",
    interes: "Juros",
    montoFinal: "Montante (capital mais juros)",
    tasaPeriodo: "Taxa do período",
    errorCapital: "Coloque um capital maior que zero.",
  }),
};

const portugal = (): Partial<UiInteresSimple> => ({
  tasa: "Taxa de juro anual (%)",
  baseAyuda: "Alguns bancos contam o ano com 360 dias. Se não tiver a certeza, deixe 365.",
  errorCapital: "Indique um capital maior do que zero.",
});

export const textosPt = conVariantes(base, { "pt-PT": portugal });
