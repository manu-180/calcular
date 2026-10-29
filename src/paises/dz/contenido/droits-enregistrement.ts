import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dz.droits-enregistrement",
  h1: "Calcul des droits d'enregistrement d'un bien immobilier en Algérie",
  title: "Droits d'enregistrement Algérie {{anio}} : vente immobilière",
  description:
    "Calculez les droits d'enregistrement d'une vente immobilière en Algérie : {{dz.droits-mutation[vente]}} du prix, ou {{dz.droits-mutation[promesse]}} sur la promesse et autant sur l'acte final.",
  intro: [
    "Toute vente d'immeuble ou de droit immobilier passe par un acte enregistré, qui supporte un droit proportionnel au prix. Ce droit est prévu à l'article 252 du code de l'enregistrement.",
    "Indiquez le prix et le type d'acte. La loi de finances pour 2026 a créé un régime propre à la promesse de vente.",
  ],
  comoSeCalcula: [
    "Vente directe : {{dz.droits-mutation[vente]}} du prix.",
    "Promesse de vente : {{dz.droits-mutation[promesse]}} du prix, puis {{dz.droits-mutation[concretisation]}} sur l'acte qui concrétise la promesse.",
    "Si la promesse est résiliée avant son exécution, l'acte de résiliation supporte un droit fixe.",
  ],
  faq: [
    {
      pregunta: "Les droits d'enregistrement comprennent-ils les frais de notaire ?",
      respuesta:
        "Non. Le calcul ne donne que le droit d'enregistrement de l'article 252. Les honoraires du notaire et les autres frais de l'acte n'y sont pas compris.",
    },
    {
      pregunta: "Sur quel montant se calcule le droit ?",
      respuesta:
        "Sur le prix exprimé dans l'acte de vente. Indiquez ce prix dans le calcul.",
    },
    {
      pregunta: "La promesse de vente coûte-t-elle plus cher qu'une vente directe ?",
      respuesta:
        "Non. Le total est le même : {{dz.droits-mutation[promesse]}} sur la promesse et {{dz.droits-mutation[concretisation]}} sur l'acte final, soit autant que le droit de {{dz.droits-mutation[vente]}} d'une vente directe.",
    },
  ],
  glosario: [
    { termino: "Droit d'enregistrement", definicion: "Taxe perçue lors de l'enregistrement d'un acte par l'administration fiscale." },
    { termino: "Promesse de vente", definicion: "Acte par lequel le propriétaire s'engage à vendre le bien à un acheteur à des conditions fixées." },
  ],
});
