import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ml.cout-employeur",
  h1: "Calcul du coût employeur d'un salarié au Mali",
  title: "Coût employeur au Mali : salaire, cotisations et taxes",
  description: "Estimez le coût total d'un salarié pour l'employeur au Mali : salaire brut, cotisations INPS et AMO, et taxes sur les salaires.",
  intro: [
    "Le coût d'un salarié pour l'entreprise dépasse son salaire brut. S'y ajoutent les cotisations patronales à l'INPS et à l'AMO, et les taxes sur les salaires.",
    "Indiquez le salaire brut mensuel. Vous obtenez le coût mensuel et annuel.",
  ],
  comoSeCalcula: [
    "Cotisations patronales INPS : retraite {{ml.inps-employeur[retraite]}}, prestations familiales {{ml.inps-employeur[prestations-familiales]}} et accidents du travail {{ml.inps-employeur[accidents-travail]}}. AMO : {{ml.amo-taux[employeur-prive]}}.",
    "Taxes sur les salaires : CFE {{ml.taxes-salaires[cfe]}}, TFP {{ml.taxes-salaires[tfp]}}, TEJ {{ml.taxes-salaires[tej]}} et taxe logement {{ml.taxes-salaires[logement]}}.",
  ],
  faq: [],
  glosario: [{ termino: "Coût employeur", definicion: "Le salaire brut plus toutes les charges payées par l'employeur." }],
});
