import { pluralSr } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

const meseci = (n: string) => pluralSr(n, "mesec", "meseca", "meseci");

export const textosSr: TextosUi<UiTarjetaDeCredito> = {
  slug: "otplata-kreditne-kartice",
  ui: () => ({
    saldo: "Dug na kartici",
    tasa: "Godišnja kamatna stopa (%)",
    tasaAyuda: "Kamatna stopa na kupovinu posle beskamatnog perioda. Piše u izvodu ili u ugovoru.",
    modo: "Kako ćete otplaćivati?",
    modoFijo: "Istim iznosom svakog meseca",
    modoMinimo: "Minimalnom uplatom",
    pagoFijo: "Fiksna mesečna uplata",
    minimoPorcentaje: "Minimalna uplata (% duga)",
    minimoPorcentajeAyuda: "Koliko izdavalac kartice traži svakog meseca. Ako niste sigurni, uobičajeno je 5%.",
    minimoPiso: "Minimalna uplata nikad manja od",
    meses: "Broj meseci do otplate",
    intereses: "Plaćena kamata",
    total: "Ukupno plaćeno",
    primerPago: "Prva minimalna uplata",
    tabla: "Plan otplate po mesecima",
    colMes: "Mesec",
    colPago: "Uplata",
    colInteres: "Kamata",
    colCapital: "Glavnica",
    colSaldo: "Preostali dug",
    errorSaldo: "Unesite koliko dugujete na kartici.",
    errorFaltaPago: "Unesite koliko ćete uplaćivati svakog meseca.",
    errorNoCubre: (interes) => `Sa ovom uplatom dug nikad ne opada: samo kamata za prvi mesec iznosi ${interes}. Povećajte uplatu.`,
    errorMuyLargo: "Sa ovom uplatom otplata bi trajala duže od 50 godina. Povećajte uplatu.",
    observacionAnios: (anios, meses) => {
      const a = pluralSr(anios, "godina", "godine", "godina");
      return meses === "0" ? `Ukupno: ${a}.` : `Ukupno: ${a} i ${meseci(meses)}.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `Ako uvek uplaćujete ${pago}, koliko iznosi i prva minimalna uplata, dug otplaćujete za ${meseci(meses)} i na kamati štedite ${ahorro}.`,
    observacionNoGastar: "Obračun pretpostavlja da tokom otplate karticom ne kupujete ništa novo.",
  }),
};
