import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosFi: TextosUi<UiOvulacion> = {
  slug: "ovulaatiolaskuri",
  ui: () => ({
    fum: "Viimeisten kuukautisten ensimmäinen päivä",
    fumAyuda: "Vuodon ensimmäinen päivä, ei viimeinen.",
    ciclo: "Kierron pituus (päivää)",
    cicloAyuda: "Kuukautisten ensimmäisestä päivästä seuraavia kuukautisia edeltävään päivään. Jos pituus vaihtelee, käytä keskiarvoa.",
    ovulacion: "Arvioitu ovulaatio",
    fertilDesde: "Hedelmälliset päivät alkaen",
    fertilHasta: "Hedelmälliset päivät päättyen",
    proxima: "Seuraavat kuukautiset",
    tabla: "Tulevat kierrot",
    colRegla: "Kuukautiset",
    colDesde: "Hedelmällinen alkaen",
    colHasta: "Hedelmällinen asti",
    colOvulacion: "Ovulaatio",
    errorCiclo: "Kierron pituuden on oltava 21 ja 45 päivän välillä.",
    aviso: "Tämä on arvio säännölliselle kierrolle. Se ei ole ehkäisymenetelmä eikä korvaa kätilön, terveydenhoitajan tai lääkärin arviota.",
  }),
};
