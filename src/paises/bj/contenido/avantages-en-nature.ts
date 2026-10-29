import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bj.avantages-en-nature",
  h1: "Avantages en nature et ITS {{anio}} au Bénin",
  title: "Avantages en nature {{anio}} au Bénin : évaluation pour l'ITS",
  description:
    "Évaluez le logement ({{bj.avantages-nature-logement}} du salaire de base), l'électricité, l'eau, le téléphone, la nourriture et le véhicule fournis par l'employeur et leur effet sur l'ITS.",
  intro: [
    "Le logement fourni par l'employeur compte pour {{bj.avantages-nature-logement}} du salaire de base. Quand l'employeur loge, nourrit ou équipe son salarié, cet avantage s'ajoute au salaire imposable. Le Code général des impôts fixe des forfaits mensuels pour les plus courants, ce qui évite de discuter de leur valeur.",
    "Cochez les avantages accordés. Le calcul additionne les forfaits et montre l'ITS supplémentaire du mois.",
  ],
  comoSeCalcula: [
    "Le logement est évalué à {{bj.avantages-nature-logement}} du salaire de base (article 123, paragraphe 3).",
    "Les autres avantages sont des forfaits mensuels qui dépendent de la catégorie. Pour un cadre : électricité {{bj.avantages-nature-forfaits[electricite-cadre]}}, eau {{bj.avantages-nature-forfaits[eau-cadre]}}, téléphone {{bj.avantages-nature-forfaits[telephone-cadre]}}, nourriture {{bj.avantages-nature-forfaits[nourriture-cadre]}}. Pour un employé : {{bj.avantages-nature-forfaits[electricite-employe]}}, {{bj.avantages-nature-forfaits[eau-employe]}}, {{bj.avantages-nature-forfaits[telephone-employe]}} et {{bj.avantages-nature-forfaits[nourriture-employe]}}.",
    "Un véhicule à quatre roues compte pour {{bj.avantages-nature-forfaits[vehicule-4-cadre]}} (cadre) ou {{bj.avantages-nature-forfaits[vehicule-4-employe]}} (employé), un deux-roues pour {{bj.avantages-nature-forfaits[vehicule-2-cadre]}} ou {{bj.avantages-nature-forfaits[vehicule-2-employe]}}.",
    "Le total est ajouté au salaire imposable, puis le barème de l'ITS s'applique. Les avantages non listés (frais de scolarité, frais médicaux hors cas exclus, etc.) sont retenus pour leur valeur réelle.",
  ],
  ejemplo: [
    "Un cadre gagne 400 000 F de base et 50 000 F de primes. Logé (60 000 F), avec un téléphone (15 000 F) et une voiture (30 000 F), il cumule 105 000 F d'avantages. Son salaire imposable passe de 450 000 F à 555 000 F et son ITS de 62 000 F à 88 000 F, soit 26 000 F de plus.",
  ],
  faq: [
    {
      pregunta: "Comment est évalué un logement fourni par l'employeur ?",
      respuesta: "L'article 123 du Code général des impôts retient {{bj.avantages-nature-logement}} du salaire de base, par mois.",
    },
    {
      pregunta: "Les forfaits sont-ils les mêmes pour tous ?",
      respuesta: "Non. Les montants de l'article 123 distinguent les dirigeants et cadres supérieurs des employés, et le texte divise les tarifs par deux pour le personnel de maison.",
    },
    {
      pregunta: "Les frais de formation sont-ils des avantages imposables ?",
      respuesta: "Non. L'article 124 exclut de la base les frais de formation déductibles et la prime d'une assurance maladie collective payée par l'entreprise.",
    },
  ],
  glosario: [
    { termino: "Avantage en nature", definicion: "Un bien ou service fourni gratuitement par l'employeur, qui complète le salaire." },
    { termino: "Forfait", definicion: "Une valeur fixée par la loi pour chiffrer un avantage, sans justificatif." },
    { termino: "Salaire de base", definicion: "Le salaire contractuel hors primes et avantages." },
  ],
});
