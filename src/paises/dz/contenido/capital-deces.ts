import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dz.capital-deces",
  h1: "Capital décès de la CNAS en Algérie",
  title: "Capital décès Algérie : montant versé aux ayants droit",
  description:
    "Le capital décès vaut {{dz.capital-deces[salaire]}} fois le salaire mensuel le plus favorable de l'assuré, avec un minimum de {{dz.capital-deces[minimum]}} fois le SNMG. Calculez le montant.",
  intro: [
    "Au décès d'un salarié assuré social, la CNAS verse à ses ayants droit un capital décès, en une seule fois.",
    "Indiquez le salaire mensuel le plus élevé perçu durant l'année précédant le décès pour connaître le montant du capital.",
  ],
  comoSeCalcula: [
    "Capital = {{dz.capital-deces[salaire]}} × le salaire mensuel le plus favorable soumis à cotisation durant l'année précédant le décès.",
    "Minimum = {{dz.capital-deces[minimum]}} × le SNMG, soit {{dz.capital-deces[minimum]}} × {{dz.snmg}}.",
  ],
  faq: [
    {
      pregunta: "Qui reçoit le capital décès ?",
      respuesta:
        "Les ayants droit de l'assuré au sens de l'article 67 de la loi n° 83-11 : le conjoint, les enfants à charge et les ascendants à charge dont les ressources ne dépassent pas la pension de retraite minimale.",
    },
    {
      pregunta: "Quelle condition de travail faut-il remplir ?",
      respuesta: "L'assuré doit avoir travaillé au moins quinze jours ou cent heures durant les trois mois qui ont précédé le décès.",
    },
    {
      pregunta: "Le capital est-il versé en plusieurs fois ?",
      respuesta: "Non. Il est versé en une seule fois, immédiatement après le décès de l'assuré.",
    },
  ],
  glosario: [
    { termino: "Ayants droit", definicion: "Membres de la famille de l'assuré qui bénéficient de ses droits à la sécurité sociale." },
    { termino: "SNMG", definicion: "Salaire national minimum garanti, fixé par décret présidentiel." },
  ],
});
