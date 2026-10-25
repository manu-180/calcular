import { formaCs } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

// «o 1 procentní bod», «o 2 procentní body», «o 5 procentních bodů», «o 0,68 procentního bodu».
// Los puntos llegan formateados en cs-CZ («0,68»): se pasan a número para elegir la forma.
const bodu = (puntos: string) =>
  formaCs(Number(puntos.replace(/\s/g, "").replace(",", ".")), "procentní bod", "procentní body", "procentních bodů", "procentního bodu");

export const textosCs: TextosUi<UiTasaEfectiva> = {
  slug: "efektivni-urokova-sazba",
  ui: () => ({
    direccion: "Jakou sazbu máte?",
    nominalAEfectiva: "Nominální sazbu p. a. (převést na efektivní)",
    efectivaANominal: "Efektivní sazbu (převést na nominální)",
    tasa: "Roční sazba (%)",
    tasaAyuda: "Zadejte ji přesně tak, jak je uvedená v nabídce nebo ve smlouvě.",
    capitalizacion: "Připisování úroků",
    capitalizacionAyuda: "Jak často se úroky připisují k zůstatku. U úvěrů a kreditních karet obvykle každý měsíc.",
    mensual: "Měsíčně (12krát ročně)",
    trimestral: "Čtvrtletně (4krát ročně)",
    semestral: "Pololetně (2krát ročně)",
    diaria: "Denně (365krát ročně)",
    efectiva: "Efektivní roční sazba",
    nominal: "Nominální roční sazba (p. a.)",
    periodica: "Sazba za období",
    errorNegativa: "Sazba nemůže být záporná. Zadejte číslo od 0 výš.",
    observacionDiferencia: (puntos) => `Efektivní sazba je o ${puntos} ${bodu(puntos)} vyšší než nominální, protože se úročí i připsané úroky.`,
  }),
};
