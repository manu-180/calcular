import type { TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

export const textosDe: TextosUi<UiCostoDeUnAuto> = {
  slug: "autokosten-rechner",
  ui: () => ({
    precio: "Wert des Autos",
    precioAyuda: "Was Sie bezahlt haben, oder was es heute wert ist, wenn Sie es schon länger fahren.",
    depreciacion: "Wertverlust pro Jahr (%)",
    depreciacionAyuda: "Ein Neuwagen verliert im ersten Jahr 15 bis 25 %. Ein Gebrauchter weniger.",
    cuota: "Monatliche Kreditrate (optional)",
    cuotaAyuda: "Nur um zu zeigen, was monatlich von Ihrem Konto abgeht. Sie zählt nicht zu den echten Kosten.",
    seguro: "Versicherung pro Monat",
    distanciaKm: "Kilometer pro Monat",
    distanciaMi: "Meilen pro Monat",
    consumoL100: "Verbrauch (Liter pro 100 km)",
    consumoMpg: "Verbrauch (Meilen pro Gallone)",
    precioLitro: "Spritpreis pro Liter",
    precioGalon: "Spritpreis pro Gallone",
    mantenimiento: "Wartung pro Monat",
    mantenimientoAyuda: "Inspektion, Reifen, Reparaturen und Wäsche, auf den Monat gerechnet.",
    estacionamiento: "Parken pro Monat (optional)",
    otros: "Steuer, Maut und sonstige Kosten pro Monat (optional)",
    otrosAyuda: "Kfz-Steuer, Hauptuntersuchung, Vignette oder Maut und Strafzettel, auf den Monat gerechnet.",
    costoMensual: "Echte Kosten pro Monat",
    costoAnual: "Echte Kosten pro Jahr",
    porKm: "Kosten pro Kilometer",
    porMilla: "Kosten pro Meile",
    combustible: "Sprit pro Monat",
    depreciacionMensual: "Wertverlust pro Monat",
    gastoBolsillo: "Was monatlich vom Konto abgeht",
    errorConsumo: "Geben Sie den Verbrauch Ihres Autos ein, um die Spritkosten zu berechnen.",
    observacionCuota:
      "Die Kreditrate zählt nicht zu den echten Kosten, weil ein Teil davon das Auto selbst bezahlt, und das ist schon als Wertverlust erfasst. Die Kreditzinsen kommen als Kosten noch dazu.",
  }),
};
