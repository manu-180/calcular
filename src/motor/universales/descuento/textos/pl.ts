import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosPl: TextosUi<UiDescuento> = {
  slug: "kalkulator-rabatu",
  ui: () => ({
    precio: "Cena przed rabatem",
    descuento: "Rabat (%)",
    segundoDescuento: "Dodatkowy rabat (%)",
    segundoDescuentoAyuda: "Jeśli do obniżonej ceny dochodzi jeszcze jeden rabat, wpisz go tutaj.",
    ahorro: "Oszczędzasz",
    final: "Cena po rabacie",
    descuentoTotal: "Łączny rabat",
    errorMayorA100: "Rabat nie może być wyższy niż 100%.",
    observacionDoble: (efectivo) => `Dwa rabaty po kolei nie sumują się: razem obniżają cenę o ${efectivo}%.`,
  }),
};
