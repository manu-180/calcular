import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosNl: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "break-evenpunt-berekenen",
  ui: () => ({
    fijos: "Vaste kosten per maand",
    fijosAyuda: "Wat je betaalt ook als je niets verkoopt: huur, vaste salarissen, energie, software.",
    precio: "Verkoopprijs per stuk",
    variable: "Variabele kosten per stuk",
    variableAyuda: "Wat elk verkocht stuk je kost: materiaal, inkoop, commissie, verzending.",
    objetivo: "Gewenste winst per maand (niet verplicht)",
    objetivoAyuda: "Om te zien hoeveel je moet verkopen bovenop het dekken van je kosten.",
    unidades: "Stuks om quitte te spelen",
    facturacion: "Omzet om quitte te spelen",
    contribucion: "Dekkingsbijdrage per stuk",
    contribucionAyuda: "Wat elke verkoop overlaat om je vaste kosten te betalen: verkoopprijs min variabele kosten.",
    contribucionPct: "Dekkingsbijdrage (%)",
    unidadesObjetivo: "Stuks voor je gewenste winst",
    facturacionObjetivo: "Omzet voor je gewenste winst",
    errorPrecio: "Vul de verkoopprijs van één stuk in.",
    errorMargen: "De variabele kosten zijn gelijk aan of hoger dan de prijs. Je verliest op elke verkoop en speelt nooit quitte. Controleer de prijs of de kosten.",
    observacionRedondeo: "Het aantal stuks is naar boven afgerond, want je kunt geen half stuk verkopen.",
  }),
};
