import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosSq: TextosUi<UiCombustible> = {
  slug: "kalkulator-karburanti",
  ui: () => ({
    distancia: (u) => `Distanca e udhëtimit (${u})`,
    idaYVuelta: "Vajtje-ardhje",
    tipoConsumo: "Si shprehet konsumi",
    l100: "Litra për 100 km",
    kml: "Kilometra për litër",
    consumo: "Konsumi",
    consumoMpg: "Konsumi (milje për gallon)",
    consumoAyuda: "E gjeni te libri i makinës ose te kompjuteri i bordit. Në autostradë konsumi është zakonisht më i ulët se në qytet.",
    precio: (u) => (u === "L" ? "Çmimi për litër" : "Çmimi për gallon"),
    personas: "Persona që ndajnë koston",
    costo: "Kostoja e karburantit",
    porPersona: "Për person",
    combustible: (u) => (u === "L" ? "Karburant i nevojshëm (litra)" : "Karburant i nevojshëm (galona)"),
    distanciaTotal: (u) => `Distanca totale (${u})`,
    costoPorDistancia: (u) => (u === "mi" ? "Kosto për milje" : `Kosto për ${u}`),
    errorConsumo: "Konsumi duhet të jetë më i madh se 0.",
    errorPersonas: "Duhet të jetë të paktën një person.",
  }),
};
