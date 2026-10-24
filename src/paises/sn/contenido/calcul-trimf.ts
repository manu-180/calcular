import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sn.calcul-trimf",
  h1: "Calcul de la TRIMF au Sénégal",
  title: "TRIMF au Sénégal : montant selon votre salaire",
  description: "Trouvez la taxe représentative de l'impôt du minimum fiscal (TRIMF) retenue sur votre salaire, selon le tableau du Code général des impôts.",
  intro: [
    "La TRIMF est retenue à la source sur les salaires, les pensions et les rentes viagères.",
    "Inscrivez votre salaire brut mensuel pour voir le montant de l'année et la retenue par mois.",
  ],
  comoSeCalcula: [
    "Le montant se lit dans un tableau de six tranches selon le revenu brut annuel, avantages compris.",
    "Il va de {{sn.trimf[0].cuotaFija}} pour un revenu de moins de {{sn.trimf[0].hasta}} à {{sn.trimf[-1].cuotaFija}} à partir de {{sn.trimf[-1].desde}}.",
  ],
  faq: [
    {
      pregunta: "Qui retient la TRIMF?",
      respuesta: "L'employeur, en même temps que l'impôt sur le revenu, sur les salaires qu'il verse.",
    },
    {
      pregunta: "Combien de TRIMF pour 6 millions de francs par an?",
      respuesta: "{{sn.trimf[3].cuotaFija}} par an : ce revenu se situe dans la tranche de {{sn.trimf[3].desde}} à moins de {{sn.trimf[3].hasta}}.",
    },
    {
      pregunta: "Que se passe-t-il si trop de TRIMF a été retenue?",
      respuesta: "Le contribuable peut en demander le remboursement au Directeur chargé de l'assiette des impôts avant le 1er avril de l'année suivante.",
    },
  ],
  glosario: [
    { termino: "TRIMF", definicion: "Taxe représentative de l'impôt du minimum fiscal." },
    { termino: "Revenu brut", definicion: "Le salaire avant toute retenue, avec les avantages en argent et en nature." },
  ],
});
