import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dz.cotisations-cnas",
  h1: "Calcul des cotisations CNAS",
  title: "Cotisations CNAS 2026 : part salariale et patronale",
  description:
    "Calculez les cotisations de sécurité sociale versées à la CNAS : {{dz.cnas[salarie]}} à la charge du travailleur, {{dz.cnas[employeur]}} à la charge de l'employeur.",
  intro: [
    "Chaque mois, l'employeur déclare et verse à la CNAS une cotisation de sécurité sociale calculée sur le salaire. Une partie est retenue sur votre paie, l'autre est payée par l'entreprise.",
    "Indiquez le salaire soumis à cotisation pour voir la part de chacun et le total versé.",
  ],
  comoSeCalcula: [
    "Part du travailleur : {{dz.cnas[salarie]}} de l'assiette de cotisation, retenue sur le salaire.",
    "Part de l'employeur : {{dz.cnas[employeur]}}.",
    "Quote-part du fonds des œuvres sociales : {{dz.cnas[oeuvres-sociales]}}.",
    "Cette répartition est fixée par le décret exécutif n° 06-339 du 25 septembre 2006.",
  ],
  faq: [
    {
      pregunta: "Que financent ces cotisations ?",
      respuesta:
        "Le décret répartit la cotisation entre les assurances sociales, les accidents du travail et maladies professionnelles, la retraite, l'assurance chômage et la retraite anticipée.",
    },
    {
      pregunta: "Y a-t-il un plafond de cotisation ?",
      respuesta: "Le décret de répartition ne fixe pas de plafond : les taux s'appliquent à toute l'assiette de cotisation déclarée.",
    },
    {
      pregunta: "Les non-salariés cotisent-ils à la CNAS ?",
      respuesta: "Non. Commerçants, artisans, professions libérales et autres non-salariés relèvent de la CASNOS, avec leurs propres règles.",
    },
  ],
  glosario: [
    { termino: "CNAS", definicion: "Caisse nationale des assurances sociales des travailleurs salariés." },
    { termino: "Assiette de cotisation", definicion: "Partie de la rémunération sur laquelle s'appliquent les taux de cotisation." },
    { termino: "CASNOS", definicion: "Caisse nationale de sécurité sociale des non-salariés." },
  ],
});
