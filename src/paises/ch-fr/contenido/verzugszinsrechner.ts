import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-fr.verzugszinsrechner",
  h1: "Calcul de l'intérêt moratoire en Suisse : {{ch.verzugszins}} selon le CO",
  title: "Intérêt moratoire Suisse : {{ch.verzugszins}} selon l'art. 104 CO",
  description: "Calculer l'intérêt moratoire d'une facture impayée : {{ch.verzugszins}} par an selon l'art. 104 CO ou un intérêt contractuel plus élevé, au jour près.",
  intro: [
    "Le débiteur qui ne paie pas une dette d'argent à temps doit des intérêts dès la demeure. Le Code des obligations fixe l'intérêt moratoire à {{ch.verzugszins}} par an, même si un intérêt contractuel plus bas a été convenu.",
    "Si un intérêt plus élevé a été convenu, il peut aussi être exigé pendant la demeure.",
  ],
  comoSeCalcula: [
    "Intérêt moratoire = montant × taux × jours de demeure / jours d'intérêt par an.",
    "Le calcul compte les jours civils du début de la demeure jusqu'à la date choisie.",
    "Vous choisissez si l'année compte 365 ou 360 jours d'intérêt. Avec 360 jours, l'intérêt est un peu plus élevé.",
  ],
  ejemplo: [
    "Pour 5000 francs en demeure depuis 213 jours, l'intérêt moratoire s'élève à environ 146 francs.",
  ],
  faq: [
    { pregunta: "Quel est le taux de l'intérêt moratoire en Suisse ?", respuesta: "{{ch.verzugszins}} par an, si rien de plus élevé n'a été convenu. Entre commerçants, un taux plus élevé peut s'appliquer lorsque l'escompte bancaire usuel au lieu du paiement dépasse cette valeur." },
    { pregunta: "À partir de quand l'intérêt moratoire court-il ?", respuesta: "Dès la demeure. Si la dette est exigible, le débiteur est mis en demeure par l'interpellation du créancier. Si un jour d'échéance a été convenu, il est en demeure dès l'expiration de ce jour." },
    { pregunta: "Peut-on demander des intérêts sur les intérêts moratoires ?", respuesta: "Non. Il n'est pas permis de calculer des intérêts moratoires sur des intérêts moratoires. Le calculateur ne porte intérêt que sur le montant d'origine." },
  ],
  glosario: [
    { termino: "Demeure", definicion: "Le débiteur ne paie pas une dette exigible malgré l'interpellation ou après le jour d'échéance convenu." },
    { termino: "Jour d'échéance", definicion: "Jour convenu auquel un paiement doit être effectué au plus tard." },
  ],
});
