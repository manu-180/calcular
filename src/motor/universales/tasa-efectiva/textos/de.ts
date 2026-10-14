import { textosConSuiza } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

const textos: TextosUi<UiTasaEfectiva> = {
  slug: "effektivzins-rechner",
  ui: () => ({
    direccion: "Welchen Zinssatz kennen Sie?",
    nominalAEfectiva: "Nominalzins (in Effektivzins umrechnen)",
    efectivaANominal: "Effektivzins (in Nominalzins umrechnen)",
    tasa: "Zinssatz pro Jahr (%)",
    tasaAyuda: "Tragen Sie ihn genau so ein, wie er im Angebot oder Vertrag steht.",
    capitalizacion: "Zinsverrechnung",
    capitalizacionAyuda: "Wie oft die Zinsen dem Saldo gutgeschrieben oder belastet werden. Bei Krediten und Kreditkarten meist monatlich.",
    mensual: "Monatlich (12-mal im Jahr)",
    trimestral: "Vierteljährlich (4-mal im Jahr)",
    semestral: "Halbjährlich (2-mal im Jahr)",
    diaria: "Täglich (365-mal im Jahr)",
    efectiva: "Effektiver Jahreszins",
    nominal: "Nominaler Jahreszins",
    periodica: "Zinssatz pro Periode",
    errorNegativa: "Der Zinssatz kann nicht negativ sein. Geben Sie eine Zahl ab 0 ein.",
    observacionDiferencia: (puntos) => `Der Effektivzins liegt ${puntos} Prozentpunkte über dem Nominalzins, weil auch auf die Zinsen wieder Zinsen anfallen.`,
  }),
};

export const textosDe = textosConSuiza(textos);
