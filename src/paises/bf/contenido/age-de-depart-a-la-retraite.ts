import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bf.age-de-depart-a-la-retraite",
  h1: "Âge et date de départ à la retraite",
  title: "Âge de départ à la retraite au Burkina Faso (CNSS)",
  description:
    "Calculez la date à laquelle vous atteignez l'âge de la retraite CNSS : de {{bf.age-retraite[ouvrier]}} pour les ouvriers à {{bf.age-retraite[medecin]}} pour les médecins.",
  intro: [
    "Au régime de la CNSS, l'âge de départ à la retraite dépend de la catégorie professionnelle.",
    "Indiquez votre date de naissance et votre catégorie. Vous obtenez la date à laquelle vous atteignez l'âge et le temps qui reste.",
  ],
  comoSeCalcula: [
    "Ouvriers et assimilés : {{bf.age-retraite[ouvrier]}}. Employés et assimilés : {{bf.age-retraite[employe]}}.",
    "Agents de maîtrise, cadres et assimilés : {{bf.age-retraite[cadre]}}. Médecins et enseignants du supérieur : {{bf.age-retraite[medecin]}}.",
    "Pour la pension de vieillesse normale, il faut aussi avoir cotisé au moins {{bf.retraite-cotisation-min}} et avoir cessé toute activité salariée.",
  ],
  ejemplo: ["Un cadre né le 15 mars 1970 atteint l'âge de la retraite le 15 mars 2030."],
  faq: [
    {
      pregunta: "À partir de quand la pension est-elle versée ?",
      respuesta: "La pension de vieillesse court à compter du lendemain de la mise à la retraite. Pour l'assuré volontaire, à partir de 56 ans révolus.",
    },
    {
      pregunta: "Peut-on partir plus tôt ?",
      respuesta:
        "Oui, par la pension anticipée : dès 50 ans, avec au moins 15 ans de cotisation, en cas d'incapacité physique ou mentale reconnue par un médecin et après avoir cessé toute activité salariée.",
    },
    {
      pregunta: "Quand constituer le dossier ?",
      respuesta: "La CNSS conseille de le faire au cours des six mois qui précèdent le départ à la retraite.",
    },
  ],
  glosario: [
    { termino: "Pension de vieillesse", definicion: "La pension de retraite versée par la CNSS aux assurés qui remplissent les conditions d'âge et de cotisation." },
    { termino: "Pension anticipée", definicion: "Une pension de vieillesse versée avant l'âge normal, pour usure prématurée." },
  ],
});
