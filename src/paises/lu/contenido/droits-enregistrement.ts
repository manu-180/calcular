import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lu.droits-enregistrement",
  h1: "Calcul des droits d'enregistrement et du Bëllegen Akt",
  title: "Droits d'enregistrement Luxembourg : Bëllegen Akt 2026",
  description: "Frais d'achat d'un logement au Luxembourg : 6 % d'enregistrement et 1 % de transcription, moins le crédit d'impôt Bëllegen Akt de {{lu.bellegen-akt}} par acquéreur.",
  intro: [
    "À l'achat d'une maison, d'un appartement ou d'un terrain à bâtir, les droits s'élèvent à 7 % : {{lu.droits-enregistrement}} d'enregistrement et {{lu.droits-transcription}} de transcription.",
    "Pour son habitation personnelle, chaque acquéreur peut demander le crédit d'impôt Bëllegen Akt, limité à {{lu.bellegen-akt}}.",
  ],
  comoSeCalcula: [
    "Droits = prix x ({{lu.droits-enregistrement}} + {{lu.droits-transcription}}).",
    "Crédit d'impôt : jusqu'à {{lu.bellegen-akt}} par acquéreur. L'administration perçoit dans tous les cas au moins {{lu.droits-minimum}}.",
  ],
  ejemplo: [
    "Pour un achat de 750.000 euros, les droits s'élèvent à 52.500 euros. Seul acquéreur, vous payez 12.500 euros après le crédit de 40.000 euros. À deux, il reste 100 euros à payer.",
  ],
  faq: [
    { pregunta: "Quelles conditions pour le Bëllegen Akt ?", respuesta: "Occuper personnellement le bien dans les 2 ans (4 ans pour un terrain ou un immeuble en construction) et pendant au moins 2 ans sans interruption. Le notaire fait la demande dans l'acte." },
    { pregunta: "Le crédit vaut-il pour un bien locatif ?", respuesta: "Non. Les résidences secondaires, les maisons de week-end et les immeubles destinés à la location ou au commerce sont exclus." },
    { pregunta: "Les non-résidents y ont-ils droit ?", respuesta: "Oui, s'ils s'engagent à s'installer au Luxembourg dans le bien acquis." },
  ],
  glosario: [
    { termino: "Bëllegen Akt", definicion: "Nom luxembourgeois du crédit d'impôt sur les actes notariés." },
  ],
});
