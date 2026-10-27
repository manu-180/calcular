import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mg.droits-enregistrement-cession",
  h1: "Droits d'enregistrement sur la vente d'une voiture, d'un fonds ou de parts",
  title: "Droits d'enregistrement Madagascar : voiture, parts, fonds",
  description: "Calculez les droits d'enregistrement d'une vente : {{mg.droit-cession[meubles]}} pour une voiture, {{mg.droit-cession[utilitaire]}} pour un utilitaire, {{mg.droit-cession[parts]}} pour des parts sociales.",
  intro: [
    "La vente d'un véhicule, d'un fonds de commerce, de parts sociales ou d'une créance est soumise à un droit d'enregistrement.",
    "Choisissez ce qui est vendu et indiquez le prix.",
  ],
  comoSeCalcula: [
    "Voiture ou autre bien meuble : {{mg.droit-cession[meubles]}}. Camion, camionnette, car de plus de 10 places, engins et tracteurs agricoles : {{mg.droit-cession[utilitaire]}}. Voiture d'occasion vendue par un concessionnaire : {{mg.droit-cession[occasion-concession]}}.",
    "Fonds de commerce ou clientèle : {{mg.droit-cession[fonds]}}, et {{mg.droit-cession[marchandises]}} pour les marchandises neuves inventoriées à part. Actions et parts sociales : {{mg.droit-cession[parts]}}. Créances : {{mg.droit-cession[creances]}}.",
  ],
  ejemplo: ["Une voiture vendue 30 000 000 Ar entre particuliers : 1 500 000 Ar de droits."],
  faq: [
    {
      pregunta: "Le prix déclaré suffit-il pour une voiture ?",
      respuesta: "Non. Pour une voiture, la base ne peut pas être inférieure à la valeur minimale fixée par décision du ministre chargé de la réglementation fiscale.",
    },
    {
      pregunta: "Comment sont évaluées les parts d'une société ?",
      respuesta: "L'administration applique sa table financière selon l'activité de la société. Le droit se calcule sur cette valeur si elle dépasse le prix.",
    },
    {
      pregunta: "Les marchandises d'un fonds de commerce paient-elles {{mg.droit-cession[fonds]}} ?",
      respuesta: "Non, {{mg.droit-cession[marchandises]}} si elles ont un prix séparé et sont détaillées article par article dans un état distinct.",
    },
  ],
  glosario: [
    { termino: "Fonds de commerce", definicion: "Ensemble de la clientèle, du nom, du droit au bail et du matériel d'un commerce." },
    { termino: "Cession", definicion: "Vente ou transfert d'un bien ou d'un droit." },
  ],
});
