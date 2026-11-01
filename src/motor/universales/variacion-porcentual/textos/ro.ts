import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosRo: TextosUi<UiVariacion> = {
  slug: "variatie-procentuala",
  ui: () => ({
    inicial: "Valoarea inițială",
    final: "Valoarea finală",
    variacion: "Variația procentuală",
    diferencia: "Diferența",
    vuelta: "Pentru revenirea la valoarea inițială",
    vueltaAyuda: "Cât ar trebui să se schimbe valoarea finală ca să revină la valoarea inițială.",
    errorInicialCero: "Valoarea inițială nu poate fi 0: de la zero nu există variație procentuală.",
    subio: (p) => `A crescut cu ${p}%.`,
    bajo: (p) => `A scăzut cu ${p}%.`,
    igual: "Nicio schimbare: cele două valori sunt egale.",
  }),
};
