import { textosConSuiza } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

const textos: TextosUi<UiDescuento> = {
  slug: "rabattrechner",
  ui: () => ({
    precio: "Ursprünglicher Preis",
    descuento: "Rabatt (%)",
    segundoDescuento: "Zusätzlicher Rabatt (%)",
    segundoDescuentoAyuda: "Gibt es auf den reduzierten Preis noch einen Rabatt, tragen Sie ihn hier ein.",
    ahorro: "Ersparnis",
    final: "Endpreis",
    descuentoTotal: "Rabatt insgesamt",
    errorMayorA100: "Ein Rabatt kann nicht höher als 100 % sein.",
    observacionDoble: (efectivo) => `Zwei Rabatte nacheinander werden nicht einfach addiert. Zusammen sparen Sie ${efectivo} %.`,
  }),
};

export const textosDe = textosConSuiza(textos);
