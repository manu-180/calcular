import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bf.assurance-volontaire-cnss",
  h1: "Cotisation à l'assurance volontaire CNSS",
  title: "Assurance volontaire CNSS Burkina Faso : cotisation",
  description: "Calculez votre cotisation à l'assurance volontaire de la CNSS : {{bf.cnss-assurance-volontaire}} du revenu, pour la branche des pensions, entièrement à votre charge.",
  intro: [
    "L'assurance volontaire permet aux personnes qui ne sont pas salariées de cotiser elles-mêmes à la CNSS pour leur retraite.",
    "Indiquez le revenu mensuel sur lequel vous cotisez. Vous obtenez la cotisation par mois, par trimestre et par an.",
  ],
  comoSeCalcula: [
    "La participation de l'assuré volontaire est de {{bf.cnss-assurance-volontaire}} au titre de la branche des pensions.",
    "Elle est entièrement à la charge de l'assuré.",
    "Cotisation mensuelle = revenu × {{bf.cnss-assurance-volontaire}}.",
  ],
  ejemplo: ["Avec un revenu de 100 000 F par mois, la cotisation est de 14 000 F par mois, soit 168 000 F par an."],
  faq: [
    {
      pregunta: "Que couvre l'assurance volontaire ?",
      respuesta: "La branche des pensions : elle prépare une pension de vieillesse versée par la CNSS.",
    },
    {
      pregunta: "À quel âge l'assuré volontaire touche-t-il sa pension ?",
      respuesta: "Selon la CNSS, la pension de vieillesse de l'assuré volontaire court à partir de 56 ans révolus.",
    },
    {
      pregunta: "Combien d'années faut-il cotiser ?",
      respuesta: "La pension de vieillesse normale demande au moins quinze ans de cotisation.",
    },
  ],
  glosario: [
    { termino: "Assuré volontaire", definicion: "Une personne qui s'affilie elle-même à la CNSS, sans employeur." },
    { termino: "Branche des pensions", definicion: "La partie de la sécurité sociale qui finance les pensions de vieillesse, d'invalidité et de survivants." },
  ],
});
