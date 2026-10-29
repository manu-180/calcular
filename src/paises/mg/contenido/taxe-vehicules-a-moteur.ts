import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mg.taxe-vehicules-a-moteur",
  h1: "Taxe sur les véhicules à moteur à Madagascar",
  title: "Taxe sur les véhicules à moteur {{anio}} : tarif selon CV",
  description: "Trouvez la taxe annuelle de votre voiture ou de votre moto à Madagascar selon la puissance, l'énergie et l'âge : de {{mg.taxe-vehicules[electrique-1-4-a5]}} à {{mg.taxe-vehicules[diesel-16-plus20]}}.",
  intro: [
    "Tout véhicule soumis à l'immatriculation paie chaque année la taxe sur les véhicules à moteur, qu'il roule à l'essence, au diesel, à l'électricité ou en hybride, de {{mg.taxe-vehicules[electrique-1-4-a5]}} à {{mg.taxe-vehicules[diesel-16-plus20]}} selon la puissance et l'âge.",
    "Choisissez la puissance fiscale, l'énergie et l'âge du véhicule pour lire le tarif du Code des impôts.",
  ],
  comoSeCalcula: [
    "Le tarif dépend de trois critères : la puissance fiscale (ou la cylindrée pour les deux-roues), la source d'énergie et l'âge compté depuis la première mise en circulation.",
    "Une voiture essence de 5 à 9 CV paie {{mg.taxe-vehicules[essence-5-9-a5]}} jusqu'à 5 ans, {{mg.taxe-vehicules[essence-5-9-a10]}} de 5 à 10 ans, {{mg.taxe-vehicules[essence-5-9-a20]}} de 10 à 20 ans et {{mg.taxe-vehicules[essence-5-9-plus20]}} au-delà.",
    "L'âge s'apprécie au premier jour de la période d'imposition.",
  ],
  ejemplo: ["Une voiture essence de 7 CV mise en circulation il y a 8 ans paie 55 000 Ar par an."],
  faq: [
    {
      pregunta: "Pourquoi un vieux véhicule paie-t-il plus ?",
      respuesta: "Le tarif augmente avec l'âge du véhicule : il est plus bas pour un véhicule de 5 ans ou moins et plus élevé au-delà de 20 ans.",
    },
    { pregunta: "Quels véhicules sont exonérés ?", respuesta: "Les ambulances, les véhicules de sapeurs-pompiers, les véhicules administratifs, les engins agricoles et les véhicules exonérés par une convention internationale." },
    {
      pregunta: "Et les bateaux ?",
      respuesta: "Les navires de plaisance de 7 mètres et plus, ou plus courts avec un moteur d'au moins 22 chevaux, paient un forfait annuel. La calculatrice ne traite que les véhicules terrestres.",
    },
  ],
  glosario: [
    { termino: "CV", definicion: "Cheval fiscal : unité de puissance administrative inscrite sur la carte grise." },
    { termino: "Première mise en circulation", definicion: "Date de la première immatriculation du véhicule, à Madagascar ou ailleurs." },
  ],
});
