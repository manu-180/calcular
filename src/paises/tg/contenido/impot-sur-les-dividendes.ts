import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tg.impot-sur-les-dividendes",
  h1: "Impôt sur les dividendes et les intérêts au Togo",
  title: "Impôt sur les dividendes Togo : retenue à la source",
  description:
    "Calculez la retenue sur vos dividendes et intérêts au Togo : {{tg.ircm-taux[distribues]}} en général, {{tg.ircm-taux[cotees]}} pour les sociétés cotées à la BRVM.",
  intro: [
    "Les dividendes et les intérêts versés à un particulier subissent une retenue à la source au titre de l'impôt sur le revenu des capitaux mobiliers.",
    "Choisissez le type de revenu et indiquez le montant brut pour connaître la retenue et la somme encaissée.",
  ],
  comoSeCalcula: [
    "Les revenus distribués par une société supportent une retenue de {{tg.ircm-taux[distribues]}}.",
    "Les dividendes des sociétés cotées sur une bourse agréée de l'UEMOA sont retenus à {{tg.ircm-taux[cotees]}}.",
    "Les revenus de placements à revenu fixe, comme les intérêts d'obligations, supportent {{tg.ircm-taux[interets]}} pour un particulier.",
  ],
  ejemplo: ["Sur 1 000 000 F de dividendes d'une société non cotée, la retenue est de 130 000 F et l'actionnaire encaisse 870 000 F."],
  faq: [
    {
      pregunta: "Faut-il déclarer ces revenus à l'IRPP ?",
      respuesta: "Non pour un particulier : la retenue est libératoire de l'impôt sur le revenu pour les produits auxquels elle s'applique.",
    },
    {
      pregunta: "Et si les titres appartiennent à une entreprise individuelle ?",
      respuesta: "Le caractère libératoire ne joue pas : les revenus entrent dans le bénéfice imposable de l'entreprise.",
    },
    {
      pregunta: "Les sociétés actionnaires paient-elles les mêmes taux ?",
      respuesta:
        "Les taux des personnes morales sont différents pour les sociétés cotées et les revenus fixes, et les dividendes entre société mère et filiale au Togo peuvent ne pas être retenus.",
    },
  ],
  glosario: [
    { termino: "BRVM", definicion: "Bourse régionale des valeurs mobilières de l'UEMOA." },
    { termino: "Retenue à la source", definicion: "Impôt prélevé par la société qui paie, avant le versement au bénéficiaire." },
  ],
});
