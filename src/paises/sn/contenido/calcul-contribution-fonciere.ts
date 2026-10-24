import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sn.calcul-contribution-fonciere",
  h1: "Calcul de la contribution foncière au Sénégal",
  title: "Contribution foncière au Sénégal : calcul",
  description: "Calculez la contribution foncière des propriétés bâties ({{sn.contribution-fonciere[batie]}} de la valeur locative) et non bâties ({{sn.contribution-fonciere[non-batie]}} de la valeur vénale).",
  intro: [
    "La contribution foncière est un impôt annuel sur les propriétés, perçu au profit des collectivités territoriales.",
    "Choisissez le type de propriété et inscrivez sa valeur de base.",
  ],
  comoSeCalcula: [
    "Pour une propriété bâtie, le taux de {{sn.contribution-fonciere[batie]}} s'applique à la valeur locative.",
    "Pour un terrain non bâti, le taux de {{sn.contribution-fonciere[non-batie]}} s'applique à la valeur vénale.",
  ],
  faq: [
    {
      pregunta: "Qui paie la contribution foncière?",
      respuesta: "En principe le propriétaire. Pour certaines installations, le Code général des impôts la met à la charge du locataire.",
    },
    {
      pregunta: "Sur quelle valeur se calcule une maison?",
      respuesta: "Sur sa valeur locative, au taux de {{sn.contribution-fonciere[batie]}}.",
    },
    {
      pregunta: "Et un terrain non bâti?",
      respuesta: "Sur sa valeur vénale, au taux de {{sn.contribution-fonciere[non-batie]}}.",
    },
  ],
  glosario: [
    { termino: "Valeur locative", definicion: "Le loyer annuel qu'une propriété peut rapporter." },
    { termino: "Valeur vénale", definicion: "Le prix qu'un bien obtiendrait s'il était vendu." },
  ],
});
