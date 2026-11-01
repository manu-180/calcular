import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosLt: TextosUi<UiInteresSimple> = {
  slug: "paprastosios-palukanos",
  ui: () => ({
    capital: "Pradinė suma",
    tasa: "Metinė palūkanų norma (%)",
    tiempo: "Laikotarpis",
    unidad: "Laikotarpio vienetai",
    dias: "Dienos",
    meses: "Mėnesiai",
    anios: "Metai",
    base: "Dienų skaičius metuose (kai laikotarpis dienomis)",
    baseAyuda: "Kai kurie bankai metus skaičiuoja kaip 360 dienų. Jei abejojate, palikite 365.",
    base365: "365 dienos",
    base360: "360 dienų (banko metai)",
    interes: "Palūkanos",
    montoFinal: "Suma su palūkanomis",
    tasaPeriodo: "Laikotarpio norma",
    errorCapital: "Įveskite pradinę sumą, didesnę už nulį.",
  }),
};
