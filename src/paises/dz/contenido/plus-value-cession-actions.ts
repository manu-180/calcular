import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dz.plus-value-cession-actions",
  h1: "Impôt sur la plus-value de cession d'actions et de parts sociales",
  title: "Plus-value sur cession d'actions en Algérie : IRG de {{dz.pv-titres[normal]}}",
  description:
    "La plus-value de cession d'actions ou de parts sociales est imposée à {{dz.pv-titres[normal]}}, ou {{dz.pv-titres[reinvesti]}} en cas de réinvestissement. Calculez l'IRG à payer.",
  intro: [
    "Le particulier qui cède des actions, des parts sociales ou des titres assimilés en dehors de son activité professionnelle paie l'IRG sur la plus-value réalisée.",
    "Indiquez le prix de cession, le prix d'acquisition et votre situation pour obtenir l'impôt et le produit net de la vente.",
  ],
  comoSeCalcula: [
    "Plus-value = prix de cession, diminué des droits, taxes et frais supportés par le vendeur, moins le prix d'acquisition ou de souscription.",
    "Cédant domicilié en Algérie : {{dz.pv-titres[normal]}}, libératoire d'impôt.",
    "Taux réduit de {{dz.pv-titres[reinvesti]}} avec l'engagement de réinvestir la plus-value au capital d'entreprises avant la fin de l'année qui suit la cession.",
    "Cédant domicilié hors d'Algérie : retenue à la source de {{dz.pv-titres[non-resident]}}.",
  ],
  faq: [
    {
      pregunta: "Que se passe-t-il si je ne réinvestis pas ?",
      respuesta:
        "L'administration rappelle la différence entre l'impôt au taux normal et celui payé au taux réduit, avec une majoration de 25 %, selon l'article 104 du code des impôts directs et taxes assimilées.",
    },
    {
      pregunta: "Où payer l'impôt ?",
      respuesta: "À la recette des impôts de rattachement du siège social de la société, dans un délai de trente jours à compter de la cession.",
    },
    {
      pregunta: "Les titres reçus en héritage sont-ils concernés ?",
      respuesta: "Oui. Leur valeur vénale à la date de la donation ou de la succession remplace le prix d'acquisition pour calculer la plus-value.",
    },
  ],
  glosario: [
    { termino: "Parts sociales", definicion: "Titres qui représentent le capital d'une SARL ou d'une EURL." },
    { termino: "Taux libératoire", definicion: "Taux qui solde l'imposition de la plus-value, sans autre déclaration au barème." },
  ],
});
