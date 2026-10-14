import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const neta = 48 * 8 - 40;
        const gal = (neta * 2) / 350;
        return [
          `Une pièce avec 48 ft de murs, 8 ft de haut et 40 ft² de portes et fenêtres a ${n(neta, 0)} ft² à peindre.`,
          `Avec 2 couches et une peinture qui couvre 350 ft² par gallon, il faut ${n(gal, 2)} gallons. Avec la marge, ${n(gal * (1 + MARGEN), 2)} gallons.`,
        ];
      })()
    : (() => {
        const neta = 14 * 2.6 - 4;
        const litros = (neta * 2) / 10;
        return [
          `Une pièce avec 14 m de murs, ${n(2.6)} m de haut et 4 m² de portes et fenêtres a ${n(neta)} m² à peindre.`,
          `Avec 2 couches et une peinture qui couvre 10 m² par litre, il faut ${n(litros, 2)} litres. Avec la marge, ${n(litros * (1 + MARGEN), 2)} litres.`,
        ];
      })();
  return {
    h1: "Calcul de la quantité de peinture",
    title: tituloQueEntre(`Calcul de la quantité de peinture (${ctx.nombrePais})`, "Calcul de la quantité de peinture", "Calcul de peinture"),
    description: "Calculez combien de peinture il vous faut pour vos murs selon leurs dimensions, les portes et fenêtres, le nombre de couches et le rendement du pot.",
    intro: [
      "Saisissez la longueur et la hauteur des murs (ou directement la surface), ce qu’occupent les portes et fenêtres, et le nombre de couches.",
      `Le calcul ajoute ${n(MARGEN * 100, 0)} % de marge pour ne pas tomber à court en plein chantier.`,
    ],
    comoSeCalcula: [
      "Surface = longueur totale des murs × hauteur, moins les portes et fenêtres.",
      "Peinture = surface × nombre de couches ÷ rendement.",
      `On ajoute ensuite une marge de ${n(MARGEN * 100, 0)} %.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Combien de m² couvre un litre de peinture ?",
        respuesta: "La plupart des peintures murales d’intérieur couvrent 8 à 12 m² par litre et par couche. Le chiffre exact est indiqué sur le pot.",
      },
      {
        pregunta: "Combien de couches faut-il ?",
        respuesta: "Deux couches, c’est la norme. Un plâtre neuf, un mur très poreux ou un grand changement de couleur peuvent demander une sous-couche ou une troisième couche.",
      },
      {
        pregunta: "Faut-il déduire les portes et fenêtres ?",
        respuesta: "Oui, si elles sont grandes. Mieux vaut ne pas déduire les petites : le surplus sert pour les angles et les découpes.",
      },
      {
        pregunta: "Et pour le plafond ?",
        respuesta: "Calculez-le à part avec la surface : longueur × largeur de la pièce. Une peinture spéciale plafond a souvent un rendement différent.",
      },
    ],
    glosario: [
      { termino: "Rendement", definicion: "La surface qu’un litre ou un gallon de peinture couvre en une couche." },
      { termino: "Couche", definicion: "Chaque passage de peinture appliqué sur le mur." },
      { termino: "Sous-couche", definicion: "Une première couche qui prépare le support et aide la peinture à bien couvrir." },
    ],
  };
};
