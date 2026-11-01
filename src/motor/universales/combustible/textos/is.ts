import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosIs: TextosUi<UiCombustible> = {
  slug: "eldsneytiskostnadur",
  ui: () => ({
    distancia: (u) => `Vegalengd ferðar (${u})`,
    idaYVuelta: "Fram og til baka",
    tipoConsumo: "Hvernig er eyðslan gefin upp?",
    l100: "Lítrar á 100 km",
    kml: "Kílómetrar á lítra",
    consumo: "Eldsneytiseyðsla",
    consumoMpg: "Eldsneytiseyðsla (mílur á gallon)",
    consumoAyuda: "Skoðaðu handbók bílsins eða aksturstölvuna. Bíllinn eyðir oftast minna á þjóðvegi en innanbæjar.",
    precio: (u) => (u === "L" ? "Verð á lítra" : "Verð á gallon"),
    personas: "Fjöldi sem deilir kostnaðinum",
    costo: "Eldsneytiskostnaður",
    porPersona: "Á mann",
    combustible: (u) => (u === "L" ? "Eldsneyti sem fer í ferðina (lítrar)" : "Eldsneyti sem fer í ferðina (gallon)"),
    distanciaTotal: (u) => `Heildarvegalengd (${u})`,
    costoPorDistancia: (u) => `Kostnaður á ${u}`,
    errorConsumo: "Eyðslan þarf að vera meiri en 0.",
    errorPersonas: "Fjöldinn þarf að vera að minnsta kosti 1.",
  }),
};
