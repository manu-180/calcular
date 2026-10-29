import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "be-fr.loonkost-berekenen",
  h1: "Calcul du coût employeur : combien coûte un travailleur ?",
  title: "Calcul du coût employeur {{anio}} : salaire brut et cotisations",
  description:
    "Calculez ce que coûte un travailleur à l'employeur : salaire brut, cotisations patronales ONSS, pécule de vacances des ouvriers et double pécule des employés.",
  intro: [
    "Un travailleur coûte plus que son salaire brut. En plus du salaire, l'employeur paie des cotisations ONSS : une cotisation de base de {{be.rsz-werkgever[basis]}} et une cotisation de modération salariale de {{be.rsz-werkgever[loonmatiging]}} pour la plupart des travailleurs du secteur privé.",
    "Indiquez le salaire brut et choisissez employé ou ouvrier. Vous voyez le coût par mois et par an, sans les réductions auxquelles vous avez peut-être droit.",
  ],
  comoSeCalcula: [
    "Cotisations patronales : cotisation de base plus modération salariale sur le salaire brut. Pour les ouvriers, sur 108 % du brut.",
    "Ouvriers : s'y ajoute une cotisation pour le pécule de vacances, que l'ONVA ou une caisse de vacances verse.",
    "Employés : l'employeur paie lui-même leur pécule de vacances. Le simple pécule est le salaire normal pendant les vacances, le double pécule s'ajoute une fois par an.",
    "Coût annuel : 12 fois le coût mensuel, plus le double pécule de vacances des employés.",
  ],
  ejemplo: [
    "Un employé avec 3.000 € bruts coûte 750 € de cotisations patronales, soit 3.750 € par mois. Avec le double pécule de vacances, cela donne 47.760 € par an.",
  ],
  faq: [
    {
      pregunta: "L'employeur paie-t-il toujours le même taux ?",
      respuesta:
        "Le taux de {{be.rsz-werkgever[basis]}} de cotisation de base et {{be.rsz-werkgever[loonmatiging]}} de modération salariale vaut pour la plupart des travailleurs du secteur privé. D'autres catégories, comme le secteur public, ont d'autres pourcentages. Les réductions peuvent fortement diminuer le coût réel.",
    },
    {
      pregunta: "Pourquoi les cotisations sont-elles plus élevées pour un ouvrier ?",
      respuesta:
        "Pour les ouvriers, les cotisations sont calculées sur 108 % du salaire brut, et l'employeur paie une cotisation supplémentaire de {{be.rsz-werkgever[vakantie-arbeiders]}} sur ce montant pour le régime des vacances. Elle finance le pécule de vacances versé par l'ONVA ou une caisse de vacances.",
    },
    {
      pregunta: "Qu'est-ce qui n'est pas compris dans ce calcul ?",
      respuesta:
        "La prime de fin d'année, les chèques-repas, l'assurance accidents du travail, une assurance groupe, les frais de déplacement et les réductions ONSS. Ils dépendent de votre secteur et de votre entreprise.",
    },
  ],
  glosario: [
    { termino: "Cotisation de modération salariale", definicion: "Une cotisation patronale qui s'ajoute à la cotisation de base." },
    { termino: "Réduction structurelle", definicion: "Une réduction des cotisations patronales, surtout pour les bas salaires." },
    { termino: "Double pécule de vacances", definicion: "Le pécule de vacances supplémentaire qu'un employé reçoit une fois par an, {{be.vakantiegeld[dubbel-bediende]}} du salaire mensuel." },
  ],
});
