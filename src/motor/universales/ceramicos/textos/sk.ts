import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosSk: TextosUi<UiCeramicos> = {
  slug: "kalkulacka-dlazby",
  ui: () => ({
    superficie: (u) => `Plocha na obloženie (${u})`,
    largo: (u) => `Dĺžka dlaždice (${u})`,
    ancho: (u) => `Šírka dlaždice (${u})`,
    desperdicio: "Rezerva na rezanie (%)",
    desperdicioAyuda: "Na rezanie a rozbité kusy. Pri rovnom kladení počítajte s 10 %, pri kladení na diagonálu s 15 %.",
    porCaja: "Počet dlaždíc v jednej krabici",
    porCajaAyuda: "Nepovinné. Vyplňte, ak chcete vidieť, koľko krabíc kúpiť.",
    piezas: "Potrebný počet dlaždíc (ks)",
    cajas: "Koľko krabíc kúpiť",
    conDesperdicio: (u) => `Plocha s rezervou (${u})`,
    cubre: (u) => `Plocha, ktorú krabice pokryjú (${u})`,
    errorSuperficie: "Plocha musí byť väčšia ako nula.",
    errorPieza: "Rozmery dlaždice musia byť väčšie ako nula.",
  }),
};
