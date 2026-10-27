import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cm.salaire-net-en-brut",
  h1: "Calcul du salaire brut à partir du net",
  title: "Salaire net en brut au Cameroun : quel brut prévoir",
  description:
    "Vous connaissez le net voulu ? Trouvez le brut qui le donne, avec l'IRPP, la pension CNPS de {{cm.cnps-pension[salarie]}} et les autres retenues.",
  intro: [
    "Pour une négociation ou une offre d'emploi, on raisonne souvent en net. L'employeur, lui, fixe un brut.",
    "Indiquez le net mensuel souhaité. Le calcul cherche le brut qui donne ce net après toutes les retenues du bulletin.",
  ],
  comoSeCalcula: [
    "Les retenues sont les mêmes que dans le calcul du salaire net : IRPP et centimes communaux, pension CNPS, Crédit foncier, redevance audiovisuelle et taxe de développement local.",
    "Le brut est trouvé par essais successifs, au franc près. On suppose que tout le brut est du salaire de base et qu'il n'y a pas d'allocation non imposable.",
  ],
  ejemplo: ["Pour toucher 423 550 F nets, il faut un brut d'environ 500 000 F."],
  faq: [
    {
      pregunta: "Pourquoi le net obtenu dépasse-t-il parfois un peu le net demandé ?",
      respuesta: "La redevance audiovisuelle et la taxe de développement local changent par paliers. Un franc de brut en plus peut faire changer de tranche.",
    },
    {
      pregunta: "Le calcul tient-il compte des allocations familiales ?",
      respuesta: "Non. Elles ne sont pas imposables et s'ajoutent au net. Retirez-les du net souhaité avant le calcul.",
    },
    {
      pregunta: "Combien coûte ce brut à l'employeur ?",
      respuesta: "Il faut y ajouter les charges patronales. Le calcul du coût employeur les donne à partir du brut.",
    },
  ],
  glosario: [{ termino: "Salaire brut", definicion: "Le salaire avant les retenues fiscales et sociales." }],
});
