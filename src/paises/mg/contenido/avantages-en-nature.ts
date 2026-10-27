import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mg.avantages-en-nature",
  h1: "Calcul des avantages en nature pour l'IRSA",
  title: "Avantages en nature Madagascar : logement, voiture, IRSA",
  description: "Évaluez le logement, le véhicule et le téléphone fournis par l'employeur selon le Code des impôts malgache, pour les ajouter à la base de l'IRSA.",
  intro: [
    "Le logement, la voiture de fonction ou le téléphone payés par l'employeur sont des avantages en nature. Ils s'ajoutent au salaire imposable à l'IRSA.",
    "Le Code des impôts fixe une évaluation forfaitaire pour chacun d'eux.",
  ],
  comoSeCalcula: [
    "Logement : {{mg.avantages-nature[logement]}} du loyer réel, sans dépasser {{mg.avantages-nature[logement-plafond]}} des rémunérations fixes en numéraire.",
    "Véhicule utilisé à titre professionnel et personnel : {{mg.avantages-nature[vehicule]}} des dépenses mensuelles d'assurance, de carburant, d'entretien et de réparation. Téléphone : {{mg.avantages-nature[telephone]}} des dépenses mensuelles.",
    "Les autres avantages comptent pour leur valeur réelle. Si l'employeur retient une somme sur le salaire pour un avantage, elle se déduit.",
  ],
  ejemplo: ["Un cadre payé 2 000 000 Ar, logé dans une maison louée 800 000 Ar et disposant d'une voiture qui coûte 600 000 Ar par mois, ajoute 490 000 Ar à son brut imposable."],
  faq: [
    { pregunta: "La cantine est-elle un avantage imposable ?", respuesta: "Non, dans la limite d'un seuil fixé par texte réglementaire. Les frais médicaux justifiés et raisonnables sont aussi exonérés." },
    {
      pregunta: "Que se passe-t-il si mon employeur paie mon IRSA ?",
      respuesta: "L'impôt pris en charge par l'employeur est lui-même un avantage imposable au nom du salarié.",
    },
    {
      pregunta: "Comment utiliser le résultat ?",
      respuesta: "Ajoutez-le au salaire brut dans le calcul de l'IRSA. Le barème s'applique alors au total.",
    },
  ],
  glosario: [
    { termino: "Avantage en nature", definicion: "Bien ou service fourni par l'employeur gratuitement ou à prix réduit." },
    { termino: "Rémunération fixe", definicion: "Salaire de base et primes fixes payés en argent." },
  ],
});
