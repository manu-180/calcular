import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mg.calcul-impot-sur-les-revenus",
  h1: "Calcul de l'impôt sur les revenus (IR) des entreprises",
  title: "Impôt sur les revenus Madagascar : taux et minimum",
  description: "Calculez l'impôt sur les revenus d'une entreprise malgache : {{mg.ir-taux}} du bénéfice, avec le minimum de perception selon l'activité et le chiffre d'affaires.",
  intro: [
    "L'impôt sur les revenus (IR) frappe le bénéfice des sociétés et des entreprises au régime du réel.",
    "Indiquez le bénéfice imposable, le chiffre d'affaires hors taxe et l'activité : la calculatrice compare l'impôt au taux normal et le minimum de perception, et retient le plus élevé.",
  ],
  comoSeCalcula: [
    "Le bénéfice imposable est arrondi au millier d'ariary inférieur, puis taxé à {{mg.ir-taux}}.",
    "Le minimum de perception est de {{mg.ir-minimum-fixe[production]}} plus {{mg.ir-minimum-ca[production]}} du chiffre d'affaires pour les activités agricoles, artisanales, industrielles, minières, hôtelières et touristiques, et de {{mg.ir-minimum-fixe[autres]}} plus {{mg.ir-minimum-ca[autres]}} pour les autres entreprises.",
    "Il est de {{mg.ir-minimum-fixe[petrolier]}} plus {{mg.ir-minimum-ca[petrolier]}} du chiffre d'affaires pour les compagnies pétrolières et de {{mg.ir-minimum-ca[carburant]}} du chiffre d'affaires pour la vente de carburant au détail.",
  ],
  ejemplo: [
    "Une société de services qui réalise 500 000 000 Ar de chiffre d'affaires et 50 000 000 Ar de bénéfice paie 10 000 000 Ar. Le minimum de perception serait de 6 000 000 Ar.",
  ],
  faq: [
    {
      pregunta: "Une entreprise en perte paie-t-elle l'IR ?",
      respuesta: "Oui, le minimum de perception, dès qu'elle existe au 1er janvier de l'année d'imposition. Une société non radiée du registre du commerce est considérée comme existante.",
    },
    {
      pregunta: "Qui est soumis à l'IR plutôt qu'à l'impôt synthétique ?",
      respuesta: "Les entreprises dont le chiffre d'affaires annuel atteint {{mg.is-seuil}}, les sociétés de capitaux et ceux qui optent pour le régime du réel.",
    },
    {
      pregunta: "Existe-t-il des réductions d'impôt ?",
      respuesta: "Oui. Les entreprises des secteurs agricole, touristique, industriel, du BTP et des énergies renouvelables peuvent déduire l'impôt correspondant à 20 % de leurs investissements, dans la limite de la moitié de l'impôt dû. Le minimum de perception reste dû.",
    },
  ],
  glosario: [
    { termino: "IR", definicion: "Impôt sur les revenus : l'impôt sur le bénéfice des entreprises à Madagascar." },
    { termino: "Minimum de perception", definicion: "Montant plancher de l'IR, dû même en cas de perte." },
  ],
});
