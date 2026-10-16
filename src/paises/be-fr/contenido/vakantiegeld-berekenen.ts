import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "be-fr.vakantiegeld-berekenen",
  h1: "Calcul du pécule de vacances pour employés et ouvriers",
  title: "Pécule de vacances 2026 : double, ouvriers et sortie",
  description:
    "Calculez votre pécule de vacances : double pécule de {{be.vakantiegeld[dubbel-bediende]}} du salaire mensuel pour un employé, {{be.vakantiegeld[arbeider]}} pour un ouvrier, ou pécule de sortie.",
  intro: [
    "Le calcul du pécule de vacances dépend de votre statut. Un employé le reçoit de son employeur, un ouvrier de l'ONVA ou d'une caisse de vacances.",
    "Choisissez votre situation et indiquez votre salaire. Vous voyez votre pécule brut et, pour un employé, les cotisations ONSS retenues dessus.",
  ],
  comoSeCalcula: [
    "Employé : le simple pécule est votre salaire normal pendant vos jours de vacances. Le double pécule est de {{be.vakantiegeld[dubbel-bediende]}} de votre salaire mensuel brut, en proportion des mois travaillés l'année passée.",
    "Sur le double pécule, {{be.rsz-werknemer}} d'ONSS sont retenus, calculés sur 85/92 du montant.",
    "Ouvrier : {{be.vakantiegeld[arbeider]}} de votre salaire brut de l'année passée, porté à 108 %. Ce montant couvre le simple et le double pécule ensemble.",
    "Sortie : si vous quittez l'entreprise comme employé, vous recevez {{be.vakantiegeld[vertrek]}} du salaire brut gagné cette année chez cet employeur.",
  ],
  ejemplo: [
    "Un employé avec 3.100 € bruts qui a travaillé toute l'année passée reçoit 2.852 € de double pécule. On y retire 344,39 € d'ONSS.",
  ],
  faq: [
    {
      pregunta: "Pourquoi un ouvrier reçoit-il son pécule de l'ONVA ?",
      respuesta:
        "Pour les ouvriers, l'employeur paie des cotisations pour le régime des vacances à l'ONSS. L'Office national des vacances annuelles ou une caisse de vacances verse ensuite le pécule.",
    },
    {
      pregunta: "Pourquoi l'ONSS est-elle calculée sur 85/92 du double pécule ?",
      respuesta:
        "L'ONSS ne perçoit pas la cotisation de {{be.rsz-werknemer}} sur la partie qui correspond au salaire à partir du troisième jour de la quatrième semaine de vacances. Cette partie disparaît en multipliant le montant par 85/92.",
    },
    {
      pregunta: "Qu'est-ce que le pécule de sortie ?",
      respuesta:
        "Le pécule de vacances qu'un employé reçoit quand son contrat prend fin. Il a une partie simple et une partie double et représente ensemble {{be.vakantiegeld[vertrek]}} du salaire brut.",
    },
  ],
  glosario: [
    { termino: "Simple pécule de vacances", definicion: "Le salaire normal pour vos jours de vacances légaux." },
    { termino: "Double pécule de vacances", definicion: "Un montant supplémentaire en plus du salaire, une fois par an." },
    { termino: "ONVA", definicion: "Office national des vacances annuelles, qui verse le pécule de vacances de nombreux ouvriers." },
    { termino: "Exercice de vacances", definicion: "L'année pendant laquelle vous travaillez et constituez ainsi des vacances et un pécule pour l'année suivante." },
  ],
});
