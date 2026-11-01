import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosLt: TextosUi<UiMetaDeAhorro> = {
  slug: "taupymo-tikslas",
  ui: () => ({
    meta: "Kiek norite sutaupyti?",
    actual: "Kiek jau sutaupyta (neprivaloma)",
    meses: "Per kiek mėnesių",
    rendimiento: "Metinė santaupų grąža (%, neprivaloma)",
    rendimientoAyuda: "Jei pinigai laikomi taupomojoje sąskaitoje arba investicijoje, nešančioje palūkanas. Jei jie nieko neneša, palikite lauką tuščią.",
    aporteMensual: "Per mėnesį reikia atidėti",
    aporteSemanal: "Tai per savaitę",
    totalAportado: "Iš viso įmokėsite",
    intereses: "Gautos palūkanos",
    errorMeta: "Įveskite, kiek norite sutaupyti.",
    yaLlegas: "Tai, ką jau turite, per šį laiką pasieks tikslą ir be papildomų įmokų.",
  }),
};
