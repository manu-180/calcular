import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dz.cout-employeur",
  h1: "Calcul du coût employeur d'un salarié en Algérie",
  title: "Coût employeur Algérie {{anio}} : salaire et charges CNAS",
  description:
    "Calculez ce que coûte un salarié à l'entreprise en Algérie : salaire brut, part patronale de {{dz.cnas[employeur]}} et quote-part des œuvres sociales.",
  intro: [
    "Pour l'entreprise, un salarié coûte plus que son salaire brut. S'ajoutent la part patronale de la cotisation de sécurité sociale et la quote-part du fonds des œuvres sociales, versées à la CNAS.",
    "Indiquez le salaire brut et le nombre de salariés concernés pour obtenir le coût mensuel et annuel.",
  ],
  comoSeCalcula: [
    "Part patronale : {{dz.cnas[employeur]}} du salaire brut.",
    "Quote-part du fonds des œuvres sociales : {{dz.cnas[oeuvres-sociales]}} du salaire brut.",
    "Coût mensuel = brut + part patronale + quote-part des œuvres sociales.",
    "Coût annuel = coût mensuel × 12 × nombre de salariés.",
  ],
  ejemplo: ["Un salarié payé 60 000 DA brut coûte 75 300 DA par mois à l'entreprise, soit 903 600 DA sur l'année."],
  faq: [
    {
      pregunta: "Quel est le taux des charges patronales en Algérie ?",
      respuesta:
        "La cotisation de sécurité sociale à la charge de l'employeur est de {{dz.cnas[employeur]}} de l'assiette de cotisation, plus {{dz.cnas[oeuvres-sociales]}} au titre du fonds des œuvres sociales.",
    },
    {
      pregunta: "Le salarié paie-t-il aussi une cotisation ?",
      respuesta: "Oui, {{dz.cnas[salarie]}} retenus sur son salaire. Cette part est déjà comprise dans le brut et ne s'ajoute pas au coût employeur.",
    },
    {
      pregunta: "Quel est le coût minimum d'un salarié à temps plein ?",
      respuesta: "Au SNMG de {{dz.snmg}}, ajoutez la part patronale et la quote-part des œuvres sociales : le calcul donne le montant exact.",
    },
  ],
  glosario: [
    { termino: "Part patronale", definicion: "Cotisation de sécurité sociale payée par l'employeur en plus du salaire brut." },
    { termino: "Fonds des œuvres sociales", definicion: "Fonds de l'entreprise consacré aux prestations sociales des travailleurs." },
  ],
});
