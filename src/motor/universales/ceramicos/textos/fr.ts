import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosFr: TextosUi<UiCeramicos> = {
  slug: "calcul-carrelage",
  ui: () => ({
    superficie: (u) => `Surface à carreler (${u})`,
    largo: (u) => `Longueur d’un carreau (${u})`,
    ancho: (u) => `Largeur d’un carreau (${u})`,
    desperdicio: "Marge pour les chutes (%)",
    desperdicioAyuda: "Pour les coupes et la casse. Comptez 10 % en pose droite et 15 % en pose diagonale.",
    porCaja: "Carreaux par carton",
    porCajaAyuda: "Facultatif. Remplissez-le pour savoir combien de cartons acheter.",
    piezas: "Carreaux nécessaires",
    cajas: "Cartons à acheter",
    conDesperdicio: (u) => `Surface avec la marge (${u})`,
    cubre: (u) => `Surface couverte par les cartons (${u})`,
    errorSuperficie: "La surface doit être supérieure à 0.",
    errorPieza: "Les dimensions du carreau doivent être supérieures à 0.",
  }),
};
