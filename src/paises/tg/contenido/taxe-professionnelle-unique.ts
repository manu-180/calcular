import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tg.taxe-professionnelle-unique",
  h1: "Calcul de la taxe professionnelle unique (TPU) au Togo",
  title: "TPU Togo : calcul de la taxe professionnelle unique",
  description:
    "Calculez la TPU d'une entreprise individuelle au Togo : forfait par tranche jusqu'à {{tg.tpu-seuils[forfaitaire]}}, puis {{tg.tpu-taux[production-commerce]}} ou {{tg.tpu-taux[services]}} du chiffre d'affaires.",
  intro: [
    "La taxe professionnelle unique remplace, pour les petites entreprises individuelles, l'IRPP sur les revenus d'affaires, le minimum forfaitaire, la patente et la TVA.",
    "Indiquez votre chiffre d'affaires annuel et votre activité pour connaître votre régime et le montant de l'année.",
  ],
  comoSeCalcula: [
    "Jusqu'à {{tg.tpu-seuils[forfaitaire]}} de chiffre d'affaires, c'est le régime forfaitaire : un montant fixe par tranche, plus élevé pour les services que pour le commerce.",
    "Au-delà et jusqu'à {{tg.tpu-seuils[maximum]}}, c'est le régime déclaratif : {{tg.tpu-taux[production-commerce]}} du chiffre d'affaires pour la production et le commerce, {{tg.tpu-taux[services]}} pour les services, avec un minimum de {{tg.tpu-minimum}} par an.",
    "Au-delà de {{tg.tpu-seuils[maximum]}}, l'entreprise passe au régime du réel.",
  ],
  ejemplo: ["Un commerçant qui réalise 12 000 000 F de chiffre d'affaires paie une TPU forfaitaire de 190 000 F pour l'année."],
  faq: [
    {
      pregunta: "Qui ne peut pas être à la TPU ?",
      respuesta:
        "Les personnes morales, les professions libérales relevant des bénéfices non commerciaux, les boulangeries industrielles et les personnes physiques qui importent ou exportent.",
    },
    {
      pregunta: "Peut-on choisir le régime déclaratif ou le réel ?",
      respuesta:
        "Oui. L'option se fait avant le 30 novembre et vaut à partir du 1er janvier suivant. Elle est irrévocable.",
    },
    {
      pregunta: "Et pour les artisans ou les transporteurs ?",
      respuesta:
        "Ils ont des tarifs forfaitaires propres, selon l'activité, le véhicule ou la localité, fixés par l'article 135 du Code général des impôts.",
    },
  ],
  glosario: [
    { termino: "TPU", definicion: "Taxe professionnelle unique, impôt synthétique des petites entreprises individuelles." },
    { termino: "Régime du réel", definicion: "Imposition sur le bénéfice réellement réalisé, avec une comptabilité complète." },
  ],
});
