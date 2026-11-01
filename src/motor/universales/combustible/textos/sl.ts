import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosSl: TextosUi<UiCombustible> = {
  slug: "poraba-goriva",
  ui: () => ({
    distancia: (u) => `Dolžina poti (${u})`,
    idaYVuelta: "V obe smeri",
    tipoConsumo: "Kako je izražena poraba",
    l100: "Litrov na 100 km",
    kml: "Kilometrov na liter",
    consumo: "Poraba goriva",
    consumoAyuda: "Piše v navodilih za vozilo ali na potovalnem računalniku. Na avtocesti je poraba običajno manjša kot v mestu.",
    consumoMpg: "Poraba goriva (milj na galono)",
    precio: (u) => (u === "L" ? "Cena na liter" : "Cena na galono"),
    personas: "Koliko oseb si deli strošek",
    costo: "Strošek goriva",
    porPersona: "Na osebo",
    combustible: (u) => (u === "L" ? "Potrebno gorivo (litri)" : "Potrebno gorivo (galone)"),
    distanciaTotal: (u) => `Skupna razdalja (${u})`,
    costoPorDistancia: (u) => (u === "mi" ? "Strošek na miljo" : "Strošek na kilometer"),
    errorConsumo: "Poraba mora biti večja od nič.",
    errorPersonas: "Vnesite vsaj eno osebo.",
  }),
};
