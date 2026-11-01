import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosCs: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "bod-zvratu",
  ui: () => ({
    fijos: "Fixní náklady za měsíc",
    fijosAyuda: "Co platíte, i když nic neprodáte: nájem, pevné mzdy, energie, software.",
    precio: "Prodejní cena za kus",
    variable: "Variabilní náklady na kus",
    variableAyuda: "Kolik vás stojí každý prodaný kus: materiál, zboží, provize, doprava.",
    objetivo: "Cílový zisk za měsíc (nepovinné)",
    objetivoAyuda: "Abyste viděli, kolik prodat navíc k pokrytí nákladů.",
    unidades: "Počet kusů pro bod zvratu",
    facturacion: "Tržby pro bod zvratu",
    contribucion: "Příspěvek na úhradu na kus",
    contribucionAyuda: "Kolik každý prodej nechá na fixní náklady: cena minus variabilní náklady.",
    contribucionPct: "Příspěvek na úhradu (%)",
    unidadesObjetivo: "Počet kusů pro cílový zisk",
    facturacionObjetivo: "Tržby pro cílový zisk",
    errorPrecio: "Zadejte prodejní cenu jednoho kusu.",
    errorMargen:
      "Variabilní náklady jsou stejné nebo vyšší než cena: na každém prodeji proděláváte a bodu zvratu nikdy nedosáhnete. Zkontrolujte cenu nebo náklady.",
    observacionRedondeo: "Počet kusů se zaokrouhluje nahoru, protože část kusu prodat nelze.",
  }),
};
