import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const precio3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Règle de trois",
    title: tituloQueEntre(`Règle de trois et produit en croix (${ctx.nombrePais})`, `Règle de trois (${ctx.nombrePais})`, "Règle de trois"),
    description: "Résolvez une proportionnalité directe ou inverse en une seconde. Saisissez trois valeurs, obtenez la quatrième avec le calcul détaillé.",
    intro: [
      "La règle de trois sert quand deux grandeurs varient ensemble et que vous connaissez trois des quatre valeurs.",
      "Choisissez directe ou inverse, remplissez A, B et C : le calculateur vous donne X.",
    ],
    comoSeCalcula: [
      "Directe : X = B × C ÷ A. C’est le produit en croix, quand les deux grandeurs augmentent ensemble (plus de kilos, prix plus élevé).",
      "Inverse : X = A × B ÷ C. Quand l’une augmente et l’autre diminue (plus de personnes, moins de jours).",
    ],
    ejemplo: [
      `Si 3 kilos coûtent ${m(precio3)}, 5 kilos coûtent ${m((precio3 * 5) / 3)}.`,
      "Si 4 personnes peignent une maison en 12 jours, 6 personnes la peignent en 8 jours.",
    ],
    faq: [
      {
        pregunta: "Comment savoir si c’est une proportionnalité directe ou inverse ?",
        respuesta: "Si une grandeur augmente quand l’autre augmente, c’est direct. Si l’une baisse quand l’autre augmente, c’est inverse.",
      },
      {
        pregunta: "Comment faire un produit en croix ?",
        respuesta: `Multipliez les deux valeurs connues placées en diagonale, puis divisez par la troisième. Si 3 correspond à 600, alors 5 correspond à 600 × 5 ÷ 3 = ${formatearNumero(ctx, 1000)}.`,
      },
      {
        pregunta: "Peut-on l’utiliser pour un pourcentage ?",
        respuesta: "Oui. Si 200 représente 100 %, alors 50 représente 25 %. C’est une proportionnalité directe avec A = 200, B = 100 et C = 50.",
      },
    ],
    glosario: [
      { termino: "Proportionnalité directe", definicion: "Les deux grandeurs augmentent ou diminuent ensemble." },
      { termino: "Proportionnalité inverse", definicion: "Une grandeur augmente quand l’autre diminue." },
      { termino: "Produit en croix", definicion: "La méthode pour trouver la valeur manquante d’un tableau de proportionnalité." },
    ],
  };
};
