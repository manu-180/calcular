import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosSl: TextosUi<UiMetaDeAhorro> = {
  slug: "varcevalni-cilj",
  ui: () => ({
    meta: "Koliko želite prihraniti?",
    actual: "Koliko ste že prihranili (neobvezno)",
    meses: "V koliko mesecih",
    rendimiento: "Letni donos prihrankov (%, neobvezno)",
    rendimientoAyuda: "Če je denar na varčevalnem računu ali v naložbi, ki prinaša obresti. Če ne prinaša ničesar, pustite polje prazno.",
    aporteMensual: "Na mesec morate odložiti",
    aporteSemanal: "Oziroma na teden",
    totalAportado: "Skupaj boste vplačali",
    intereses: "Zaslužene obresti",
    errorMeta: "Vnesite, koliko želite prihraniti.",
    yaLlegas: "To, kar že imate, bo v tem roku doseglo cilj tudi brez novih vplačil.",
  }),
};
