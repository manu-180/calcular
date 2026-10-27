import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cm.droits-de-mutation",
  h1: "Calcul des droits de mutation d'un immeuble",
  title: "Droits de mutation au Cameroun : achat de maison ou terrain",
  description:
    "Calculez le droit de mutation sur l'achat d'un bien : {{cm.droits-mutation[urbain-bati]}} pour un immeuble urbain bâti, moins pour un terrain ou un bien rural.",
  intro: [
    "L'achat d'une maison ou d'un terrain donne lieu à un droit de mutation, perçu à l'enregistrement de l'acte au profit des communes.",
    "Son taux dépend de la nature du bien : urbain ou rural, bâti ou non bâti.",
  ],
  comoSeCalcula: [
    "Immeuble urbain bâti : {{cm.droits-mutation[urbain-bati]}} du prix.",
    "Terrain urbain non bâti ou immeuble rural bâti : {{cm.droits-mutation[urbain-non-bati]}}.",
    "Terrain rural non bâti : {{cm.droits-mutation[rural-non-bati]}}.",
  ],
  ejemplo: ["Pour une maison en ville achetée 30 millions, le droit de mutation est de 3 millions."],
  faq: [
    {
      pregunta: "Le calcul comprend-il les frais de notaire ?",
      respuesta: "Non. Il ne donne que le droit de mutation. Les honoraires du notaire et les frais d'inscription au titre foncier s'ajoutent.",
    },
    {
      pregunta: "Faut-il être à jour de la taxe foncière ?",
      respuesta: "Oui. L'acte de vente ne peut être enregistré sans la preuve du paiement de la taxe sur la propriété foncière.",
    },
    {
      pregunta: "Le droit porte-t-il sur le prix déclaré ?",
      respuesta: "Oui, sur le prix ou la valeur indiqués dans l'acte.",
    },
  ],
  glosario: [{ termino: "Mutation", definicion: "Transfert de la propriété d'un bien d'une personne à une autre." }],
});
