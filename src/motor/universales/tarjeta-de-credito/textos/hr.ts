import { pluralHr } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

const mjeseci = (n: string) => pluralHr(n, "mjesec", "mjeseca", "mjeseci");

export const textosHr: TextosUi<UiTarjetaDeCredito> = {
  slug: "otplata-kreditne-kartice",
  ui: () => ({
    saldo: "Dug na kartici",
    tasa: "Godišnja kamatna stopa (%)",
    tasaAyuda: "Kamatna stopa na kupnje nakon beskamatnog razdoblja. Piše na izvatku ili u ugovoru.",
    modo: "Kako ćete otplaćivati?",
    modoFijo: "Istim iznosom svakog mjeseca",
    modoMinimo: "Minimalnom uplatom",
    pagoFijo: "Fiksna mjesečna uplata",
    minimoPorcentaje: "Minimalna uplata (% duga)",
    minimoPorcentajeAyuda: "Koliko izdavatelj kartice traži svakog mjeseca. Ako niste sigurni, uobičajeno je 5 %.",
    minimoPiso: "Minimalna uplata nikad nije manja od",
    meses: "Broj mjeseci do otplate",
    intereses: "Plaćena kamata",
    total: "Ukupno plaćeno",
    primerPago: "Prva minimalna uplata",
    tabla: "Plan otplate po mjesecima",
    colMes: "Mjesec",
    colPago: "Uplata",
    colInteres: "Kamata",
    colCapital: "Glavnica",
    colSaldo: "Preostali dug",
    errorSaldo: "Unesite koliko dugujete na kartici.",
    errorFaltaPago: "Unesite koliko ćete uplaćivati svakog mjeseca.",
    errorNoCubre: (interes) => `S ovom se uplatom dug nikad ne smanjuje: samo kamata za prvi mjesec iznosi ${interes}. Povećajte uplatu.`,
    errorMuyLargo: "S ovom bi uplatom otplata trajala dulje od 50 godina. Povećajte uplatu.",
    observacionAnios: (anios, meses) => {
      const a = pluralHr(anios, "godina", "godine", "godina");
      return meses === "0" ? `Ukupno: ${a}.` : `Ukupno: ${a} i ${mjeseci(meses)}.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `Ako uvijek uplaćujete ${pago}, koliko iznosi i prva minimalna uplata, dug otplaćujete za ${mjeseci(meses)} i na kamati štedite ${ahorro}.`,
    observacionNoGastar: "Izračun pretpostavlja da tijekom otplate karticom ne kupujete ništa novo.",
  }),
};
