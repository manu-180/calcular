import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-fr.saeule-3a-rechner",
  h1: "Pilier 3a : montant maximal et économie d'impôt",
  title: "Calcul pilier 3a {{anio}} : maximum et économie d'impôt",
  description: "Pilier 3a {{anio}} : jusqu'à {{ch.saeule-3a-mit-pk}} avec caisse de pension, jusqu'à {{ch.saeule-3a-ohne-pk}} sans. Maximum et économie d'impôt fédéral direct.",
  intro: [
    "Les versements au pilier 3a se déduisent du revenu imposable, auprès de la Confédération, du canton et de la commune. Les personnes affiliées à une caisse de pension peuvent verser {{ch.saeule-3a-mit-pk}} par an.",
    "Sans caisse de pension, la limite est de {{ch.saeule-3a-ohne-pk-satz}} du revenu de l'activité lucrative, au plus {{ch.saeule-3a-ohne-pk}}. Le calculateur indique votre maximum et l'économie d'impôt fédéral direct.",
  ],
  comoSeCalcula: [
    "Avec caisse de pension : 8 % de la limite supérieure LPP, arrondis à {{ch.saeule-3a-mit-pk}}.",
    "Sans caisse de pension : {{ch.saeule-3a-ohne-pk-satz}} du revenu de l'activité lucrative, au plus 40 % de la limite supérieure LPP, soit {{ch.saeule-3a-ohne-pk}}.",
    "Économie : impôt fédéral sur le revenu imposable moins impôt fédéral sur le revenu après déduction du versement, avec les barèmes en vigueur.",
  ],
  ejemplo: [
    "Une personne seule affiliée à une caisse de pension, avec 80 000 francs de revenu imposable, verse le maximum. Son impôt fédéral direct baisse d'environ 330 francs. L'économie au canton et à la commune s'y ajoute.",
  ],
  faq: [
    { pregunta: "Combien puis-je verser au pilier 3a en 2026 ?", respuesta: "Avec caisse de pension {{ch.saeule-3a-mit-pk}}. Sans caisse de pension {{ch.saeule-3a-ohne-pk-satz}} du revenu de l'activité lucrative, au plus {{ch.saeule-3a-ohne-pk}}. Dès 2027, les montants passent à 7373 et 36 864 francs." },
    { pregunta: "Puis-je rattraper des années manquées ?", respuesta: "Oui, à certaines conditions. Vous pouvez combler les lacunes des dix dernières années si vous avez versé la cotisation ordinaire complète l'année du rachat et si vous aviez le droit de cotiser les années concernées. Le rachat annuel est limité au petit montant maximal." },
    { pregunta: "Jusqu'à quand puis-je verser ?", respuesta: "Au plus jusqu'à cinq ans après l'âge de référence, tant que vous exercez une activité lucrative. L'année où vous cessez de travailler, la cotisation entière est encore possible." },
    { pregunta: "Les deux conjoints peuvent-ils verser ?", respuesta: "Oui. S'ils exercent tous deux une activité lucrative, chacun peut verser et déduire jusqu'à son propre maximum." },
  ],
  glosario: [
    { termino: "Pilier 3a", definicion: "Prévoyance individuelle liée. Le versement est possible au plus tôt cinq ans avant l'âge de référence, avant seulement dans des cas prévus par la loi, comme l'acquisition d'un logement pour ses propres besoins." },
    { termino: "Limite supérieure LPP", definicion: "Le salaire annuel le plus élevé assuré dans la prévoyance professionnelle obligatoire : {{ch.bvg-obere-grenze}}." },
  ],
});
