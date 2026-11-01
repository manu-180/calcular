import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosSk: TextosUi<UiMetrosCuadrados> = {
  slug: "vypocet-metrov-stvorcovych",
  ui: () => ({
    forma: (n) => `Plocha ${n}: tvar`,
    formaAyuda: "Ak má miestnosť tvar písmena L alebo je nepravidelná, rozdeľte ju na časti a tie sa spočítajú.",
    ninguna: "Nepoužiť",
    rectangulo: "Obdĺžnik alebo štvorec",
    triangulo: "Trojuholník",
    circulo: "Kruh",
    medidaA: (n, u) => `Plocha ${n}: dĺžka, základňa alebo priemer (${u})`,
    medidaAAyuda: "Obdĺžnik: dĺžka a šírka. Trojuholník: základňa a výška. Kruh: len priemer.",
    medidaB: (n, u) => `Plocha ${n}: šírka alebo výška (${u})`,
    total: (u) => `Celková plocha (${u})`,
    equivale: (u) => `Zodpovedá v ${u}`,
    parcial: (n, u) => `Plocha ${n} (${u})`,
    errorMedida: "Tento rozmer chýba alebo je 0.",
  }),
};
