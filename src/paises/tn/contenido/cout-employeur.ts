import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tn.cout-employeur",
  h1: "Coût d'un salarié pour l'employeur en Tunisie",
  title: "Coût employeur Tunisie : salaire brut et charges CNSS",
  description:
    "Calculez le coût total d'un salarié en Tunisie : salaire brut, cotisations patronales CNSS de {{tn.cnss-employeur}} et cotisation accidents du travail.",
  intro: [
    "Embaucher coûte plus que le salaire brut. L'employeur verse à la CNSS sa propre part des cotisations sociales, ainsi qu'une cotisation accidents du travail qui dépend de l'activité.",
    "Indiquez le salaire brut mensuel et votre taux accidents du travail pour obtenir le coût mensuel et annuel.",
  ],
  comoSeCalcula: [
    "Cotisations patronales : salaire brut × {{tn.cnss-employeur}}.",
    "Accidents du travail : salaire brut × votre taux, compris entre {{tn.accidents-travail[minimum]}} et {{tn.accidents-travail[maximum]}}.",
    "Coût = salaire brut + cotisations patronales + accidents du travail.",
  ],
  faq: [
    {
      pregunta: "Combien coûte un salarié en Tunisie en plus de son salaire ?",
      respuesta: "Au minimum {{tn.cnss-employeur}} de cotisations patronales, plus la cotisation accidents du travail de {{tn.accidents-travail[minimum]}} à {{tn.accidents-travail[maximum]}} selon l'activité.",
    },
    {
      pregunta: "Où trouver mon taux accidents du travail ?",
      respuesta: "Il est fixé selon l'activité économique de l'entreprise et communiqué par la CNSS lors de l'affiliation.",
    },
    {
      pregunta: "La part salariale entre-t-elle dans le coût employeur ?",
      respuesta: "Elle est déjà comprise dans le salaire brut : l'employeur la retient sur le salaire et la reverse à la CNSS.",
    },
  ],
  glosario: [
    { termino: "Salaire brut", definicion: "Rémunération avant les retenues de cotisations et d'impôt." },
    { termino: "Charges patronales", definicion: "Cotisations sociales payées par l'employeur en plus du salaire brut." },
    { termino: "Accidents du travail", definicion: "Régime qui couvre les accidents survenus au travail et les maladies professionnelles." },
  ],
});
