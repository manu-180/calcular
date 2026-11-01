import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cm.vignette-automobile",
  h1: "Prix de la vignette automobile au Cameroun",
  title: "Vignette auto Cameroun : droit de timbre automobile",
  description:
    "Trouvez le droit de timbre automobile de votre véhicule selon sa puissance fiscale : de {{cm.timbre-automobile[autre-2-7]}} à {{cm.timbre-automobile[autre-21]}} pour une voiture.",
  intro: [
    "Le droit de timbre automobile, appelé couramment vignette, est un impôt annuel sur les véhicules à moteur. Son montant dépend de la puissance fiscale.",
    "Il est collecté avec l'assurance du véhicule.",
  ],
  comoSeCalcula: [
    "Voitures et autres véhicules : {{cm.timbre-automobile[autre-2-7]}} de 2 à 7 CV, {{cm.timbre-automobile[autre-8-13]}} de 8 à 13 CV, {{cm.timbre-automobile[autre-14-20]}} de 14 à 20 CV et {{cm.timbre-automobile[autre-21]}} au-delà.",
    "Transport public avec licence : {{cm.timbre-automobile[transport-2-7]}}, {{cm.timbre-automobile[transport-8-13]}}, {{cm.timbre-automobile[transport-14-20]}} et {{cm.timbre-automobile[transport-21]}} selon les mêmes tranches.",
    "Motocyclettes : {{cm.timbre-automobile[moto-2-roues]}} à deux roues et {{cm.timbre-automobile[moto-3-roues]}} à trois roues. À partir de 2 CV, elles paient le tarif des véhicules.",
  ],
  ejemplo: ["Une voiture de 8 CV paie 50 000 F de droit de timbre automobile par an."],
  faq: [
    {
      pregunta: "Quand payer la vignette ?",
      respuesta: "Le droit est annuel. Il est payé avec l'assurance du véhicule, au moment de souscrire ou de renouveler la police.",
    },
    {
      pregunta: "Que risque-t-on sans vignette ?",
      respuesta: "C'est une contravention. Il faut en plus payer le droit dû et un droit en sus à titre de pénalité.",
    },
    {
      pregunta: "Comment prouver le paiement ?",
      respuesta: "Par l'attestation de paiement produite par le système informatique de l'administration fiscale, à présenter lors des contrôles.",
    },
  ],
  glosario: [{ termino: "Puissance fiscale", definicion: "Puissance administrative du véhicule en chevaux fiscaux (CV), inscrite sur la carte grise." }],
});
