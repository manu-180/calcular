import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dz.calcul-ifu",
  h1: "Calcul de l'IFU en Algérie",
  title: "Calcul IFU Algérie {{anio}} : impôt forfaitaire unique",
  description:
    "Calculez l'impôt forfaitaire unique : {{dz.ifu-taux[biens]}} pour la vente de biens, {{dz.ifu-taux[autres]}} pour les autres activités, {{dz.ifu-taux[auto-entrepreneur]}} pour l'auto-entrepreneur.",
  intro: [
    "L'impôt forfaitaire unique (IFU) se calcule sur le chiffre d'affaires et non sur le bénéfice. Il concerne les personnes physiques dont le chiffre d'affaires annuel ne dépasse pas {{dz.ifu-plafond}}, ainsi que les auto-entrepreneurs.",
    "Indiquez votre chiffre d'affaires annuel et votre activité. Le calcul applique le taux et vérifie le minimum d'imposition.",
  ],
  comoSeCalcula: [
    "Production et vente de biens : {{dz.ifu-taux[biens]}} du chiffre d'affaires.",
    "Autres activités : {{dz.ifu-taux[autres]}}.",
    "Activités exercées sous le statut d'auto-entrepreneur : {{dz.ifu-taux[auto-entrepreneur]}}.",
    "L'impôt ne peut pas être inférieur à {{dz.ifu-minimum[general]}} par an, ou {{dz.ifu-minimum[auto-entrepreneur]}} pour un auto-entrepreneur (article 365 bis). Ce minimum se paie au plus tard le 30 juin.",
  ],
  faq: [
    {
      pregunta: "Qui peut être soumis à l'IFU ?",
      respuesta:
        "Les personnes physiques exerçant une activité industrielle, commerciale, non commerciale ou artisanale, les coopératives d'art et d'artisanat traditionnelles et les sociétés civiles professionnelles, si le chiffre d'affaires annuel ne dépasse pas {{dz.ifu-plafond}}. Certaines activités sont exclues, comme la location de véhicules, les agences de voyages ou la publicité.",
    },
    {
      pregunta: "Que se passe-t-il si je dépasse le plafond ?",
      respuesta:
        "L'IFU reste applicable l'année où le plafond est dépassé, en tenant compte du dépassement, et l'année suivante. Au-delà, l'activité quitte le régime de l'IFU.",
    },
    {
      pregunta: "Quel est le taux de l'auto-entrepreneur ?",
      respuesta:
        "{{dz.ifu-taux[auto-entrepreneur]}} du chiffre d'affaires depuis la loi de finances pour 2024, avec un minimum de {{dz.ifu-minimum[auto-entrepreneur]}} par an.",
    },
  ],
  glosario: [
    { termino: "IFU", definicion: "Impôt forfaitaire unique, calculé sur le chiffre d'affaires des petites activités." },
    { termino: "Chiffre d'affaires", definicion: "Total des ventes et des prestations encaissées sur l'année." },
  ],
});
