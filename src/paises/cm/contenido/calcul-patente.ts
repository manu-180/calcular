import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cm.calcul-patente",
  h1: "Calcul de la patente au Cameroun",
  title: "Calcul patente Cameroun : contribution des patentes",
  description:
    "Calculez la contribution des patentes sur le chiffre d'affaires : {{cm.patente-taux[petite]}} pour une petite entreprise, avec minimum et maximum par catégorie.",
  intro: [
    "La contribution des patentes est un impôt communal annuel dû par les entreprises du régime du réel. Celles de l'impôt général synthétique ne la paient pas.",
    "Elle se calcule sur le chiffre d'affaires du dernier exercice clos, avec un taux, un minimum et un maximum selon la taille de l'entreprise.",
  ],
  comoSeCalcula: [
    "Petites entreprises : {{cm.patente-taux[petite]}} du chiffre d'affaires, entre {{cm.patente-plancher[petite]}} et {{cm.patente-plafond[petite]}}.",
    "Moyennes entreprises : {{cm.patente-taux[moyenne]}}, entre {{cm.patente-plancher[moyenne]}} et {{cm.patente-plafond[moyenne]}}.",
    "Grandes entreprises : {{cm.patente-taux[grande]}}, entre {{cm.patente-plancher[grande]}} et {{cm.patente-plafond[grande]}}.",
  ],
  ejemplo: ["Une moyenne entreprise qui a réalisé 300 millions de chiffre d'affaires paie 849 000 F de patente."],
  faq: [
    {
      pregunta: "Que comprend le montant de la patente ?",
      respuesta: "Le principal de la patente, la taxe de développement local, les centimes additionnels des chambres consulaires et la redevance audiovisuelle. Ils sont ensuite répartis entre leurs bénéficiaires.",
    },
    {
      pregunta: "Une entreprise nouvelle paie-t-elle la patente ?",
      respuesta: "Non pendant ses douze premiers mois, vingt-quatre si elle adhère à un centre de gestion agréé.",
    },
    {
      pregunta: "Et si j'ai plusieurs établissements ?",
      respuesta: "La patente porte sur le chiffre d'affaires global, puis elle est répartie entre les établissements selon le chiffre d'affaires de chacun.",
    },
  ],
  glosario: [{ termino: "Patente", definicion: "Impôt communal annuel sur l'exercice d'une activité commerciale, industrielle ou libérale." }],
});
