import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosHu: TextosUi<UiCombustible> = {
  slug: "uzemanyagkoltseg-kalkulator",
  ui: () => ({
    distancia: (u) => `Az út hossza (${u})`,
    idaYVuelta: "Oda-vissza",
    tipoConsumo: "Hogyan adod meg a fogyasztást",
    l100: "Liter 100 km-en",
    kml: "Kilométer literenként",
    consumo: "Fogyasztás",
    consumoMpg: "Fogyasztás (mérföld gallononként)",
    consumoAyuda: "Nézd meg a kézikönyvben vagy a fedélzeti számítógépen. Országúton általában kevesebbet fogyaszt az autó, mint városban.",
    precio: (u) => (u === "L" ? "Üzemanyag ára literenként" : "Üzemanyag ára gallononként"),
    personas: "Hányan osztoznak a költségen",
    costo: "Üzemanyagköltség",
    porPersona: "Fejenként",
    combustible: (u) => (u === "L" ? "Szükséges üzemanyag (liter)" : "Szükséges üzemanyag (gallon)"),
    distanciaTotal: (u) => `Teljes távolság (${u})`,
    costoPorDistancia: (u) => (u === "mi" ? "Költség mérföldenként" : `Költség (${u})`),
    errorConsumo: "A fogyasztásnak nullánál nagyobbnak kell lennie.",
    errorPersonas: "Legalább egy embernek kell lennie.",
  }),
};
