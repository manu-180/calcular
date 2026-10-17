import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lu.heures-supplementaires",
  h1: "Calcul des heures supplémentaires au Luxembourg",
  title: "Heures supplémentaires Luxembourg : majoration de {{lu.majoration-heures-sup}}",
  description: "Heures supplémentaires au Luxembourg : repos d'une heure et demie par heure, ou paiement majoré de {{lu.majoration-heures-sup}} si la récupération est impossible.",
  intro: [
    "Au Luxembourg, une heure supplémentaire se compense d'abord par une heure et demie de repos rémunéré, ou sur un compte épargne temps.",
    "Si la récupération est impossible ou si le salarié quitte l'entreprise avant de récupérer, chaque heure est payée au salaire horaire majoré de {{lu.majoration-heures-sup}}.",
  ],
  comoSeCalcula: [
    "Salaire horaire = salaire mensuel brut / {{lu.heures-par-mois}}.",
    "Paiement = salaire horaire x heures x (100 % + {{lu.majoration-heures-sup}}).",
    "Repos = heures x 1,5.",
  ],
  ejemplo: [
    "Avec 5.190 euros par mois, soit 30 euros de l'heure, 10 heures supplémentaires valent 420 euros, ou 15 heures de repos rémunéré.",
  ],
  faq: [
    { pregunta: "Les heures supplémentaires sont-elles imposées ?", respuesta: "Le paiement de 140 % est exempt d'impôts et de cotisations sociales, à l'exception des cotisations pour prestations en nature sur l'heure non majorée." },
    { pregunta: "Qui fixe les modalités ?", respuesta: "Une convention collective applicable fixe les modalités. Sinon, les règles du Code du travail s'appliquent." },
    { pregunta: "Les cadres supérieurs sont-ils concernés ?", respuesta: "Non. Ces règles de rémunération ne s'appliquent pas aux salariés qui ont la qualité de cadres supérieurs." },
  ],
  glosario: [
    { termino: "Compte épargne temps", definicion: "Compte sur lequel les heures supplémentaires sont créditées au même taux pour être récupérées plus tard." },
  ],
});
