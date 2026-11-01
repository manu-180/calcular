import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tg.impot-sur-les-societes",
  h1: "Calcul de l'impôt sur les sociétés au Togo",
  title: "Impôt sur les sociétés Togo : IS à {{tg.is-taux}} et MFP",
  description:
    "Calculez l'impôt sur les sociétés au Togo : IS de {{tg.is-taux}} du bénéfice, comparé au minimum forfaitaire de perception de {{tg.mfp[taux]}} du chiffre d'affaires.",
  intro: [
    "Les sociétés togolaises paient l'impôt sur les sociétés sur leur bénéfice. Quand il est faible ou en cas de déficit, c'est le minimum forfaitaire de perception (MFP) qui s'applique.",
    "Indiquez le bénéfice imposable et le chiffre d'affaires de l'exercice pour connaître l'impôt dû et les acomptes de l'année suivante.",
  ],
  comoSeCalcula: [
    "L'IS est égal à {{tg.is-taux}} du bénéfice imposable, dont on néglige la fraction inférieure à 1 000 F.",
    "Le MFP est égal à {{tg.mfp[taux]}} du chiffre d'affaires hors TVA, sans pouvoir être inférieur à {{tg.mfp-minimum}} au régime du réel.",
    "L'entreprise paie le plus élevé des deux. L'année suivante, elle verse quatre acomptes égaux au quart de cet impôt, arrondis au millier inférieur.",
  ],
  ejemplo: ["Avec 10 000 000 F de bénéfice et 200 000 000 F de chiffre d'affaires, l'IS est de 2 700 000 F et dépasse le MFP de 2 000 000 F."],
  faq: [
    {
      pregunta: "Le MFP est-il perdu si l'IS est plus élevé ?",
      respuesta: "Non. Le MFP n'est dû que si le résultat fiscal ne donne pas un impôt supérieur. Les acomptes payés en trop sont remboursés ou imputés.",
    },
    {
      pregunta: "Le taux du MFP est-il toujours de {{tg.mfp[taux]}} ?",
      respuesta: "Il est porté à {{tg.mfp[taux-vehicules-occasion]}} pour l'importation de véhicules d'occasion destinés à la revente.",
    },
    {
      pregunta: "Le calcul s'applique-t-il aux entreprises individuelles ?",
      respuesta:
        "Le taux de l'IS ne vise que les sociétés. Une entreprise individuelle relève de l'IRPP sur les revenus d'affaires ou, si elle en remplit les conditions, de la taxe professionnelle unique.",
    },
  ],
  glosario: [
    { termino: "MFP", definicion: "Minimum forfaitaire de perception, impôt minimum calculé sur le chiffre d'affaires." },
    { termino: "Acompte", definicion: "Versement provisionnel effectué pendant l'année et imputé sur l'impôt définitif." },
  ],
});
