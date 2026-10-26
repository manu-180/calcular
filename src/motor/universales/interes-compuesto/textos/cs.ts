import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosCs: TextosUi<UiInteresCompuesto> = {
  slug: "slozene-uroceni",
  ui: () => ({
    capital: "Počáteční vklad",
    aporte: "Měsíční vklad (nepovinné)",
    aporteAyuda: "Kolik budete každý měsíc přidávat. Vklad se připisuje na konci každého měsíce.",
    tasa: "Roční úroková sazba (%)",
    anios: "Počet let",
    capitalizacion: "Připisování úroků",
    anual: "Ročně",
    semestral: "Pololetně",
    trimestral: "Čtvrtletně",
    mensual: "Měsíčně",
    diaria: "Denně",
    saldo: "Konečná částka",
    aportado: "Vloženo celkem",
    intereses: "Získané úroky",
    tabla: "Růst po letech",
    colAnio: "Rok",
    colAportado: "Vklady",
    colIntereses: "Úroky",
    colSaldo: "Částka na konci roku",
    errorSinDinero: "Zadejte počáteční vklad nebo měsíční vklad.",
    observacionIntereses: (porcentaje) => `${porcentaje} % konečné částky tvoří úroky.`,
  }),
};
