import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ma.droits-enregistrement",
  h1: "Calcul des droits d'enregistrement sur un achat immobilier au Maroc",
  title: "Droits d'enregistrement Maroc : {{ma.droits-enregistrement[locaux-construits]}} et {{ma.droits-enregistrement[terrains-nus]}}",
  description:
    "Calculez les droits d'enregistrement d'un achat immobilier au Maroc : {{ma.droits-enregistrement[locaux-construits]}} pour un logement ou un local construit, {{ma.droits-enregistrement[terrains-nus]}} pour un terrain nu.",
  intro: [
    "Quand vous achetez un bien immobilier au Maroc, l'acte de vente est soumis aux droits d'enregistrement, calculés sur le prix d'acquisition.",
    "Le taux est de {{ma.droits-enregistrement[locaux-construits]}} pour les locaux construits et de {{ma.droits-enregistrement[terrains-nus]}} pour les terrains nus. Indiquez le prix et le type de bien pour obtenir le montant.",
  ],
  comoSeCalcula: [
    "Droits = prix d'acquisition × taux.",
    "Le taux de {{ma.droits-enregistrement[locaux-construits]}} vaut aussi pour le terrain sur lequel le local est construit, dans la limite de cinq fois la superficie couverte.",
    "Les droits ne peuvent pas être inférieurs à {{ma.droits-enregistrement-minimum}}.",
  ],
  ejemplo: ["Pour un appartement acheté 900 000 DH, les droits d'enregistrement sont de 36 000 DH."],
  faq: [
    {
      pregunta: "Quels autres frais faut-il prévoir ?",
      respuesta:
        "Les droits d'enregistrement ne sont qu'une partie des frais d'acquisition. Il faut ajouter notamment les frais de conservation foncière et les honoraires du notaire ou de l'adoul.",
    },
    {
      pregunta: "Le taux de {{ma.droits-enregistrement[locaux-construits]}} vaut-il aussi pour un local commercial ?",
      respuesta: "Oui. Il s'applique aux locaux construits destinés à l'habitation, au commerce, à une activité professionnelle ou administrative.",
    },
    {
      pregunta: "Existe-t-il un droit supplémentaire ?",
      respuesta:
        "Le code général des impôts prévoit un droit supplémentaire de 2 % dans certains cas pour les mutations d'immeubles dont le prix dépasse 300 000 DH. Il n'est pas inclus dans ce calcul.",
    },
  ],
  glosario: [
    { termino: "Droits d'enregistrement", definicion: "L'impôt perçu lors de l'enregistrement d'un acte, ici l'acte d'achat d'un bien immobilier." },
    { termino: "Terrain nu", definicion: "Un terrain sans construction, ou avec des constructions destinées à être démolies." },
  ],
});
