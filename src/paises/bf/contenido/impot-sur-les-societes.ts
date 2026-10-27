import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bf.impot-sur-les-societes",
  h1: "Calcul de l'impôt sur les sociétés",
  title: "Impôt sur les sociétés Burkina Faso : IS et minimum forfaitaire",
  description:
    "Calculez l'impôt sur les sociétés à {{bf.is-taux}} et le minimum forfaitaire de perception de {{bf.mfp-taux}} du chiffre d'affaires. Le plus élevé est dû.",
  intro: [
    "Les sociétés paient l'impôt sur leur bénéfice. Quand ce bénéfice est faible ou nul, un minimum calculé sur le chiffre d'affaires s'applique.",
    "Indiquez le bénéfice imposable, le chiffre d'affaires et le régime. Vous obtenez l'impôt dû pour l'exercice.",
  ],
  comoSeCalcula: [
    "Impôt sur les sociétés : {{bf.is-taux}} du bénéfice imposable, sans abattement, en négligeant les fractions de 1 000 F.",
    "Minimum forfaitaire de perception : {{bf.mfp-taux}} du chiffre d'affaires hors taxes arrondi aux 100 000 F inférieurs, sans descendre sous {{bf.mfp-minimum[reel-normal]}} au réel normal ou {{bf.mfp-minimum[reel-simplifie]}} au réel simplifié.",
    "Les adhérents d'un centre de gestion agréé ont une réduction de {{bf.mfp-reduction-cga}} du minimum forfaitaire.",
  ],
  ejemplo: ["Bénéfice de 10 000 000 F et chiffre d'affaires de 100 000 000 F au réel normal : 2 750 000 F d'IS, plus élevé que le minimum de 1 000 000 F."],
  faq: [
    {
      pregunta: "Qui paie le minimum forfaitaire ?",
      respuesta: "Les sociétés déficitaires, et celles dont l'impôt sur les sociétés est inférieur au minimum calculé sur leur chiffre d'affaires.",
    },
    {
      pregunta: "Une société nouvelle paie-t-elle le minimum ?",
      respuesta: "Non pour son premier exercice d'exploitation : les sociétés nouvellement créées en sont exonérées.",
    },
    {
      pregunta: "Les stations-service ont-elles un régime particulier ?",
      respuesta:
        "Oui. Les personnes morales qui gèrent exclusivement des stations-service ou distribuent des recharges téléphoniques prépayées paient seulement le montant minimum de leur régime.",
    },
  ],
  glosario: [
    { termino: "Bénéfice imposable", definicion: "Le résultat fiscal de l'exercice, après les réintégrations et déductions prévues par la loi." },
    { termino: "Minimum forfaitaire de perception", definicion: "Impôt minimal calculé sur le chiffre d'affaires hors taxes." },
  ],
});
