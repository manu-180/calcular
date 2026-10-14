import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 8, tasa: 4, aniosHipoteca: 25, alquiler, aumentoAlquiler: 2, gastosPropietario: 1.5, revalorizacion: 2, rendimiento: 4 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const quien = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "l’achat" : "la location");
  return {
    h1: "Louer ou acheter : le calcul",
    title: tituloQueEntre(`Louer ou acheter sa résidence principale (${ctx.nombrePais})`, `Louer ou acheter (${ctx.nombrePais})`, "Louer ou acheter"),
    description: "Comparez location et achat d’un logement sur le nombre d’années de votre choix. Voyez quelle option vous enrichit le plus, à partir de quand et de combien.",
    intro: [
      "Comparer la mensualité au loyer ne suffit pas. Le propriétaire paie des intérêts, l’entretien et la taxe foncière, mais il finit par posséder le logement. Le locataire, lui, peut garder son apport placé.",
      "Ce calculateur additionne tout cela année par année et vous dit quelle option vous laisse le plus gros patrimoine.",
    ],
    comoSeCalcula: [
      "Achat : chaque mois, vous payez la mensualité et les frais de propriétaire. Votre patrimoine est la valeur du logement moins ce que vous devez encore.",
      "Location : l’apport et les frais d’achat restent placés au rendement alternatif, et le loyer augmente chaque année.",
      "Chaque mois, l’option qui coûte le moins place la différence : les deux scénarios partent du même budget.",
      "La meilleure option est celle qui donne le plus gros patrimoine à la fin.",
    ],
    ejemplo: [
      `Un logement de ${m(precio)} avec 20 % d’apport, 8 % de frais d’achat et un prêt à 4 % sur 25 ans, face à un loyer de ${m(alquiler)} par mois.`,
      `Sur 10 ans, ${quien(a10)} l’emporte de ${m(Math.abs(a10.comprar - a10.alquilar))}. Sur 3 ans, ${quien(a3)} l’emporte de ${m(Math.abs(a3.comprar - a3.alquilar))}.`,
    ],
    faq: [
      {
        pregunta: "Louer, est-ce jeter son argent par les fenêtres ?",
        respuesta: "Pas vraiment. Le propriétaire paie lui aussi des coûts qu’il ne récupère jamais : intérêts, taxe foncière et entretien. Ce qui compte, c’est ce que vous possédez à la fin dans chaque cas.",
      },
      {
        pregunta: "Pourquoi la réponse change-t-elle selon le nombre d’années ?",
        respuesta: "L’achat a de gros coûts au départ (frais de notaire et premiers intérêts) qui mettent du temps à s’amortir. Si vous pensez déménager bientôt, la location l’emporte souvent.",
      },
      {
        pregunta: "Quelle donnée pèse le plus ?",
        respuesta: "Le rapport entre le prix et le loyer, le taux du prêt et la hausse des prix de l’immobilier. Faites varier la revalorisation et le rendement du placement pour voir à quel point la réponse bouge.",
      },
    ],
    glosario: [
      { termino: "Patrimoine", definicion: "Ce que vous possédez moins ce que vous devez." },
      { termino: "Revalorisation", definicion: "La hausse annuelle de la valeur du logement." },
      { termino: "Coût d’opportunité", definicion: "Ce que l’apport aurait rapporté si vous l’aviez placé." },
    ],
  };
};
