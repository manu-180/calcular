import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cm.calcul-irpp",
  h1: "Calcul de l'IRPP sur salaire au Cameroun",
  title: "Calcul IRPP Cameroun : impôt sur salaire et CAC",
  description:
    "Calculez l'IRPP retenu sur votre salaire : abattements du CGI, barème de {{cm.irpp-bareme[0].tasa}} à {{cm.irpp-bareme[-1].tasa}} et centimes additionnels communaux.",
  intro: [
    "L'impôt sur le revenu des personnes physiques (IRPP) est retenu chaque mois par l'employeur. Il s'y ajoute {{cm.cac}} de centimes additionnels communaux.",
    "Indiquez votre brut mensuel ou annuel. Le calcul montre la base imposable, l'impôt de l'année et la retenue du mois.",
  ],
  comoSeCalcula: [
    "On part du brut taxable de l'année et on retire {{cm.irpp-frais-professionnels}} de frais professionnels, au plus {{cm.irpp-plafond-frais}}.",
    "On retire aussi la pension CNPS payée par le salarié, puis l'abattement forfaitaire de {{cm.irpp-abattement}}.",
    "Le barème s'applique par tranches : {{cm.irpp-bareme[0].tasa}} jusqu'à {{cm.irpp-bareme[0].hasta}}, {{cm.irpp-bareme[1].tasa}} jusqu'à {{cm.irpp-bareme[1].hasta}}, {{cm.irpp-bareme[2].tasa}} jusqu'à {{cm.irpp-bareme[2].hasta}} et {{cm.irpp-bareme[3].tasa}} au-delà.",
    "Les centimes additionnels communaux valent {{cm.cac}} de l'impôt. La retenue du mois est l'impôt de l'année divisé par 12.",
  ],
  ejemplo: [
    "Pour 500 000 F par mois : 6 000 000 F sur l'année, moins 1 800 000 F de frais, 252 000 F de CNPS et 500 000 F d'abattement. La base est de 3 448 000 F et l'IRPP de 462 000 F, soit 38 500 F par mois plus 3 850 F de centimes communaux.",
  ],
  faq: [
    {
      pregunta: "À partir de quel salaire l'IRPP est-il retenu ?",
      respuesta: "L'employeur ne retient pas d'IRPP sur un brut mensuel inférieur à {{cm.irpp-seuil-retenue}}.",
    },
    {
      pregunta: "Le taux le plus élevé s'applique-t-il à tout le salaire ?",
      respuesta: "Non. Chaque tranche du revenu imposable paie son propre taux. Seule la partie au-dessus de {{cm.irpp-bareme[3].desde}} par an paie {{cm.irpp-bareme[3].tasa}}.",
    },
    {
      pregunta: "Dois-je déclarer mes revenus si l'employeur retient déjà l'impôt ?",
      respuesta:
        "Oui. Le CGI demande à chaque salarié une déclaration annuelle récapitulative de ses revenus, que l'on peut souscrire en ligne. Les retenues déjà faites y figurent.",
    },
  ],
  glosario: [
    { termino: "IRPP", definicion: "Impôt sur le revenu des personnes physiques, retenu à la source sur les salaires." },
    { termino: "Abattement forfaitaire", definicion: "Somme fixe retirée du revenu net des salaires avant d'appliquer le barème." },
  ],
});
