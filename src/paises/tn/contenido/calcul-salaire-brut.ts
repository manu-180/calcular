import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tn.calcul-salaire-brut",
  h1: "Calcul du salaire brut à partir du net en Tunisie",
  title: "Salaire net en brut Tunisie : calcul inverse {{anio}}",
  description:
    "Quel salaire brut pour toucher un net donné en Tunisie ? Le calcul remonte du net au brut avec la CNSS de {{tn.cnss-salarie}}, l'IRPP et la contribution de solidarité.",
  intro: [
    "Pour négocier une embauche ou une augmentation, on part souvent du salaire net que l'on veut toucher. Le contrat, lui, fixe un salaire brut.",
    "Indiquez le net mensuel souhaité et votre situation de famille. Le calcul cherche le brut qui donne exactement ce net après la cotisation CNSS, l'impôt sur le revenu et la contribution sociale de solidarité.",
  ],
  comoSeCalcula: [
    "Le calcul applique les mêmes règles que le passage du brut au net : CNSS de {{tn.cnss-salarie}}, frais professionnels de {{tn.frais-professionnels-taux}} dans la limite de {{tn.frais-professionnels-plafond}} par an, déductions familiales, barème progressif et contribution de {{tn.css-majoration}}.",
    "Comme l'impôt est progressif, on ne peut pas simplement diviser le net par un taux. Le calcul essaie des bruts de plus en plus proches jusqu'à retrouver le net demandé, au millime près.",
  ],
  faq: [
    {
      pregunta: "Comment passer du salaire net au salaire brut en Tunisie ?",
      respuesta:
        "Il faut retrouver le brut dont on retire la CNSS, l'IRPP et la contribution sociale de solidarité pour obtenir le net. Le barème étant progressif, l'écart entre brut et net grandit avec le salaire.",
    },
    {
      pregunta: "La situation de famille change-t-elle le brut nécessaire ?",
      respuesta:
        "Oui. Le chef de famille déduit {{tn.deductions-famille[chef-de-famille]}} par an et {{tn.deductions-famille[par-enfant]}} par enfant à charge, ce qui réduit l'impôt. Pour un même net, il lui faut un brut un peu plus bas.",
    },
    {
      pregunta: "Le résultat vaut-il pour tous les secteurs ?",
      respuesta:
        "Il vaut pour un salarié du secteur non agricole affilié à la CNSS, avec un salaire stable sur l'année. Les primes versées certains mois et les régimes particuliers changent les retenues.",
    },
  ],
  glosario: [
    { termino: "Salaire brut", definicion: "Salaire avant les retenues de sécurité sociale et d'impôt, inscrit au contrat." },
    { termino: "Salaire net", definicion: "Montant versé au salarié après toutes les retenues." },
    { termino: "Barème progressif", definicion: "Taux d'impôt qui augmente par tranches de revenu." },
  ],
});
