import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosIs: TextosUi<UiRendimientoInversion> = {
  slug: "avoxtun-fjarfestingar",
  ui: () => ({
    inicial: "Fjárfest upphæð",
    final: "Lokavirði",
    finalAyuda: "Hvers virði fjárfestingin er í dag eða hvað þú fékkst þegar þú seldir.",
    cobrado: "Greiðslur á tímabilinu (valfrjálst)",
    cobradoAyuda: "Arður, vextir eða leiga sem þú hefur fengið og ekki endurfjárfest.",
    anios: "Fjöldi ára",
    aniosAyuda: "Þú mátt nota aukastafi fyrir hluta úr ári, til dæmis 1,5 ár.",
    ganancia: "Hagnaður",
    roi: "Heildarávöxtun (ROI)",
    cagr: "Ársávöxtun (CAGR)",
    cagrAyuda: "Ávöxtunin á ári sem gefur sömu niðurstöðu þegar hún safnast upp ár eftir ár.",
    errorInicial: "Sláðu inn hve miklu þú fjárfestir í upphafi.",
    observacionCorto: "Undir einu ári teygir ársávöxtunin stuttan árangur eins og hann endurtæki sig allt árið. Taktu henni með fyrirvara.",
    observacionInflacion: "Ef þú vilt vita hvort kaupmáttur þinn hefur aukist skaltu bera ársávöxtunina saman við verðbólgu á sama tímabili.",
  }),
};
