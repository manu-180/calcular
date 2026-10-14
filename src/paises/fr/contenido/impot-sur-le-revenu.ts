import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fr.impot-sur-le-revenu",
  h1: "Calcul de l'impôt sur le revenu 2026",
  title: "Calcul impôt sur le revenu 2026 : barème, parts et décote",
  description:
    "Estimez votre impôt 2026 sur les revenus 2025 : barème progressif, quotient familial, plafonnement et décote. Taux marginal et taux moyen inclus.",
  intro: [
    "L'impôt sur le revenu se calcule sur le revenu net imposable du foyer, divisé par le nombre de parts. On applique le barème progressif à une part, puis on multiplie par le nombre de parts.",
    "La calculatrice reprend le barème voté pour l'imposition de 2026 (revenus de 2025), le plafonnement du quotient familial et la décote des foyers modestes.",
  ],
  comoSeCalcula: [
    "Revenu net imposable : vos salaires nets imposables, moins la déduction forfaitaire de {{fr.abattement-frais-taux}} pour frais professionnels (au moins {{fr.abattement-frais-min}}, au plus {{fr.abattement-frais-max}} par personne).",
    "Parts : 1 pour une personne seule, 2 pour un couple marié ou pacsé, une demi-part pour chacun des deux premiers enfants, une part entière à partir du troisième. Un parent isolé ajoute une demi-part.",
    "Barème : chaque tranche du quotient est taxée à son taux, de 0 % à 45 %. L'impôt d'une part est multiplié par le nombre de parts.",
    "Plafonnement : l'avantage des enfants ne peut pas dépasser {{fr.plafond-demi-part}} par demi-part ({{fr.plafond-parent-isole}} pour le premier enfant d'un parent isolé).",
    "Décote : si l'impôt ne dépasse pas {{fr.decote-seuil-seul}} (personne seule) ou {{fr.decote-seuil-couple}} (couple), il baisse de {{fr.decote-forfait-seul}} ou {{fr.decote-forfait-couple}} moins {{fr.decote-taux}} de son montant.",
  ],
  ejemplo: [
    "Une personne seule avec 30 000 € de revenu imposable paie 0 % jusqu'à 11 600 €, 11 % de 11 600 € à 29 579 € (1 977,69 €) et 30 % sur les 421 € restants (126,30 €). Son impôt est de 2 103,99 €.",
    "Son taux marginal est de 30 %, mais son taux moyen n'est que de 7,01 %.",
  ],
  faq: [
    {
      pregunta: "Quelle est la différence entre taux marginal et taux moyen ?",
      respuesta:
        "Le taux marginal est celui de la tranche la plus haute atteinte par votre quotient. Seule la partie du revenu dans cette tranche est taxée à ce taux. Le taux moyen est l'impôt divisé par le revenu : c'est ce que vous payez réellement.",
    },
    {
      pregunta: "Comment fonctionne la décote ?",
      respuesta:
        "Elle réduit l'impôt des foyers faiblement imposés. Pour une personne seule dont l'impôt est de 1 400 €, la décote est de {{fr.decote-forfait-seul}} moins {{fr.decote-taux}} de 1 400 €, soit 263,50 €. L'impôt tombe à 1 136,50 €.",
    },
    {
      pregunta: "Pourquoi mon impôt est-il de zéro alors que le calcul donne un petit montant ?",
      respuesta: "Un impôt inférieur à {{fr.seuil-recouvrement}} après décote n'est pas réclamé par l'administration.",
    },
    {
      pregunta: "Ce calcul tient-il compte des crédits d'impôt ?",
      respuesta:
        "Non. Les réductions et crédits d'impôt (dons, emploi d'un salarié à domicile, frais de garde des jeunes enfants) se retirent ensuite du montant affiché.",
    },
  ],
  glosario: [
    { termino: "Quotient familial", definicion: "Le revenu imposable divisé par le nombre de parts du foyer." },
    { termino: "Revenu net imposable", definicion: "Les revenus déclarés après les déductions, comme les 10 % pour frais professionnels." },
    { termino: "Décote", definicion: "Réduction automatique de l'impôt des foyers les moins imposés." },
    { termino: "TMI", definicion: "Taux marginal d'imposition : le taux de la tranche la plus haute atteinte." },
  ],
});
