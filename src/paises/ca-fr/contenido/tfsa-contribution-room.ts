import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca-fr.tfsa-contribution-room",
  h1: "Calcul des droits de cotisation au CELI 2026",
  title: "Droits de cotisation au CELI 2026 : calcul",
  description: "Additionnez les plafonds du CELI depuis vos 18 ans (dès 2009), ajoutez les retraits passés et soustrayez les cotisations. Plafond de 2026 : {{ca.tfsa-annual-limits[2026]}}.",
  intro: [
    "Inscrivez l'année où vous êtes devenu admissible, vos cotisations et vos retraits faits avant cette année pour estimer vos droits de cotisation au CELI aujourd'hui.",
    "Le calcul utilise le plafond annuel du CELI de chaque année depuis 2009, publié par l'Agence du revenu du Canada.",
  ],
  comoSeCalcula: [
    "Les droits s'accumulent chaque année à partir de l'année de vos 18 ans où vous résidez au Canada, au plus tôt en 2009.",
    "Chaque année ajoute son plafond : {{ca.tfsa-annual-limits[2009]}} de 2009 à 2012, {{ca.tfsa-annual-limits[2015]}} en 2015, {{ca.tfsa-annual-limits[2023]}} en 2023 et {{ca.tfsa-annual-limits[2026]}} en 2026, entre autres.",
    "Les retraits des années précédentes s'ajoutent. Les cotisations se soustraient.",
  ],
  ejemplo: [
    "Une personne qui avait 18 ans ou plus et résidait au Canada en 2009 et qui n'a jamais cotisé a 109 000 $ de droits en 2026.",
  ],
  faq: [
    {
      pregunta: "Quel est le plafond du CELI pour 2026?",
      respuesta: "Le plafond annuel de 2026 est de {{ca.tfsa-annual-limits[2026]}}.",
    },
    {
      pregunta: "Quand un retrait me redonne-t-il des droits?",
      respuesta: "Un retrait s'ajoute à vos droits au début de l'année suivante. C'est pourquoi la calculatrice ne compte que les retraits faits avant cette année.",
    },
    {
      pregunta: "Comment connaître mes droits exacts?",
      respuesta: "Mon dossier de l'ARC indique vos droits de cotisation au CELI une fois les relevés de l'année traités. Comparez-les avec les relevés de votre institution financière avant de cotiser.",
    },
  ],
  glosario: [
    { termino: "CELI", definicion: "Compte d'épargne libre d'impôt. Les revenus de placement et les retraits ne sont pas imposés." },
    { termino: "Droits de cotisation", definicion: "Le montant que vous pouvez verser dans vos CELI sans dépasser le plafond." },
  ],
});
