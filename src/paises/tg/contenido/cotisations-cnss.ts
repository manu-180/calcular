import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tg.cotisations-cnss",
  h1: "Calcul des cotisations CNSS au Togo",
  title: "Cotisations CNSS Togo : part salariale et patronale",
  description:
    "Calculez les cotisations CNSS et AMU d'un salaire au Togo : {{tg.cnss-taux[pension-salarie]}} et {{tg.amu-taux[salarie]}} pour le travailleur, le reste pour l'employeur.",
  intro: [
    "Chaque mois, l'employeur déclare et verse à la CNSS les cotisations de sécurité sociale et celles de l'assurance maladie universelle, sa part et celle du travailleur.",
    "Indiquez la rémunération brute du mois pour voir ce qui est retenu sur le salaire et ce que paie l'entreprise, branche par branche.",
  ],
  comoSeCalcula: [
    "L'assiette est toute la rémunération, primes et avantages en nature compris, sans plafond. Elle ne peut pas être inférieure au SMIG.",
    "Le travailleur paie {{tg.cnss-taux[pension-salarie]}} pour la pension de vieillesse et {{tg.amu-taux[salarie]}} pour l'AMU.",
    "L'employeur paie {{tg.cnss-taux[pension-employeur]}} pour les pensions, {{tg.cnss-taux[prestations-familiales]}} pour les prestations familiales, {{tg.cnss-taux[risques-professionnels]}} pour les risques professionnels et {{tg.amu-taux[employeur]}} pour l'AMU.",
  ],
  ejemplo: [
    "Pour 200 000 F bruts : 18 000 F retenus sur le salaire et 45 000 F à la charge de l'employeur, soit 63 000 F versés à la CNSS.",
  ],
  faq: [
    {
      pregunta: "Les cotisations CNSS ont-elles un plafond ?",
      respuesta: "Non. La CNSS les calcule sur l'ensemble des rémunérations, sans plafond. Seul un plancher existe : le SMIG.",
    },
    {
      pregunta: "Pourquoi l'AMU apparaît-elle avec la CNSS ?",
      respuesta:
        "Depuis le 1er janvier 2024, la CNSS gère l'assurance maladie universelle des salariés du privé. La cotisation est versée avec les autres cotisations sociales.",
    },
    {
      pregunta: "Quand l'employeur doit-il payer ?",
      respuesta: "La CNSS indique que le paiement accompagne l'appel de cotisation du mois, au plus tard le 15 du mois suivant.",
    },
  ],
  glosario: [
    { termino: "CNSS", definicion: "Caisse nationale de sécurité sociale du Togo." },
    { termino: "Assiette", definicion: "Le montant sur lequel les taux de cotisation s'appliquent." },
  ],
});
