import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosNl: TextosUi<UiTasaEfectiva> = {
  slug: "effectieve-rente-berekenen",
  ui: () => ({
    direccion: "Welke rente heb je?",
    nominalAEfectiva: "Nominale rente (omrekenen naar effectieve rente)",
    efectivaANominal: "Effectieve rente (omrekenen naar nominale rente)",
    tasa: "Rente per jaar (%)",
    tasaAyuda: "Vul hem precies in zoals hij in de offerte of het contract staat.",
    capitalizacion: "Rentebijschrijving",
    capitalizacionAyuda: "Hoe vaak de rente bij het saldo wordt opgeteld. Bij leningen en creditcards is dat meestal elke maand.",
    mensual: "Per maand (12 keer per jaar)",
    trimestral: "Per kwartaal (4 keer per jaar)",
    semestral: "Per halfjaar (2 keer per jaar)",
    diaria: "Per dag (365 keer per jaar)",
    efectiva: "Effectieve jaarrente",
    nominal: "Nominale jaarrente",
    periodica: "Rente per periode",
    errorNegativa: "De rente kan niet negatief zijn. Vul een getal vanaf 0 in.",
    observacionDiferencia: (puntos) => `De effectieve rente is ${puntos} procentpunt hoger dan de nominale rente, omdat je ook rente over rente betaalt of krijgt.`,
  }),
};
