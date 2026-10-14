import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "litres" : "gallons");

export const textosFr: TextosUi<UiPintura> = {
  slug: "calcul-peinture",
  ui: () => ({
    modo: "Quelles mesures avez-vous ?",
    modoMedidas: "Longueur et hauteur des murs",
    modoSuperficie: "La surface totale",
    largo: (u) => `Longueur totale des murs (${u})`,
    largoAyuda: "Tous les murs à peindre mis bout à bout. Pour une pièce, son périmètre.",
    alto: (u) => `Hauteur des murs (${u})`,
    superficie: (u) => `Surface à peindre (${u})`,
    aberturas: (u) => `Portes et fenêtres à déduire (${u})`,
    aberturasAyuda: "Une porte fait environ 2 m² (21 ft²) et une fenêtre standard 1 à 2 m².",
    manos: "Nombre de couches",
    rendimiento: (u) => `Rendement de la peinture (${u})`,
    rendimientoAyuda: "Il est indiqué sur le pot : la surface couverte par couche. Si vous ne le connaissez pas, gardez la valeur proposée.",
    recomendado: (u) => `Peinture à acheter (${volumen(u)})`,
    recomendadoAyuda: "Comprend 10 % de marge pour les retouches et ce qui reste dans le rouleau.",
    necesario: (u) => `Quantité exacte (${volumen(u)})`,
    neta: (u) => `Surface à peindre (${u})`,
    errorMedidas: "Indiquez la longueur et la hauteur des murs.",
    errorSuperficie: "Indiquez la surface à peindre.",
    errorAberturas: "Les portes et fenêtres ne peuvent pas occuper tout le mur.",
    errorRendimiento: "Le rendement doit être supérieur à 0.",
  }),
};
