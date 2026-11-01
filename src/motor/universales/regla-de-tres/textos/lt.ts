import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosLt: TextosUi<UiReglaDeTres> = {
  slug: "proporcijos-skaiciuokle",
  ui: () => ({
    tipo: "Proporcingumo rūšis",
    directa: "Tiesioginis (kai A didėja, didėja ir B)",
    inversa: "Atvirkštinis (kai A didėja, B mažėja)",
    a: "A",
    aAyuda: "Skaitykite taip: A santykis su B toks pat kaip C su X. Įveskite A, B ir C.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Ši reikšmė negali būti 0: iš jos dalijama.",
    fraseDirecta: (a, b, c, x) => `Jei ${a} atitinka ${b}, tai ${c} atitinka ${x}. Skaičiavimas: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Jei ${a} duoda ${b}, tai ${c} duoda ${x}. Skaičiavimas: ${a} × ${b} ÷ ${c}.`,
  }),
};
