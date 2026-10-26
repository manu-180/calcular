import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosFi: TextosUi<UiMetaDeAhorro> = {
  slug: "saastolaskuri",
  ui: () => ({
    meta: "Paljonko haluat säästää?",
    actual: "Jo säästetty summa (valinnainen)",
    meses: "Kuukausia tavoitteeseen",
    rendimiento: "Tuotto tai säästötilin korko vuodessa (%, valinnainen)",
    rendimientoAyuda: "Jos rahat ovat säästötilillä tai sijoituksessa, joka tuottaa korkoa. Jätä tyhjäksi, jos ne eivät tuota mitään.",
    aporteMensual: "Säästettävä kuukaudessa",
    aporteSemanal: "Se vastaa viikossa",
    totalAportado: "Talletukset yhteensä",
    intereses: "Korot ja tuotot",
    errorMeta: "Syötä, paljonko haluat säästää.",
    yaLlegas: "Jo säästämäsi summa riittää tavoitteeseen siinä ajassa, vaikka et tallettaisi enempää.",
  }),
};
