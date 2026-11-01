import { pluralLt } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import { duracionLt } from "../../dias-entre-fechas/textos/lt";
import type { UiEdad } from "../definicion";

export const textosLt: TextosUi<UiEdad> = {
  slug: "amziaus-skaiciuokle",
  ui: () => ({
    nacimiento: "Gimimo data",
    referencia: "Amžius datai",
    referenciaAyuda: "Pagal numatytuosius nustatymus tai šiandiena. Pakeiskite datą, jei norite sužinoti amžių kitą dieną.",
    edad: "Amžius",
    anios: "Pilni metai",
    totalMeses: "Mėnesiais",
    totalSemanas: "Savaitėmis",
    totalDias: "Dienomis",
    proximo: "Kitas gimtadienis",
    faltan: "Liko dienų",
    cumplira: "Kiek metų sukaks",
    duracion: duracionLt,
    errorFutura: "Gimimo data negali būti vėlesnė už datą, kuriai skaičiuojate amžių.",
    cumpleHoy: (anios) => `Šiandien gimtadienis: sukanka lygiai ${pluralLt(anios, "metai", "metai", "metų")}.`,
    nota29: "Jei gimimo data yra vasario 29 d., nekeliamaisiais metais gimtadienį skaičiuojame vasario 28 d.",
  }),
};
