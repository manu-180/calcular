import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tn.cotisations-cnss",
  h1: "Calcul des cotisations CNSS en Tunisie",
  title: "Cotisations CNSS Tunisie : part salariale et patronale",
  description:
    "Calculez les cotisations CNSS sur un salaire en Tunisie : {{tn.cnss-salarie}} à la charge du salarié et {{tn.cnss-employeur}} à la charge de l'employeur dans le secteur non agricole.",
  intro: [
    "Dans le secteur non agricole, les cotisations de sécurité sociale sont partagées entre le salarié et l'employeur. Elles portent sur l'ensemble des salaires, primes et avantages liés à l'emploi.",
    "Indiquez le salaire brut mensuel pour voir chaque part et le total à déclarer chaque trimestre.",
  ],
  comoSeCalcula: [
    "Part salariale : salaire brut × {{tn.cnss-salarie}}.",
    "Part patronale : salaire brut × {{tn.cnss-employeur}}.",
    "L'employeur paie en plus la cotisation accidents du travail, entre {{tn.accidents-travail[minimum]}} et {{tn.accidents-travail[maximum]}} selon l'activité.",
  ],
  faq: [
    {
      pregunta: "Quel est le taux de cotisation CNSS en Tunisie ?",
      respuesta: "Dans le secteur non agricole, {{tn.cnss-salarie}} pour le salarié et {{tn.cnss-employeur}} pour l'employeur, hors accidents du travail.",
    },
    {
      pregunta: "Quand l'employeur paie-t-il les cotisations ?",
      respuesta: "Chaque trimestre, au plus tard le 15 du mois qui suit le trimestre écoulé, avec la déclaration des salaires.",
    },
    {
      pregunta: "Les cotisations CNSS réduisent-elles l'impôt ?",
      respuesta: "Oui. La part salariale est retranchée du salaire brut avant le calcul de l'impôt sur le revenu.",
    },
  ],
  glosario: [
    { termino: "CNSS", definicion: "Caisse nationale de sécurité sociale." },
    { termino: "Assiette", definicion: "Ensemble des sommes sur lesquelles les cotisations sont calculées." },
    { termino: "Part patronale", definicion: "Cotisations à la charge de l'employeur, qui ne sont pas retenues sur le salaire." },
  ],
});
