import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "Calcul du seuil de rentabilité",
    title: tituloQueEntre(`Calcul du seuil de rentabilité (${ctx.nombrePais})`, "Calcul du seuil de rentabilité", "Seuil de rentabilité"),
    description: "Découvrez combien d’unités vendre et quel chiffre d’affaires réaliser chaque mois pour couvrir vos charges, puis pour atteindre le bénéfice visé.",
    intro: [
      "Le seuil de rentabilité est le niveau de ventes où une activité ne gagne ni ne perd d’argent. En dessous, vous perdez. Au-dessus, vous commencez à gagner.",
      "Saisissez vos charges fixes, le prix et le coût de chaque unité. Le calcul vous dit combien vendre pour couvrir vos charges et pour atteindre votre objectif.",
    ],
    comoSeCalcula: [
      "Marge sur coût variable = prix − coût variable unitaire.",
      "Unités au seuil = charges fixes ÷ marge sur coût variable, arrondi au-dessus.",
      "Chiffre d’affaires au seuil = charges fixes ÷ (marge sur coût variable ÷ prix).",
      "Pour un bénéfice visé, ajoutez-le aux charges fixes et refaites le même calcul.",
    ],
    ejemplo: [
      `Avec ${m(fijos)} de charges fixes, un prix de ${m(precio)} et un coût variable de ${m(variable)}, chaque vente laisse ${m(precio - variable)}.`,
      `Il faut vendre ${formatearNumero(ctx, base.unidades)} unités (${m(base.facturacion)}) pour couvrir les charges, et ${formatearNumero(ctx, meta.unidades)} pour gagner ${m(objetivo)} par mois.`,
    ],
    faq: [
      {
        pregunta: "Qu’est-ce qu’une charge fixe et une charge variable ?",
        respuesta: "Les charges fixes ne bougent pas même si vous ne vendez rien : loyer, salaires fixes, énergie. Les charges variables augmentent avec chaque vente : marchandises, matières, commissions, livraison.",
      },
      {
        pregunta: "Comment baisser son seuil de rentabilité ?",
        respuesta: "Trois leviers : augmenter le prix, réduire le coût variable par unité ou alléger les charges fixes. Le prix est souvent celui qui pèse le plus.",
      },
      {
        pregunta: "Le calcul marche-t-il pour une activité de services ?",
        respuesta: "Oui. Une unité peut être une heure, une séance ou un client par mois. Prenez comme coût variable ce que vous coûte chaque prestation.",
      },
      {
        pregunta: "Qu’est-ce que le point mort ?",
        respuesta: "C’est la date à laquelle le seuil de rentabilité est atteint dans l’année. Le seuil est un montant, le point mort est un moment.",
      },
    ],
    glosario: [
      { termino: "Seuil de rentabilité", definicion: "Le chiffre d’affaires pour lequel les recettes couvrent exactement les charges." },
      { termino: "Marge sur coût variable", definicion: "Ce que chaque vente laisse pour payer les charges fixes." },
    ],
  };
};
