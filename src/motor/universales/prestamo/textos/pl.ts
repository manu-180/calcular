import { pluralPl } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosPl: TextosUi<UiPrestamo> = {
  slug: "kalkulator-kredytowy",
  ui: () => ({
    monto: "Kwota kredytu",
    tasa: "Oprocentowanie roczne (%)",
    tasaAyuda: "Oprocentowanie nominalne z oferty. Nie obejmuje prowizji ani ubezpieczenia, które wliczają się do RRSO.",
    meses: "Okres kredytowania w miesiącach",
    extra: "Nadpłata co miesiąc (opcjonalnie)",
    extraAyuda: "Ile chcesz dopłacać co miesiąc, żeby spłacić kredyt szybciej. Cała kwota zmniejsza kapitał.",
    cuota: "Miesięczna rata",
    intereses: "Suma odsetek",
    total: "Łącznie do zapłaty",
    mesesReales: "Liczba miesięcy spłaty z nadpłatą",
    ahorro: "Zaoszczędzone odsetki",
    tabla: "Harmonogram spłat",
    colMes: "Miesiąc",
    colPago: "Rata",
    colInteres: "Odsetki",
    colCapital: "Kapitał",
    colSaldo: "Do spłaty",
    errorMonto: "Wpisz kwotę większą od zera.",
    observacionCostos: "Rata nie obejmuje ubezpieczenia, prowizji ani opłat, które może doliczyć bank. Przed podpisaniem umowy zapytaj o całkowity koszt kredytu i RRSO.",
    observacionExtra: (meses, ahorro) => `Z nadpłatą spłacisz kredyt w ${pluralPl(meses, "miesiąc", "miesiące", "miesięcy")} i zaoszczędzisz ${ahorro} na odsetkach.`,
  }),
};
