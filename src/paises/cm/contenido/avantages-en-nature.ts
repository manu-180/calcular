import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cm.avantages-en-nature",
  h1: "Calcul des avantages en nature imposables",
  title: "Avantages en nature au Cameroun : valeur imposable",
  description:
    "Évaluez logement, véhicule, électricité ou domestique fournis par l'employeur avec les taux du CGI : {{cm.avantages-nature[logement]}} pour le logement.",
  intro: [
    "Un logement, une voiture ou un domestique fournis par l'employeur font partie du salaire imposable. Le Code général des impôts les évalue par des taux forfaitaires.",
    "Cochez les avantages dont vous bénéficiez pour connaître leur valeur imposable.",
  ],
  comoSeCalcula: [
    "Chaque avantage vaut un pourcentage du salaire brut taxable : logement {{cm.avantages-nature[logement]}}, électricité {{cm.avantages-nature[electricite]}}, eau {{cm.avantages-nature[eau]}}, nourriture {{cm.avantages-nature[nourriture]}}, téléphone {{cm.avantages-nature[telephone]}}.",
    "Chaque domestique ajoute {{cm.avantages-nature[domestique]}} et chaque véhicule {{cm.avantages-nature[vehicule]}}.",
    "On additionne les taux et on les applique au brut. Le résultat s'ajoute au salaire pour l'IRPP.",
  ],
  ejemplo: ["Avec 400 000 F bruts, un logement, l'électricité et l'eau valent 21 % du salaire, soit 84 000 F par mois."],
  faq: [
    {
      pregunta: "Une indemnité de logement en argent est-elle aussi imposée ?",
      respuesta: "Oui. Une indemnité en argent qui remplace un avantage en nature entre dans la base imposable, dans la limite des mêmes taux.",
    },
    {
      pregunta: "Les avantages en nature comptent-ils pour la CNPS ?",
      respuesta: "Ils sont exclus des cotisations sociales dans la limite du plafond du Code général des impôts. Le surplus est ajouté à l'assiette.",
    },
    {
      pregunta: "Le taux s'applique-t-il au salaire de base ?",
      respuesta: "Non. Il s'applique au salaire brut taxable, primes et indemnités imposables comprises.",
    },
  ],
  glosario: [{ termino: "Avantage en nature", definicion: "Un bien ou un service fourni par l'employeur au lieu d'argent." }],
});
