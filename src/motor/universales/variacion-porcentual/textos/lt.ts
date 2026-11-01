import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosLt: TextosUi<UiVariacion> = {
  slug: "procentinis-pokytis",
  ui: () => ({
    inicial: "Pradinė reikšmė",
    final: "Nauja reikšmė",
    variacion: "Procentinis pokytis",
    diferencia: "Skirtumas",
    vuelta: "Grįžimas į pradinę reikšmę",
    vueltaAyuda: "Kiek turėtų pasikeisti nauja reikšmė, kad grįžtų į pradinę.",
    errorInicialCero: "Pradinė reikšmė negali būti 0: nuo nulio procentinio pokyčio apskaičiuoti neįmanoma.",
    subio: (p) => `Reikšmė padidėjo ${p} %.`,
    bajo: (p) => `Reikšmė sumažėjo ${p} %.`,
    igual: "Pokyčio nėra: abi reikšmės vienodos.",
  }),
};
