import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bj.smig",
  h1: "SMIG au Bénin en {{anio}} : salaire minimum mensuel",
  title: "SMIG Bénin {{anio}} : {{bj.smig}} par mois",
  description: "Le salaire minimum interprofessionnel garanti au Bénin est de {{bj.smig}} par mois, en vigueur depuis le {{bj.smig#desde}}. Comparez votre salaire.",
  intro: [
    "Le SMIG est le salaire mensuel le plus bas qu'un employeur peut verser à un travailleur à temps plein au Bénin. Il est de {{bj.smig}} depuis le {{bj.smig#desde}}.",
    "Saisissez le salaire que vous recevez ou qu'on vous propose. Le calcul indique s'il atteint le minimum et ce qu'il manque le cas échéant.",
  ],
  comoSeCalcula: [
    "Le décret n° 2022-692 du 7 décembre 2022 a relevé le SMIG de 40 000 à {{bj.smig}} francs CFA à compter du 1er janvier 2023.",
    "On compare votre salaire mensuel à ce montant. L'écart est le montant manquant, et le rapport au SMIG donne votre salaire exprimé en nombre de SMIG.",
    "Le SMIG sur douze mois est le montant mensuel multiplié par douze. Il ne comprend pas les retenues : il s'agit d'un salaire avant impôt et cotisations.",
  ],
  ejemplo: [
    "Une personne qui reçoit 45 000 F est à 0,87 SMIG : il lui manque 7 000 F pour atteindre 52 000 F. Sur l'année, le SMIG représente 624 000 F.",
  ],
  faq: [
    {
      pregunta: "Quel est le SMIG au Bénin ?",
      respuesta: "Le décret n° 2022-692 du 7 décembre 2022 fixe le SMIG à {{bj.smig}} par mois, depuis le {{bj.smig#desde}}.",
    },
    {
      pregunta: "Le SMIG s'applique-t-il à tous les secteurs ?",
      respuesta: "Il est interprofessionnel : il vaut pour toutes les branches. Une convention collective peut fixer des minimums plus élevés pour une catégorie.",
    },
    {
      pregunta: "Le SMIG est-il brut ou net ?",
      respuesta: "C'est un salaire brut mensuel. Les cotisations sociales et l'impôt sur les salaires se retirent ensuite.",
    },
  ],
  glosario: [
    { termino: "SMIG", definicion: "Salaire minimum interprofessionnel garanti, le plancher légal du salaire mensuel." },
    { termino: "Interprofessionnel", definicion: "Qui s'applique à tous les secteurs d'activité." },
    { termino: "Décret", definicion: "L'acte du gouvernement qui fixe le montant du SMIG." },
  ],
});
