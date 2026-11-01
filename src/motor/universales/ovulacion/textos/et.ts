import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosEt: TextosUi<UiOvulacion> = {
  slug: "ovulatsiooni-kalkulaator",
  ui: () => ({
    fum: "Viimase menstruatsiooni esimene päev",
    fumAyuda: "Vereerituse esimene päev, mitte viimane.",
    ciclo: "Tsükli pikkus (päevades)",
    cicloAyuda: "Menstruatsiooni esimesest päevast järgmisele menstruatsioonile eelnevani. Kui pikkus kõigub, kasuta keskmist.",
    ovulacion: "Eeldatav ovulatsioon",
    fertilDesde: "Viljakate päevade algus",
    fertilHasta: "Viljakate päevade lõpp",
    proxima: "Järgmine menstruatsioon",
    tabla: "Järgmised tsüklid",
    colRegla: "Menstruatsioon",
    colDesde: "Viljakuse algus",
    colHasta: "Viljakuse lõpp",
    colOvulacion: "Ovulatsioon",
    errorCiclo: "Tsükli pikkus peab olema 21-45 päeva.",
    aviso: "See on hinnang korrapärase tsükli kohta. See ei ole rasestumisvastane meetod ega asenda ämmaemanda või arsti hinnangut.",
  }),
};
