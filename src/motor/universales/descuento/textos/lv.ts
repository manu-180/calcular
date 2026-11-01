import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosLv: TextosUi<UiDescuento> = {
  slug: "atlaides-kalkulators",
  ui: () => ({
    precio: "Sākotnējā cena",
    descuento: "Atlaide (%)",
    segundoDescuento: "Papildu atlaide (%)",
    segundoDescuentoAyuda: "Ja tiek piemērota vēl viena atlaide, ievadiet to šeit.",
    ahorro: "Ietaupāt",
    final: "Cena ar atlaidi",
    descuentoTotal: "Kopējā atlaide",
    errorMayorA100: "Atlaide nevar būt lielāka par 100%.",
    observacionDoble: (efectivo) => `Divas atlaides pēc kārtas nesummējas: kopā tās samazina cenu par ${efectivo}%.`,
  }),
};
