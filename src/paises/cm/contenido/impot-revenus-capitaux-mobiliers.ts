import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cm.impot-revenus-capitaux-mobiliers",
  h1: "Impôt sur les dividendes et revenus de capitaux mobiliers",
  title: "Impôt sur les dividendes au Cameroun : retenue à la source",
  description:
    "Calculez l'impôt retenu sur vos dividendes ou intérêts : {{cm.rcm-taux[general]}} libératoire plus {{cm.cac}} de centimes additionnels communaux.",
  intro: [
    "Les dividendes, intérêts et plus-values sur titres sont des revenus de capitaux mobiliers. L'impôt est retenu à la source par la société ou la banque qui paie.",
    "Ce prélèvement est libératoire : vous n'avez pas d'autre IRPP à payer sur ces revenus.",
  ],
  comoSeCalcula: [
    "Le taux général est de {{cm.rcm-taux[general]}} du montant brut.",
    "Il est de {{cm.rcm-taux[dividendes-pme]}} pour les dividendes d'une société dont le chiffre d'affaires ne dépasse pas {{cm.is-seuil-pme}}, et de {{cm.rcm-taux[paradis-fiscal]}} si le bénéficiaire est établi dans un paradis fiscal.",
    "Les centimes additionnels communaux ajoutent {{cm.cac}} de l'impôt.",
  ],
  ejemplo: ["Sur 1 000 000 F de dividendes au taux général : 150 000 F d'impôt et 15 000 F de CAC. Vous recevez 835 000 F."],
  faq: [
    {
      pregunta: "Faut-il déclarer ces revenus ?",
      respuesta: "Oui, dans la déclaration annuelle récapitulative des revenus, avec la retenue déjà subie. L'impôt reste libératoire.",
    },
    {
      pregunta: "Quel est le taux global avec les centimes communaux ?",
      respuesta: "Le principal plus {{cm.cac}} de ce principal.",
    },
    {
      pregunta: "Les revenus d'actifs numériques sont-ils concernés ?",
      respuesta: "Oui. Le Code général des impôts range les revenus tirés des actifs numériques parmi les revenus de capitaux mobiliers.",
    },
  ],
  glosario: [{ termino: "Prélèvement libératoire", definicion: "Impôt retenu à la source qui solde l'impôt dû sur ces revenus." }],
});
