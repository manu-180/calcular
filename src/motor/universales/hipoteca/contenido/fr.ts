import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";

export const contenidoFr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const prestado = precio * 0.8;
  const cuota25 = cuotaFrancesa(prestado, 4, 300);
  const cuota15 = cuotaFrancesa(prestado, 4, 180);
  const quebec = ctx.locale.endsWith("-CA");
  const nombre = quebec ? "Calcul de paiement hypothécaire" : "Simulation de prêt immobilier";
  const faq = [
    {
      pregunta: quebec ? "Quelle mise de fonds prévoir ?" : "Quel apport personnel prévoir ?",
      respuesta: "Cela dépend de la banque et du pays. Plus l’apport est élevé, moins vous empruntez : la mensualité et les intérêts baissent. Gardez aussi de quoi payer les frais d’achat.",
    },
    {
      pregunta: "Pourquoi le capital baisse-t-il si peu les premières années ?",
      respuesta: "Les intérêts portent sur ce que vous devez. Au début, ce montant est élevé : l’essentiel de chaque mensualité part en intérêts. Avec le temps, la tendance s’inverse.",
    },
    {
      pregunta: "Vaut-il mieux emprunter sur une durée plus courte ?",
      respuesta: "Si vous pouvez assumer une mensualité plus haute, oui : vous payez beaucoup moins d’intérêts. Sinon, une durée plus longue avec des remboursements anticipés quand c’est possible fonctionne aussi.",
    },
    {
      pregunta: "Ma mensualité peut-elle changer ?",
      respuesta: "À taux fixe, la mensualité reste la même. À taux variable, elle peut bouger. Ce calcul suppose un taux identique sur toute la durée.",
    },
  ];
  if (ctx.pais === "FR") {
    faq.push({
      pregunta: "Combien puis-je emprunter en France ?",
      respuesta: "En règle générale, les banques limitent le taux d’endettement à 35 % des revenus nets, assurance comprise, et la durée à 25 ans. Comparez la mensualité avec charges à ce plafond.",
    });
  }
  return {
    h1: nombre,
    title: tituloQueEntre(`${nombre} (${ctx.nombrePais})`, nombre),
    description: "Calculez la mensualité de votre prêt immobilier selon le prix, l’apport, le taux et la durée. Voyez le total des intérêts et la baisse du capital chaque année.",
    intro: [
      "Un crédit immobilier est la plus grosse dette de la plupart des ménages. Mieux vaut voir tous les chiffres avant de rencontrer la banque.",
      "Saisissez le prix, votre apport, le taux et la durée. Si vous payez une assurance ou des charges avec le crédit, ajoutez-les pour voir votre vraie mensualité.",
    ],
    comoSeCalcula: [
      "Montant emprunté = prix du logement − apport.",
      "Mensualité constante, calculée avec le taux annuel divisé par 12 et la durée en mois.",
      "Pour chaque année, le calcul additionne les intérêts et le capital remboursés et montre ce qu’il reste à payer.",
    ],
    ejemplo: [
      `Un logement de ${m(precio)} avec 20 % d’apport laisse ${m(prestado)} à emprunter. À 4 % sur 25 ans, la mensualité est de ${m(cuota25)}.`,
      `Sur 25 ans, vous payez ${m(interesesTotales(prestado, 4, 300))} d’intérêts. Sur 15 ans, la mensualité monte à ${m(cuota15)}, mais les intérêts tombent à ${m(interesesTotales(prestado, 4, 180))}.`,
    ],
    faq,
    glosario: [
      { termino: quebec ? "Mise de fonds" : "Apport personnel", definicion: "La part du prix que vous payez avec votre propre épargne." },
      { termino: "Capital restant dû", definicion: "Ce qu’il vous reste à rembourser sur le prêt." },
      { termino: "Taux d’endettement", definicion: "La part de vos revenus consacrée au remboursement de vos crédits." },
    ],
  };
};
