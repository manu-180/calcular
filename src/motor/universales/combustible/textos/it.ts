import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosIt: TextosUi<UiCombustible> = {
  slug: "calcolo-costo-carburante",
  ui: () => ({
    distancia: (u) => `Distanza del viaggio (${u})`,
    idaYVuelta: "Andata e ritorno",
    tipoConsumo: "Come misuri il consumo",
    l100: "Litri ogni 100 km",
    kml: "Chilometri con un litro",
    consumo: "Consumo",
    consumoMpg: "Consumo (miglia per gallone)",
    consumoAyuda: "Controlla il libretto o il computer di bordo. In autostrada di solito si consuma meno che in città.",
    precio: (u) => (u === "L" ? "Prezzo al litro" : "Prezzo al gallone"),
    personas: "Persone che dividono la spesa",
    costo: "Costo del carburante",
    porPersona: "A persona",
    combustible: (u) => (u === "L" ? "Carburante necessario (litri)" : "Carburante necessario (galloni)"),
    distanciaTotal: (u) => `Distanza totale (${u})`,
    costoPorDistancia: (u) => (u === "mi" ? "Costo per miglio" : `Costo per ${u}`),
    errorConsumo: "Il consumo deve essere maggiore di 0.",
    errorPersonas: "Ci deve essere almeno una persona.",
  }),
};
