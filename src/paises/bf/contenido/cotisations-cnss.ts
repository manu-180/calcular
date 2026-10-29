import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bf.cotisations-cnss",
  h1: "Calcul des cotisations CNSS",
  title: "Cotisations CNSS Burkina Faso : part salariale et patronale",
  description:
    "Calculez les cotisations sociales CNSS : {{bf.cnss-taux[vieillesse-salarie]}} pour le travailleur, le reste pour l'employeur, sur un salaire plafonné à {{bf.cnss-plafond}}.",
  intro: [
    "Chaque mois, l'employeur déclare et verse à la Caisse nationale de sécurité sociale (CNSS) les cotisations de ses salariés.",
    "Indiquez la rémunération brute du mois. Vous obtenez la retenue sur le salaire, la part de l'employeur et le total à verser.",
  ],
  comoSeCalcula: [
    "Le travailleur cotise {{bf.cnss-taux[vieillesse-salarie]}} pour l'assurance vieillesse. Cette part est retenue sur son salaire.",
    "L'employeur paie {{bf.cnss-taux[vieillesse-employeur]}} pour l'assurance vieillesse, {{bf.cnss-taux[prestations-familiales]}} pour les prestations familiales et {{bf.cnss-taux[risques-professionnels]}} pour les risques professionnels.",
    "L'assiette est limitée à {{bf.cnss-plafond}} par mois et ne peut pas être inférieure au SMIG ({{bf.smig}}).",
  ],
  ejemplo: ["Pour 150 000 F bruts : 8 250 F à la charge du travailleur et 24 000 F à la charge de l'employeur, soit 32 250 F versés à la CNSS."],
  faq: [
    {
      pregunta: "Sur quels éléments du salaire cotise-t-on ?",
      respuesta:
        "Sur toute la rémunération : salaire, primes, gratifications, indemnités et avantages en nature comme le logement ou le véhicule de fonction. Les remboursements de frais et les prestations familiales n'entrent pas dans l'assiette.",
    },
    {
      pregunta: "Quand faut-il payer les cotisations ?",
      respuesta:
        "Chaque mois, dans les 15 jours qui suivent la fin du mois, pour les entreprises de 20 salariés et plus. Chaque trimestre, dans les 30 jours qui suivent, pour les autres.",
    },
    {
      pregunta: "Un travailleur indépendant peut-il cotiser ?",
      respuesta: "Oui, par l'assurance volontaire. La cotisation est de {{bf.cnss-assurance-volontaire}} pour la branche des pensions et elle est entièrement à sa charge.",
    },
  ],
  glosario: [
    { termino: "Assiette", definicion: "Le montant de salaire sur lequel on applique les taux de cotisation." },
    { termino: "Plafond", definicion: "Le montant mensuel au-delà duquel le salaire ne cotise plus." },
  ],
});
