import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dz.conge-maternite",
  h1: "Congé de maternité en Algérie : dates et indemnité",
  title: "Congé de maternité Algérie : {{dz.maternite[duree]}} et indemnité",
  description:
    "Le congé de maternité dure {{dz.maternite[duree]}} indemnisées à {{dz.maternite-taux}} du salaire net. Calculez vos dates de congé et une estimation de l'indemnité.",
  intro: [
    "La salariée assurée sociale a droit à un congé de maternité de {{dz.maternite[duree]}} consécutives, indemnisé par la CNAS. Il commence au plus tôt {{dz.maternite[avant-max]}} avant la date présumée de l'accouchement.",
    "Indiquez la date prévue et votre salaire brut pour obtenir les dates de début et de fin ainsi qu'une estimation de l'indemnité.",
  ],
  comoSeCalcula: [
    "Début au plus tôt = date présumée de l'accouchement moins {{dz.maternite[avant-max]}}.",
    "Fin = début du congé plus {{dz.maternite[duree]}}, quel que soit le jour réel de l'accouchement.",
    "Indemnité = {{dz.maternite-taux}} du salaire soumis à cotisation, après déduction de la cotisation de sécurité sociale et de l'IRG.",
    "Indemnité journalière = salaire net mensuel ÷ {{dz.indemnite-diviseur}}, versée pour chaque jour du congé, ouvrable ou non.",
  ],
  faq: [
    {
      pregunta: "Combien de semaines dure le congé de maternité ?",
      respuesta:
        "{{dz.maternite[duree]}} consécutives, selon l'article 29 de la loi n° 83-11 relative aux assurances sociales, modifié par l'ordonnance n° 96-17 du 6 juillet 1996.",
    },
    {
      pregunta: "Que se passe-t-il si j'accouche avant la date prévue ?",
      respuesta: "La période d'indemnisation n'est pas réduite : vous gardez les {{dz.maternite[duree]}} prévues par la loi.",
    },
    {
      pregunta: "Quel montant verse la CNAS ?",
      respuesta:
        "{{dz.maternite-taux}} du salaire journalier soumis à cotisation, après déduction de la cotisation de sécurité sociale et de l'impôt. En pratique, l'indemnité correspond à votre salaire net.",
    },
  ],
  glosario: [
    { termino: "CNAS", definicion: "Caisse nationale des assurances sociales des travailleurs salariés, qui verse les indemnités de maternité." },
    { termino: "Date présumée de l'accouchement", definicion: "Date du terme indiquée par le médecin, qui sert de point de départ au calcul du congé." },
  ],
});
