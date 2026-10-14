import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosFr: TextosUi<UiCombustible> = {
  slug: "calcul-cout-carburant",
  ui: () => ({
    distancia: (u) => `Distance du trajet (${u})`,
    idaYVuelta: "Aller-retour",
    tipoConsumo: "Comment est indiquée la consommation",
    l100: "Litres aux 100 km",
    kml: "Kilomètres par litre",
    consumo: "Consommation",
    consumoMpg: "Consommation (miles par gallon)",
    consumoAyuda: "Regardez le carnet du véhicule ou l’ordinateur de bord. Sur autoroute, on consomme en général moins qu’en ville.",
    precio: (u) => (u === "L" ? "Prix du litre" : "Prix du gallon"),
    personas: "Personnes qui partagent les frais",
    costo: "Coût du carburant",
    porPersona: "Par personne",
    combustible: (u) => (u === "L" ? "Carburant nécessaire (litres)" : "Carburant nécessaire (gallons)"),
    distanciaTotal: (u) => `Distance totale (${u})`,
    costoPorDistancia: (u) => (u === "mi" ? "Coût par mile" : `Coût par ${u}`),
    errorConsumo: "La consommation doit être supérieure à 0.",
    errorPersonas: "Il faut au moins une personne.",
  }),
};
