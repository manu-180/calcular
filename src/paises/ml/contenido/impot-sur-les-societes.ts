import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ml.impot-sur-les-societes",
  h1: "Calcul de l'impôt sur les sociétés au Mali",
  title: "Impôt sur les sociétés Mali : taux et minimum forfaitaire",
  description: "Calculez l'impôt sur les sociétés ou l'IBIC au réel au Mali : {{ml.is-taux}} du bénéfice, avec un minimum forfaitaire de {{ml.minimum-forfaitaire}} du chiffre d'affaires.",
  intro: [
    "Au Mali, les sociétés et les entreprises au régime du bénéfice réel paient un impôt sur leur bénéfice. Un minimum calculé sur le chiffre d'affaires reste dû même en cas de perte.",
    "Indiquez le bénéfice fiscal et le chiffre d'affaires hors taxe de l'exercice.",
  ],
  comoSeCalcula: [
    "Le bénéfice, arrondi au millier de francs inférieur, est imposé à {{ml.is-taux}}.",
    "L'impôt ne peut pas être inférieur au minimum forfaitaire de perception : {{ml.minimum-forfaitaire}} du chiffre d'affaires hors taxe, arrondi au millier inférieur.",
    "L'entreprise paie le plus élevé des deux montants.",
  ],
  ejemplo: ["Avec 30 000 000 F de bénéfice et 400 000 000 F de chiffre d'affaires, l'impôt sur le bénéfice (9 000 000 F) dépasse le minimum (4 000 000 F) : l'entreprise paie 9 000 000 F."],
  faq: [
    {
      pregunta: "Le minimum est-il dû en cas de perte ?",
      respuesta: "Oui. Le minimum forfaitaire est dû même en cas de déficit, quelle que soit son importance.",
    },
    {
      pregunta: "Quel chiffre d'affaires retenir pour une société ?",
      respuesta: "Pour les entreprises soumises à l'impôt sur les sociétés, le chiffre d'affaires comprend les produits d'exploitation et les produits accessoires.",
    },
    {
      pregunta: "Existe-t-il d'autres règles de minimum ?",
      respuesta: "Oui. Une société de gestion d'immeubles locatifs ne peut pas payer moins que l'impôt sur les revenus fonciers dont elle serait redevable. D'autres régimes particuliers figurent dans le CGI.",
    },
  ],
  glosario: [
    { termino: "IBIC", definicion: "Impôt sur les bénéfices industriels et commerciaux, payé par les entreprises individuelles." },
    { termino: "Minimum forfaitaire", definicion: "Le montant minimal d'impôt, calculé sur le chiffre d'affaires." },
  ],
});
