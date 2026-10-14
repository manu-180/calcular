import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 12, 36);
  const cuota60 = cuotaFrancesa(monto, 12, 60);
  return {
    h1: "Calcul de mensualité de prêt",
    title: tituloQueEntre(`Calcul de mensualité de prêt (${ctx.nombrePais})`, "Calcul de mensualité de prêt", "Calcul de prêt"),
    description: "Calculez la mensualité d’un prêt, le total des intérêts et le tableau d’amortissement complet. Voyez ce que vous gagnez en remboursant plus vite.",
    intro: [
      "Avant de signer un prêt, deux chiffres comptent : ce que vous payez chaque mois et ce que le crédit vous coûte en intérêts.",
      "Saisissez le montant, le taux annuel et la durée. Si vous comptez rembourser un peu plus chaque mois, ajoutez-le pour voir combien de temps vous gagnez.",
    ],
    comoSeCalcula: [
      "Le calcul utilise des mensualités constantes, la méthode habituelle pour les prêts personnels, auto et immobiliers.",
      "Taux mensuel = taux annuel ÷ 12.",
      "Mensualité = montant × taux mensuel ÷ (1 − (1 + taux mensuel) puissance moins le nombre de mensualités).",
      "Chaque mois, les intérêts portent sur le capital restant dû. Le reste de la mensualité rembourse le capital.",
    ],
    ejemplo: [
      `Un prêt de ${m(monto)} à 12 % par an sur 36 mois donne une mensualité de ${m(cuota36)}. Vous payez ${m(interesesTotales(monto, 12, 36))} d’intérêts au total.`,
      `Sur 60 mois, la mensualité baisse à ${m(cuota60)}, mais les intérêts montent à ${m(interesesTotales(monto, 12, 60))}.`,
    ],
    faq: [
      {
        pregunta: "Comment se calcule la mensualité d’un prêt ?",
        respuesta: "Avec la formule de l’amortissement à mensualités constantes. Toutes les mensualités sont égales, mais les premières contiennent surtout des intérêts et les dernières surtout du capital. C’est pour cela que le capital dû baisse lentement au début.",
      },
      {
        pregunta: "Faut-il rembourser son prêt par anticipation ?",
        respuesta: "En général oui, s’il n’y a pas de grosses indemnités de remboursement anticipé. L’argent versé en plus va directement au capital et ne produit plus d’intérêts pour le prêteur. Plus tôt vous le versez, plus vous économisez.",
      },
      {
        pregunta: "Vaut-il mieux emprunter sur une durée plus longue ?",
        respuesta: "La mensualité est plus basse, mais vous payez beaucoup plus d’intérêts au total. Comparez les deux chiffres avant de décider.",
      },
      {
        pregunta: "Pourquoi ma banque annonce-t-elle une autre mensualité ?",
        respuesta: "Les banques ajoutent souvent l’assurance emprunteur, des frais de dossier ou des taxes. Comparez les offres sur le TAEG, qui inclut ces coûts, et pas seulement sur le taux.",
      },
    ],
    glosario: [
      { termino: "Capital restant dû", definicion: "La part de la dette que vous n’avez pas encore remboursée." },
      { termino: "Taux nominal", definicion: "Le taux annuel qu’on divise par 12 pour obtenir les intérêts de chaque mois." },
      { termino: "TAEG", definicion: "Taux annuel effectif global : le coût total du crédit, frais et assurance compris." },
      { termino: "Amortissement", definicion: "La part de chaque mensualité qui réduit la dette." },
    ],
  };
};
