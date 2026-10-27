import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cm.smig",
  h1: "SMIG au Cameroun",
  title: "SMIG Cameroun : salaire minimum par secteur",
  description:
    "Le SMIG est de {{cm.smig[general]}} par mois dans la plupart des secteurs et de {{cm.smig[agricole]}} dans l'agriculture. Comparez votre salaire au minimum.",
  intro: [
    "Le salaire minimum interprofessionnel garanti (SMIG) est fixé par décret du Premier ministre. Il varie selon le secteur.",
    "Choisissez votre secteur pour voir le minimum mensuel et, si vous le souhaitez, comparez-le à votre salaire.",
  ],
  comoSeCalcula: [
    "Autres secteurs : {{cm.smig[general]}} par mois. Secteur agricole et assimilé : {{cm.smig[agricole]}}.",
    "Agents de l'État relevant du Code du travail : {{cm.smig[etat]}} depuis le {{cm.smig#desde}}.",
    "Le SMIG sur l'année est le montant mensuel multiplié par 12.",
  ],
  ejemplo: ["Un salarié du commerce payé 55 000 F par mois touche 5 000 F de moins que le SMIG de son secteur."],
  faq: [
    {
      pregunta: "Le SMIG est-il le même pour tous ?",
      respuesta: "Non. Le décret de 2023 fixe trois montants : un pour les agents de l'État relevant du Code du travail, un pour le secteur agricole et un pour les autres secteurs.",
    },
    {
      pregunta: "Le SMIG a-t-il changé en 2024 ?",
      respuesta: "Seulement pour les agents de l'État relevant du Code du travail, passés à {{cm.smig[etat]}}. Les autres montants restent ceux du décret de 2023.",
    },
    {
      pregunta: "Le SMIG est-il soumis à l'IRPP ?",
      respuesta: "Non. Il est sous le seuil de retenue de l'IRPP prévu par le Code général des impôts. Il reste les retenues CNPS, Crédit foncier et redevance audiovisuelle.",
    },
  ],
  glosario: [{ termino: "SMIG", definicion: "Salaire minimum interprofessionnel garanti : le plus bas salaire mensuel autorisé dans un secteur." }],
});
