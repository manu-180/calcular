import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosDe: TextosUi<UiInteresCompuesto> = {
  slug: "zinseszinsrechner",
  ui: () => ({
    capital: "Startkapital",
    aporte: "Monatliche Sparrate (optional)",
    aporteAyuda: "Was Sie jeden Monat dazulegen würden. Der Betrag kommt am Monatsende dazu.",
    tasa: "Zinssatz pro Jahr (%)",
    anios: "Jahre",
    capitalizacion: "Zinsgutschrift",
    anual: "Jährlich",
    semestral: "Halbjährlich",
    trimestral: "Vierteljährlich",
    mensual: "Monatlich",
    diaria: "Täglich",
    saldo: "Endkapital",
    aportado: "Eingezahlt insgesamt",
    intereses: "Erhaltene Zinsen",
    tabla: "Entwicklung Jahr für Jahr",
    colAnio: "Jahr",
    colAportado: "Einzahlungen",
    colIntereses: "Zinsen",
    colSaldo: "Kapital am Jahresende",
    errorSinDinero: "Geben Sie ein Startkapital oder eine monatliche Sparrate ein.",
    observacionIntereses: (porcentaje) => `${porcentaje} % des Endkapitals sind Zinsen.`,
  }),
};
