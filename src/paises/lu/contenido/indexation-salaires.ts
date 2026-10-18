import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lu.indexation-salaires",
  h1: "Indexation des salaires au Luxembourg : prochaine tranche",
  title: "Indexation des salaires Luxembourg : prochaine tranche",
  description: "Où en est la prochaine tranche indiciaire au Luxembourg ? Moyenne semestrielle de l'IPCN, cote d'échéance et votre salaire après une hausse de 2,5 %.",
  intro: [
    "Au Luxembourg, les salaires sont indexés à l'évolution du coût de la vie. Lorsque l'indice augmente de 2,5 %, les salaires sont adaptés dans la même proportion.",
    "Le calculateur compare la dernière moyenne semestrielle de l'IPCN à la prochaine cote d'échéance et montre votre salaire après la tranche.",
  ],
  comoSeCalcula: [
    "Prochaine cote : la cote d'échéance actuelle, {{lu.cote-echeance}}, majorée de 2,5 %.",
    "Reste à parcourir : écart entre la prochaine cote et la dernière moyenne semestrielle publiée par STATEC.",
    "Salaire après la tranche : salaire actuel x 1,025. Le nombre indice applicable est actuellement de {{lu.nombre-indice}}.",
  ],
  ejemplo: [
    "En septembre 2026, la moyenne semestrielle de l'IPCN était de 1.058,56 pour une prochaine cote de 1.064,75. Un salaire de 5.000 euros passerait à 5.125 euros.",
  ],
  faq: [
    { pregunta: "Quand a eu lieu la dernière tranche ?", respuesta: "Au 1er juin 2026. Le nombre indice applicable est passé à {{lu.nombre-indice}}." },
    { pregunta: "Tous les salaires sont-ils indexés ?", respuesta: "Oui, les salaires, traitements et prestations sociales, y compris le salaire social minimum. Pour les salariés détachés au Luxembourg, seul le salaire minimum est indexé." },
    { pregunta: "Qu'est-ce que le salaire à l'indice 100 ?", respuesta: "Le salaire ramené à la base de l'échelle mobile : salaire x 100 / nombre indice." },
  ],
  glosario: [
    { termino: "Cote d'échéance", definicion: "Valeur de la moyenne semestrielle de l'IPCN qui déclenche une tranche indiciaire." },
    { termino: "Nombre indice", definicion: "Coefficient appliqué aux salaires exprimés à l'indice 100." },
  ],
});
