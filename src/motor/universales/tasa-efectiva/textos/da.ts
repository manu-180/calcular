import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosDa: TextosUi<UiTasaEfectiva> = {
  slug: "effektiv-rente",
  ui: () => ({
    direccion: "Hvilken rente har du?",
    nominalAEfectiva: "Nominel rente (regn om til effektiv)",
    efectivaANominal: "Effektiv rente (regn om til nominel)",
    tasa: "Årlig rente (%)",
    tasaAyuda: "Skriv den, præcis som den står i tilbuddet eller aftalen.",
    capitalizacion: "Rentetilskrivning",
    capitalizacionAyuda: "Hvor tit renten lægges til gælden eller saldoen. Lån og kreditkort tilskriver oftest renter hver måned.",
    mensual: "Hver måned (12 gange om året)",
    trimestral: "Hvert kvartal (4 gange om året)",
    semestral: "Hvert halve år (2 gange om året)",
    diaria: "Hver dag (365 gange om året)",
    efectiva: "Effektiv årlig rente",
    nominal: "Nominel årlig rente",
    periodica: "Rente pr. periode",
    errorNegativa: "Renten kan ikke være negativ. Skriv et tal fra 0 og op.",
    observacionDiferencia: (puntos) => `Den effektive rente er ${puntos} procentpoint højere end den nominelle, fordi renterne også giver renter.`,
  }),
};
