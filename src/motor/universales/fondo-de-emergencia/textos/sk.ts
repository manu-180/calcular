import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosSk: TextosUi<UiFondoDeEmergencia> = {
  slug: "financna-rezerva",
  ui: () => ({
    gastos: "Nevyhnutné mesačné výdavky",
    gastosAyuda: "To, čo nemôžete prestať platiť: bývanie, jedlo, energie, doprava, zdravie a splátky úverov.",
    meses: "Na koľko mesiacov výdavkov",
    mesesAyuda: "Pri stabilnom príjme 3 až 6 mesiacov. Viac, ak príjem kolíše alebo má domácnosť iba jeden príjem.",
    actual: "Koľko už máte nasporené (nepovinné)",
    aporte: "Koľko si môžete mesačne odkladať (nepovinné)",
    meta: "Odporúčaná finančná rezerva",
    falta: "Zostáva nasporiť",
    mesesParaLlegar: "Mesiacov do cieľovej sumy",
    cobertura: "Na koľko mesiacov vám dnes úspory vystačia",
    errorGastos: "Zadajte svoje nevyhnutné mesačné výdavky.",
    yaCubierto: "Finančnú rezervu už máte. To, čo budete odkladať ďalej, môžete venovať iným cieľom.",
    sinAporte: "Zadajte, koľko si môžete mesačne odkladať, a ukážeme vám, ako dlho to potrvá.",
    observacionDonde: "Majte tieto peniaze na samostatnom účte, z ktorého ich môžete vybrať ešte v ten istý deň a kde nestrácajú hodnotu, napríklad na sporiacom účte.",
  }),
};
