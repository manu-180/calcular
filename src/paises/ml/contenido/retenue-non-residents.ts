import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ml.retenue-non-residents",
  h1: "Retenue à la source sur les paiements aux non-résidents au Mali",
  title: "Retenue sur prestataires non-résidents au Mali : calcul",
  description: "Calculez la retenue à la source de {{ml.retenue-non-residents-taux}} sur les sommes payées à un prestataire sans installation au Mali, après la déduction forfaitaire.",
  intro: [
    "Quand une entreprise paie un prestataire qui n'a pas d'installation professionnelle permanente au Mali, elle retient un impôt à la source et le reverse aux Impôts.",
    "Indiquez le montant brut payé et la nature de l'opération. Vous obtenez la retenue et le montant versé au prestataire.",
  ],
  comoSeCalcula: [
    "On applique d'abord une déduction forfaitaire pour charges : {{ml.retenue-non-residents-abattement[prestations]}} pour les prestations de services, {{ml.retenue-non-residents-abattement[marches]}} pour les marchés, contrats de travaux et fournitures.",
    "Le taux de {{ml.retenue-non-residents-taux}} s'applique au montant restant.",
  ],
  ejemplo: ["Pour une assistance technique facturée 10 000 000 F, la base est de 5 000 000 F et la retenue de 1 500 000 F, soit 15 % du montant brut."],
  faq: [
    {
      pregunta: "Quels paiements sont concernés ?",
      respuesta:
        "Les honoraires des professions libérales, les droits d'auteur, les redevances de brevets et de marques, la location d'équipements, les études, l'assistance technique, financière ou comptable, et les marchés publics, quand le bénéficiaire n'est pas installé au Mali.",
    },
    {
      pregunta: "Une convention fiscale peut-elle changer le taux ?",
      respuesta: "Oui. La retenue s'applique sous réserve des conventions de non double imposition signées par le Mali.",
    },
    {
      pregunta: "Cette retenue remplace-t-elle la retenue de TVA ?",
      respuesta: "Non. Elle est indépendante de la retenue relative aux taxes sur le chiffre d'affaires prévue par le Livre de procédures fiscales.",
    },
  ],
  glosario: [
    { termino: "Non-résident", definicion: "Personne ou société sans installation professionnelle permanente au Mali." },
    { termino: "Déduction forfaitaire", definicion: "La part du montant brut considérée comme des charges, retirée avant d'appliquer le taux." },
  ],
});
