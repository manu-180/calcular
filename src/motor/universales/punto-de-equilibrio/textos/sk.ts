import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosSk: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "bod-zvratu",
  ui: () => ({
    fijos: "Fixné náklady za mesiac",
    fijosAyuda: "Čo platíte, aj keď nič nepredáte: nájom, pevné mzdy, energie, softvér.",
    precio: "Predajná cena za kus",
    variable: "Variabilné náklady na kus",
    variableAyuda: "Koľko vás stojí každý predaný kus: materiál, tovar, provízie, doprava.",
    objetivo: "Cieľový zisk za mesiac (nepovinné)",
    objetivoAyuda: "Aby ste videli, koľko predať navyše k pokrytiu nákladov.",
    unidades: "Počet kusov pre bod zvratu",
    facturacion: "Tržby pre bod zvratu",
    contribucion: "Príspevok na úhradu na kus",
    contribucionAyuda: "Koľko každý predaj nechá na fixné náklady: cena mínus variabilné náklady.",
    contribucionPct: "Príspevok na úhradu (%)",
    unidadesObjetivo: "Počet kusov pre cieľový zisk",
    facturacionObjetivo: "Tržby pre cieľový zisk",
    errorPrecio: "Zadajte predajnú cenu jedného kusu.",
    errorMargen:
      "Variabilné náklady sú rovnaké alebo vyššie ako cena: na každom predaji prerábate a bod zvratu nikdy nedosiahnete. Skontrolujte cenu alebo náklady.",
    observacionRedondeo: "Počet kusov sa zaokrúhľuje nahor, pretože časť kusu predať nemožno.",
  }),
};
