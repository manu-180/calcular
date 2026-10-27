import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cm.impot-general-synthetique",
  h1: "Calcul de l'impôt général synthétique (IGS)",
  title: "Impôt général synthétique (IGS) : calcul du montant",
  description:
    "Calculez votre IGS selon votre chiffre d'affaires hors taxes, avec la réduction de {{cm.igs-reduction-cga}} pour les adhérents d'un centre de gestion agréé.",
  intro: [
    "L'impôt général synthétique (IGS) est l'impôt des petites entreprises. Il remplace la patente, la TVA et l'IRPP sur les bénéfices.",
    "Son montant est fixe selon la tranche de chiffre d'affaires annuel hors taxes.",
  ],
  comoSeCalcula: [
    "Le tarif va de {{cm.igs-bareme[0].cuotaFija}} par an sous {{cm.igs-bareme[1].desde}} de chiffre d'affaires à {{cm.igs-bareme[-1].cuotaFija}} pour la dernière tranche.",
    "L'IGS concerne un chiffre d'affaires inférieur à {{cm.igs-seuils[commercial]}} pour le commerce, l'industrie, l'artisanat ou l'agropastoral, et à {{cm.igs-seuils[liberal]}} pour les professions libérales.",
    "L'adhésion à un centre de gestion agréé réduit le tarif de {{cm.igs-reduction-cga}} pour les contribuables tenus d'avoir une comptabilité.",
  ],
  ejemplo: ["Une boutique qui réalise 8 000 000 F de chiffre d'affaires paie 300 000 F d'IGS par an, soit 75 000 F par trimestre."],
  faq: [
    {
      pregunta: "Quand payer l'IGS ?",
      respuesta: "Chaque trimestre, dans les quinze jours qui suivent sa fin, par déclaration électronique. La déclaration annuelle des revenus se dépose au plus tard le 15 mars.",
    },
    {
      pregunta: "Que se passe-t-il si je dépasse le seuil ?",
      respuesta: "Vous êtes reclassé d'office au régime du réel. Vous payez alors la TVA, l'impôt sur le revenu ou sur les sociétés et la patente.",
    },
    {
      pregunta: "L'IGS couvre-t-il les charges sur mes salariés ?",
      respuesta: "Non. Vous restez redevable des retenues à la source, des licences et des charges fiscales et sociales sur vos employés.",
    },
  ],
  glosario: [
    { termino: "Chiffre d'affaires hors taxes", definicion: "Le total des ventes ou des recettes de l'année, sans les taxes." },
    { termino: "Centre de gestion agréé", definicion: "Organisme qui aide les petites entreprises à tenir leur comptabilité et leurs déclarations." },
  ],
});
