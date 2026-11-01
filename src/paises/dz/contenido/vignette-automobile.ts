import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dz.vignette-automobile",
  h1: "Prix de la vignette automobile en Algérie",
  title: "Vignette automobile Algérie {{anio}} : tarif selon CV et âge",
  description:
    "Trouvez le tarif de la vignette automobile en Algérie selon la puissance fiscale et l'âge du véhicule, de {{dz.vignette[6cv-plus-10]}} à {{dz.vignette-10cv[moins-3]}}.",
  intro: [
    "La vignette automobile est un droit de timbre annuel dû pour chaque véhicule de tourisme. Son tarif dépend de la puissance fiscale, en chevaux (CV), et de l'âge du véhicule compté depuis l'année de sa première mise en circulation.",
    "Choisissez la puissance, l'âge et la motorisation de votre véhicule. Depuis 2025, la vignette peut aussi être achetée en ligne.",
  ],
  comoSeCalcula: [
    "Jusqu'à 6 CV : {{dz.vignette[6cv-moins-3]}} avant 3 ans, {{dz.vignette[6cv-3-6]}} de 3 à 6 ans, {{dz.vignette[6cv-6-10]}} jusqu'à 10 ans, {{dz.vignette[6cv-plus-10]}} au-delà.",
    "De 7 à 9 CV : {{dz.vignette[9cv-moins-3]}}, {{dz.vignette[9cv-3-6]}}, {{dz.vignette[9cv-6-10]}} et {{dz.vignette[9cv-plus-10]}}.",
    "10 CV et plus : {{dz.vignette-10cv[moins-3]}}, {{dz.vignette-10cv[3-6]}}, {{dz.vignette-10cv[6-10]}} et {{dz.vignette-10cv[plus-10]}}.",
    "Les véhicules au GNC, électriques ou hybrides sont exemptés.",
  ],
  faq: [
    {
      pregunta: "Combien coûte la vignette pour une voiture de 10 CV ou plus ?",
      respuesta:
        "Depuis la loi de finances pour 2025 : {{dz.vignette-10cv[moins-3]}} pour un véhicule de moins de 3 ans, {{dz.vignette-10cv[3-6]}} de 3 à 6 ans, {{dz.vignette-10cv[6-10]}} jusqu'à 10 ans et {{dz.vignette-10cv[plus-10]}} au-delà.",
    },
    {
      pregunta: "Les voitures électriques paient-elles la vignette ?",
      respuesta: "Non. La loi de finances pour 2026 a ajouté les véhicules électriques ou hybrides et ceux roulant au GNC à la liste des véhicules exemptés.",
    },
    {
      pregunta: "Faut-il coller la vignette achetée en ligne sur le pare-brise ?",
      respuesta:
        "Non. La vignette achetée en ligne et son reçu de paiement se téléchargent. Ils doivent être présentés lors des contrôles ; l'obligation de l'apposer sur le pare-brise ne s'applique pas.",
    },
  ],
  glosario: [
    { termino: "CV", definicion: "Cheval fiscal, unité de puissance administrative indiquée sur la carte grise." },
    { termino: "GNC", definicion: "Gaz naturel carburant." },
  ],
});
