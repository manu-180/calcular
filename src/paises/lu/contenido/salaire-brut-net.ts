import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lu.salaire-brut-net",
  h1: "Calcul du salaire net au Luxembourg",
  title: "Salaire brut net Luxembourg {{anio}} : calcul du net",
  description: "Du brut au net au Luxembourg : cotisations maladie, pension et dépendance {{anio}}, retenue d'impôt selon la classe 1, 1a ou 2, crédits CIS et CI-CO2.",
  intro: [
    "Au Luxembourg, le salaire brut supporte les cotisations sociales du salarié (maladie, pension, dépendance) et la retenue d'impôt sur les salaires. Le crédit d'impôt pour salariés (CIS) et le CI-CO2 viennent ensuite réduire la retenue.",
    "Le calculateur applique les taux de cotisation 2026 publiés par le Centre commun de la sécurité sociale et les formules de retenue de l'Administration des contributions directes.",
  ],
  comoSeCalcula: [
    "Maladie : la moitié de {{lu.cotisation-maladie-soins}} et de {{lu.cotisation-maladie-especes}}. Pension : la moitié de {{lu.cotisation-pension}}. Les deux s'arrêtent au maximum cotisable de {{lu.plafond-cotisable}} par mois.",
    "Dépendance : {{lu.cotisation-dependance}} sur tout le salaire, diminué d'un abattement de {{lu.abattement-dependance}}.",
    "Retenue d'impôt : le salaire moins les cotisations, arrondi aux 5 euros inférieurs, passe dans la formule de la classe d'impôt. L'impôt est ensuite majoré pour le fonds pour l'emploi.",
    "Crédits : le CIS et le CI-CO2 dépendent du salaire brut annuel et disparaissent à partir de 80.000 euros par an.",
  ],
  ejemplo: [
    "Pour 5.000 euros bruts en classe 1, les cotisations s'élèvent à environ 638 euros et la retenue à environ 696 euros. Avec 34 euros de crédits, il reste environ 3.700 euros nets.",
  ],
  faq: [
    { pregunta: "Quelle classe d'impôt choisir ?", respuesta: "La classe figure sur votre fiche de retenue d'impôt. La classe 1 vise en général les personnes seules, la classe 2 les personnes mariées ou partenaires, la classe 1a notamment les parents seuls et les personnes de 65 ans et plus." },
    { pregunta: "Quelles cotisations le salarié paie-t-il ?", respuesta: "La moitié des cotisations maladie et pension, et toute la contribution dépendance. Les assurances accident et santé au travail sont à charge de l'employeur." },
    { pregunta: "Pourquoi le résultat diffère-t-il de ma fiche de paie ?", respuesta: "La fiche de retenue peut contenir des modérations, comme des frais de déplacement ou des abattements. Les avantages en nature et les primes changent aussi le calcul. La fiche de retenue fait foi." },
  ],
  glosario: [
    { termino: "Fiche de retenue d'impôt", definicion: "Document de l'ACD qui fixe la classe d'impôt et les modérations appliquées par l'employeur." },
    { termino: "CIS", definicion: "Crédit d'impôt pour salariés, versé avec le salaire et dégressif à partir de 40.000 euros bruts par an." },
  ],
});
