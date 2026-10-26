import { pluralPl } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

const miesiecy = (n: string) => pluralPl(n, "miesiąc", "miesiące", "miesięcy");

export const textosPl: TextosUi<UiTarjetaDeCredito> = {
  slug: "kalkulator-karty-kredytowej",
  ui: () => ({
    saldo: "Zadłużenie na karcie",
    tasa: "Oprocentowanie roczne (%)",
    tasaAyuda: "Oprocentowanie transakcji bezgotówkowych. Znajdziesz je w umowie albo na wyciągu.",
    modo: "Jak będziesz spłacać?",
    modoFijo: "Stałą kwotą co miesiąc",
    modoMinimo: "Spłatą minimalną",
    pagoFijo: "Stała miesięczna spłata",
    minimoPorcentaje: "Spłata minimalna (% zadłużenia)",
    minimoPorcentajeAyuda: "Ile bank wymaga co miesiąc. Jeśli nie wiesz, często jest to 5%.",
    minimoPiso: "Spłata minimalna nigdy nie niższa niż",
    meses: "Liczba miesięcy do spłaty",
    intereses: "Odsetki, które zapłacisz",
    total: "Łącznie do zapłaty",
    primerPago: "Pierwsza spłata minimalna",
    tabla: "Plan spłaty miesiąc po miesiącu",
    colMes: "Miesiąc",
    colPago: "Spłata",
    colInteres: "Odsetki",
    colCapital: "Kapitał",
    colSaldo: "Zadłużenie",
    errorSaldo: "Wpisz kwotę zadłużenia na karcie.",
    errorFaltaPago: "Wpisz, ile będziesz spłacać co miesiąc.",
    errorNoCubre: (interes) => `Przy takiej spłacie zadłużenie nigdy nie spada: same odsetki z pierwszego miesiąca to ${interes}. Zwiększ spłatę.`,
    errorMuyLargo: "Przy takiej spłacie spłata trwałaby ponad 50 lat. Zwiększ miesięczną kwotę.",
    observacionAnios: (anios, meses) => {
      const a = pluralPl(anios, "rok", "lata", "lat");
      const m = meses === "0" ? "" : ` i ${miesiecy(meses)}`;
      return `To ${a}${m}.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `Jeśli zawsze spłacasz ${pago}, czyli tyle co pierwsza spłata minimalna, skończysz w ${miesiecy(meses)} i zaoszczędzisz ${ahorro} na odsetkach.`,
    observacionNoGastar: "Kalkulator zakłada, że w czasie spłaty nie robisz kartą nowych zakupów.",
  }),
};
