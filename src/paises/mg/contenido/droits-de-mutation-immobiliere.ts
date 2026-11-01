import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mg.droits-de-mutation-immobiliere",
  h1: "Droits d'enregistrement sur l'achat d'un terrain ou d'une maison",
  title: "Droits de mutation immobilière à Madagascar : calcul",
  description: "Calculez les droits d'enregistrement de {{mg.droit-mutation-immeuble}} payés par l'acheteur d'un bien immobilier à Madagascar, et l'IPVI du vendeur particulier.",
  intro: [
    "L'achat d'un terrain, d'une maison ou d'un appartement est soumis à un droit d'enregistrement payé au service des impôts.",
    "Indiquez le prix et les charges ajoutées pour connaître les droits, ainsi que l'impôt sur la plus-value du vendeur s'il est un particulier.",
  ],
  comoSeCalcula: [
    "Les droits sont de {{mg.droit-mutation-immeuble}} du prix, augmenté des charges en capital et des indemnités versées au vendeur.",
    "Le vendeur particulier paie l'IPVI : {{mg.ipvi-taux}} d'une plus-value fixée à la différence entre le prix et un prix de revient de {{mg.ipvi-prix-revient}} de ce prix.",
  ],
  ejemplo: ["Pour une maison vendue 150 000 000 Ar, l'acheteur paie 7 500 000 Ar de droits. Le vendeur particulier paie 7 500 000 Ar d'IPVI."],
  faq: [
    { pregunta: "Qui paie les droits d'enregistrement ?", respuesta: "En pratique, l'acheteur, au moment de faire enregistrer l'acte de vente." },
    {
      pregunta: "Les frais de notaire sont-ils compris ?",
      respuesta: "Non. La calculatrice ne donne que l'impôt prévu par le Code des impôts. Les honoraires du notaire et les frais de la conservation foncière s'ajoutent.",
    },
    {
      pregunta: "Le droit s'applique-t-il à une prescription acquisitive ?",
      respuesta: "Oui. Le même taux s'applique, sur la valeur vénale du bien à la date du jugement qui constate la prescription.",
    },
  ],
  glosario: [
    { termino: "Mutation", definicion: "Transfert de propriété d'un bien d'une personne à une autre." },
    { termino: "Charges en capital", definicion: "Sommes que l'acheteur paie à la place du vendeur, en plus du prix." },
  ],
});
