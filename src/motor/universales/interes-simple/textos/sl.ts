import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosSl: TextosUi<UiInteresSimple> = {
  slug: "navadne-obresti",
  ui: () => ({
    capital: "Glavnica",
    tasa: "Letna obrestna mera (%)",
    tiempo: "Obdobje",
    unidad: "Obdobje je izraženo v",
    dias: "Dnevih",
    meses: "Mesecih",
    anios: "Letih",
    base: "Število dni v letu (za obdobje v dnevih)",
    baseAyuda: "Nekatere banke računajo, da ima leto 360 dni. Če niste prepričani, pustite 365.",
    base365: "365 dni",
    base360: "360 dni (bančno leto)",
    interes: "Obresti",
    montoFinal: "Glavnica z obrestmi",
    tasaPeriodo: "Obrestna mera za obdobje",
    errorCapital: "Vnesite glavnico, večjo od nič.",
  }),
};
