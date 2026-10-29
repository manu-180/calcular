import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mg.droit-enregistrement-bail",
  h1: "Droit d'enregistrement d'un bail à Madagascar",
  title: "Enregistrement d'un bail à Madagascar : droit à payer",
  description: "Calculez le droit d'enregistrement d'un contrat de location : {{mg.droit-bail[habitation]}} pour l'habitation, {{mg.droit-bail[autres]}} pour un local commercial ou mixte.",
  intro: [
    "Un bail à durée limitée s'enregistre au service des impôts contre un droit proportionnel aux loyers.",
    "Choisissez le type de bail et indiquez le loyer, les charges et la durée.",
  ],
  comoSeCalcula: [
    "La base est le total des loyers et des charges imposées au locataire sur toute la durée du contrat.",
    "Le taux est de {{mg.droit-bail[habitation]}} pour un logement, de {{mg.droit-bail[autres]}} pour un local commercial, professionnel ou mixte et de {{mg.droit-bail[emphyteotique]}} pour un bail emphytéotique.",
  ],
  ejemplo: ["Un appartement loué 800 000 Ar par mois pour un an : 9 600 000 Ar de loyers, soit 96 000 Ar de droit."],
  faq: [
    {
      pregunta: "Un bail mixte paie-t-il le taux de l'habitation ?",
      respuesta: "Non, il paie {{mg.droit-bail[autres]}}, sauf si le contrat fixe un loyer séparé pour la partie habitation et répartit les locaux.",
    },
    {
      pregunta: "Faut-il tout payer en une fois ?",
      respuesta: "Le droit porte sur toute la durée du contrat, sauf pour un bail à périodes dont le paiement est fractionné.",
    },
    {
      pregunta: "Comment se calcule un bail emphytéotique ?",
      respuesta: "Au taux de {{mg.droit-bail[emphyteotique]}}, sur la plus élevée de la valeur administrative et de la valeur déclarée, payé en une fois. La calculatrice applique ce taux aux loyers indiqués.",
    },
  ],
  glosario: [
    { termino: "Bail emphytéotique", definicion: "Bail de longue durée qui donne au preneur un droit réel sur l'immeuble loué." },
    { termino: "Bail", definicion: "Contrat de location d'un logement, d'un local ou d'un terrain." },
    { termino: "Bail emphytéotique", definicion: "Location de très longue durée qui donne au locataire un droit réel sur le bien." },
  ],
});
