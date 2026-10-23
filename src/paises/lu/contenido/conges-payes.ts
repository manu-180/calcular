import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lu.conges-payes",
  h1: "Calcul des congés payés au Luxembourg",
  title: "Congés payés Luxembourg : jours et indemnité",
  description: "Combien de jours de congé au Luxembourg ? Au moins {{lu.conges-jours}} jours ouvrables par an, au prorata des mois travaillés, et indemnité de congé par jour.",
  intro: [
    "Au Luxembourg, le congé annuel dure au moins {{lu.conges-jours}} jours ouvrables par an, quel que soit l'âge du salarié.",
    "La première année et l'année du départ, le congé est dû à raison d'un douzième par mois de travail entier.",
  ],
  comoSeCalcula: [
    "Jours acquis = jours de congé de l'année x mois entiers / 12.",
    "Indemnité : le salaire mensuel brut divisé par {{lu.heures-par-mois}} heures donne le salaire horaire, multiplié par les heures d'une journée.",
  ],
  ejemplo: [
    "Avec 4.325 euros bruts et des journées de 8 heures, un jour de congé vaut 200 euros. Les 26 jours d'une année complète valent 5.200 euros.",
  ],
  faq: [
    { pregunta: "Les jours fériés sont-ils compris ?", respuesta: "Non. Le congé annuel s'ajoute aux jours fériés légaux." },
    { pregunta: "Le congé peut-il être reporté ?", respuesta: "Il doit en principe être pris pendant l'année. Le congé proportionnel de la première année peut être reporté à l'année suivante à la demande du salarié." },
    { pregunta: "Le contrat peut-il prévoir plus de jours ?", respuesta: "Oui. Un contrat ou une convention collective peut prévoir plus, jamais moins que le minimum légal." },
  ],
  glosario: [
    { termino: "Jours ouvrables", definicion: "Jours de la semaine qui ne sont ni des dimanches ni des jours fériés légaux." },
  ],
});
