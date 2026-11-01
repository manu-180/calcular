import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bj.cotisations-cnss",
  h1: "Calcul des cotisations CNSS au Bénin",
  title: "Cotisations CNSS Bénin : part salarié et employeur",
  description:
    "Calculez les cotisations CNSS d'un salaire : pension {{bj.cnss-taux[pension-salarie]}} pour le salarié, {{bj.cnss-taux[pension-employeur]}} et prestations familiales pour l'employeur.",
  intro: [
    "La Caisse nationale de sécurité sociale (CNSS) finance la pension, les prestations familiales et les risques professionnels.",
    "Indiquez la rémunération du mois et, si vous le connaissez, le taux risques professionnels de l'entreprise. Vous obtenez chaque cotisation.",
  ],
  comoSeCalcula: [
    "La pension prend {{bj.cnss-taux[pension-salarie]}} au salarié et {{bj.cnss-taux[pension-employeur]}} à l'employeur.",
    "Les prestations familiales coûtent {{bj.cnss-taux[prestations-familiales]}} à l'employeur seul.",
    "Toutes ces cotisations portent sur l'ensemble des rémunérations du mois. Le taux risques professionnels s'ajoute selon l'activité.",
  ],
  ejemplo: ["Pour 300 000 F : 10 800 F retenus au salarié, 19 200 F de pension et 27 000 F de prestations familiales pour l'employeur."],
  faq: [
    {
      pregunta: "Qui verse la part du salarié ?",
      respuesta: "L'employeur la retient sur le salaire et la verse à la CNSS avec sa propre part.",
    },
    {
      pregunta: "Y a-t-il un plafond ?",
      respuesta: "Le décret qui fixe les taux de la pension et des prestations familiales les applique à l'ensemble des rémunérations perçues, sans plafond.",
    },
    {
      pregunta: "Où trouver mon taux risques professionnels ?",
      respuesta: "La CNSS le fixe selon l'activité de l'entreprise et le communique à l'employeur. Il figure sur les documents de la caisse.",
    },
  ],
  glosario: [
    { termino: "CNSS", definicion: "Caisse nationale de sécurité sociale, qui gère la sécurité sociale des salariés du privé." },
    { termino: "Prestations familiales", definicion: "Allocations versées aux familles, financées par l'employeur." },
  ],
});
