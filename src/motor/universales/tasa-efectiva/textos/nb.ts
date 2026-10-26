import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosNb: TextosUi<UiTasaEfectiva> = {
  slug: "effektiv-rente",
  ui: () => ({
    direccion: "Hvilken rente har du?",
    nominalAEfectiva: "Nominell rente (regn om til effektiv)",
    efectivaANominal: "Effektiv rente (regn om til nominell)",
    tasa: "Rente per år (%)",
    tasaAyuda: "Skriv den slik den står i tilbudet eller avtalen.",
    capitalizacion: "Hvor ofte renten legges til",
    capitalizacionAyuda: "Hvor ofte renten legges til gjelden eller saldoen. Lån og kredittkort beregner som regel renter hver måned.",
    mensual: "Hver måned (12 ganger i året)",
    trimestral: "Hvert kvartal (4 ganger i året)",
    semestral: "Hvert halvår (2 ganger i året)",
    diaria: "Hver dag (365 ganger i året)",
    efectiva: "Effektiv rente per år",
    nominal: "Nominell rente per år",
    periodica: "Rente per periode",
    errorNegativa: "Renten kan ikke være negativ. Skriv inn et tall fra 0 og oppover.",
    observacionDiferencia: (puntos) => `Den effektive renten er ${puntos} prosentpoeng høyere enn den nominelle, fordi rentene også gir renter.`,
  }),
};
