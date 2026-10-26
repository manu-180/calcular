import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosRo: TextosUi<UiCombustible> = {
  slug: "calculator-consum-combustibil",
  ui: () => ({
    distancia: (u) => `Distanța drumului (${u})`,
    idaYVuelta: "Dus-întors",
    tipoConsumo: "Cum se exprimă consumul",
    l100: "Litri la 100 km",
    kml: "Kilometri pe litru",
    consumo: "Consum",
    consumoMpg: "Consum (mile pe galon)",
    consumoAyuda: "Îl găsiți în cartea mașinii sau în computerul de bord. Pe autostradă consumul este de obicei mai mic decât în oraș.",
    precio: (u) => (u === "L" ? "Prețul pe litru" : "Prețul pe galon"),
    personas: "Persoane care împart costul",
    costo: "Costul combustibilului",
    porPersona: "De persoană",
    combustible: (u) => (u === "L" ? "Combustibil necesar (litri)" : "Combustibil necesar (galoane)"),
    distanciaTotal: (u) => `Distanța totală (${u})`,
    costoPorDistancia: (u) => (u === "mi" ? "Cost pe milă" : `Cost pe ${u}`),
    errorConsumo: "Consumul trebuie să fie mai mare decât 0.",
    errorPersonas: "Trebuie să fie cel puțin o persoană.",
  }),
};
