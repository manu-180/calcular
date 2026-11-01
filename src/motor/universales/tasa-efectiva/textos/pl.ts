import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosPl: TextosUi<UiTasaEfectiva> = {
  slug: "kalkulator-oprocentowania-efektywnego",
  ui: () => ({
    direccion: "Jakie oprocentowanie znasz?",
    nominalAEfectiva: "Nominalne (przelicz na efektywne)",
    efectivaANominal: "Efektywne (przelicz na nominalne)",
    tasa: "Oprocentowanie roczne (%)",
    tasaAyuda: "Wpisz je dokładnie tak, jak jest podane w ofercie albo w umowie.",
    capitalizacion: "Kapitalizacja odsetek",
    capitalizacionAyuda: "Jak często odsetki są dopisywane do salda. Przy kredytach i kartach zwykle co miesiąc.",
    mensual: "Miesięczna (12 razy w roku)",
    trimestral: "Kwartalna (4 razy w roku)",
    semestral: "Półroczna (2 razy w roku)",
    diaria: "Dzienna (365 razy w roku)",
    efectiva: "Efektywna stopa roczna",
    nominal: "Nominalna stopa roczna",
    periodica: "Stopa za okres",
    errorNegativa: "Oprocentowanie nie może być ujemne. Wpisz liczbę od 0 w górę.",
    observacionDiferencia: (puntos) => `Stopa efektywna jest o ${puntos} pkt proc. wyższa od nominalnej, bo odsetki też zarabiają odsetki.`,
  }),
};
