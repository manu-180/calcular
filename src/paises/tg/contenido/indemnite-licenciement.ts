import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tg.indemnite-licenciement",
  h1: "Calcul de l'indemnité de licenciement au Togo",
  title: "Indemnité de licenciement Togo : calcul selon le Code",
  description:
    "Calculez l'indemnité légale de licenciement au Togo : {{tg.licenciement-taux[0].tasa}} à {{tg.licenciement-taux[-1].tasa}} du salaire moyen par année de présence, plus le mois du motif économique.",
  intro: [
    "Le salarié en CDI licencié après au moins douze mois d'ancienneté a droit à une indemnité de licenciement, sauf faute grave ou lourde.",
    "Indiquez votre salaire moyen des douze derniers mois, votre ancienneté et le motif pour obtenir le minimum prévu par le Code du travail.",
  ],
  comoSeCalcula: [
    "Chaque année de présence vaut {{tg.licenciement-taux[0].tasa}} du salaire global mensuel moyen pour les cinq premières années.",
    "De la sixième à la dixième année, chaque année vaut {{tg.licenciement-taux[1].tasa}}, puis {{tg.licenciement-taux[2].tasa}} au-delà de la dixième.",
    "En cas de licenciement pour motif économique, s'ajoute une mesure d'accompagnement d'au moins {{tg.mesure-accompagnement}} de salaire brut.",
  ],
  ejemplo: ["Avec 300 000 F de salaire moyen et sept ans de présence : 5 × 35 % + 2 × 40 % = 255 %, soit 765 000 F."],
  faq: [
    {
      pregunta: "Quel salaire faut-il retenir ?",
      respuesta: "Le salaire global mensuel moyen des douze mois d'activité qui précèdent le licenciement, selon l'article 97 du Code du travail.",
    },
    {
      pregunta: "L'indemnité s'ajoute-t-elle au préavis ?",
      respuesta:
        "Oui. L'indemnité compensatrice de préavis, celle de congés payés et l'indemnité de licenciement sont distinctes. Un licenciement abusif peut en plus ouvrir droit à des dommages et intérêts.",
    },
    {
      pregunta: "Une convention collective peut-elle prévoir plus ?",
      respuesta: "Oui. Le Code fixe un minimum : une convention ou un accord collectif plus favorable s'applique à sa place.",
    },
  ],
  glosario: [
    { termino: "Faute lourde", definicion: "Faute d'une gravité exceptionnelle qui prive le salarié de son indemnité et de son préavis." },
    { termino: "Mesure d'accompagnement", definicion: "Somme non imposable due en plus en cas de licenciement économique." },
  ],
});
