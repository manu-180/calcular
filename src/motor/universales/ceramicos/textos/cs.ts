import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosCs: TextosUi<UiCeramicos> = {
  slug: "kalkulacka-dlazby",
  ui: () => ({
    superficie: (u) => `Plocha k obložení (${u})`,
    largo: (u) => `Délka dlaždice (${u})`,
    ancho: (u) => `Šířka dlaždice (${u})`,
    desperdicio: "Rezerva na prořez (%)",
    desperdicioAyuda: "Na řezání a rozbité kusy. Při rovném kladení počítejte s 10 %, při kladení na diagonálu s 15 %.",
    porCaja: "Počet dlaždic v jedné krabici",
    porCajaAyuda: "Nepovinné. Vyplňte, pokud chcete vidět, kolik krabic koupit.",
    piezas: "Potřebný počet dlaždic (ks)",
    cajas: "Kolik krabic koupit",
    conDesperdicio: (u) => `Plocha s rezervou (${u})`,
    cubre: (u) => `Plocha, kterou krabice pokryjí (${u})`,
    errorSuperficie: "Plocha musí být větší než nula.",
    errorPieza: "Rozměry dlaždice musí být větší než nula.",
  }),
};
