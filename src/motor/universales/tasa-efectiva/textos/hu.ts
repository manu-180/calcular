import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosHu: TextosUi<UiTasaEfectiva> = {
  slug: "effektiv-kamatlab-kalkulator",
  ui: () => ({
    direccion: "Milyen kamatlábad van?",
    nominalAEfectiva: "Névleges éves kamatláb (átváltás effektívre)",
    efectivaANominal: "Effektív kamatláb (átváltás névlegesre)",
    tasa: "Éves kamatláb (%)",
    tasaAyuda: "Pontosan úgy add meg, ahogy az ajánlatban vagy a szerződésben szerepel.",
    capitalizacion: "Tőkésítés",
    capitalizacionAyuda: "Milyen gyakran írják jóvá vagy számolják fel a kamatot. Hiteleknél és hitelkártyáknál általában havonta.",
    mensual: "Havonta (évente 12 alkalommal)",
    trimestral: "Negyedévente (évente 4 alkalommal)",
    semestral: "Félévente (évente 2 alkalommal)",
    diaria: "Naponta (évente 365 alkalommal)",
    efectiva: "Effektív éves kamatláb",
    nominal: "Névleges éves kamatláb",
    periodica: "Kamatláb egy időszakra",
    errorNegativa: "A kamatláb nem lehet negatív. Nullát vagy annál nagyobb számot adj meg.",
    observacionDiferencia: (puntos) => `Az effektív kamatláb ennyi százalékponttal magasabb a névlegesnél: ${puntos}. Ennek oka, hogy a jóváírt kamat is kamatozik.`,
  }),
};
