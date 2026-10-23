import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sn.calcul-cfce",
  h1: "Calcul de la CFCE au Sénégal",
  title: "CFCE au Sénégal : contribution de l'employeur",
  description: "Calculez la contribution forfaitaire à la charge de l'employeur (CFCE) de {{sn.cfce}} sur les salaires versés, selon le Code général des impôts.",
  intro: [
    "La CFCE est une contribution que l'employeur paie sur les salaires qu'il verse, en plus du salaire.",
    "Inscrivez les salaires bruts du mois pour voir la contribution.",
  ],
  comoSeCalcula: [
    "La base comprend les salaires, les congés payés, les gratifications, les primes, les indemnités et les avantages en argent ou en nature.",
    "Les remboursements de frais et les prestations familiales n'en font pas partie. Le taux est de {{sn.cfce}}.",
  ],
  ejemplo: ["Pour 2 000 000 francs de salaires dans le mois, la CFCE est de 60 000 francs."],
  faq: [
    {
      pregunta: "Quel est le taux de la CFCE?",
      respuesta: "{{sn.cfce}} des salaires.",
    },
    {
      pregunta: "Les prestations familiales entrent-elles dans la base?",
      respuesta: "Non, ni les prestations familiales ni les remboursements de frais.",
    },
    {
      pregunta: "Quand la verse-t-on?",
      respuesta: "Au Trésor public, dans les mêmes conditions et délais que les retenues sur les salaires.",
    },
  ],
  glosario: [
    { termino: "CFCE", definicion: "Contribution forfaitaire à la charge de l'employeur." },
    { termino: "Masse salariale", definicion: "Le total des salaires bruts versés par l'employeur." },
  ],
});
