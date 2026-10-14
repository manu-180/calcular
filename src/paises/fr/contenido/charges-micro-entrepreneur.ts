import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fr.charges-micro-entrepreneur",
  h1: "Charges d'un micro-entrepreneur : cotisations et impôt",
  title: "Charges micro-entrepreneur 2026 : cotisations Urssaf",
  description:
    "Calculez les cotisations sociales de votre micro-entreprise ({{fr.micro-cotisations[services]}} pour les services) et le versement libératoire de l'impôt, selon votre activité.",
  intro: [
    "Le micro-entrepreneur (ou auto-entrepreneur) paie ses cotisations sociales en pourcentage du chiffre d'affaires encaissé. Pas de chiffre d'affaires, pas de cotisations.",
    "Le taux dépend de l'activité. Avec l'option pour le versement libératoire, l'impôt sur le revenu est aussi payé en pourcentage du chiffre d'affaires, en même temps que les cotisations.",
  ],
  comoSeCalcula: [
    "Vente de marchandises : {{fr.micro-cotisations[vente]}} de cotisations, plus {{fr.micro-versement-liberatoire[vente]}} avec le versement libératoire.",
    "Prestations de services commerciales ou artisanales (BIC) : {{fr.micro-cotisations[services]}}, plus {{fr.micro-versement-liberatoire[services]}} avec l'option.",
    "Activité libérale non réglementée : {{fr.micro-cotisations[liberal]}}, plus {{fr.micro-versement-liberatoire[liberal]}} avec l'option.",
    "Activité libérale relevant de la Cipav : {{fr.micro-cotisations[cipav]}}, plus {{fr.micro-versement-liberatoire[cipav]}} avec l'option.",
  ],
  ejemplo: [
    "Un graphiste déclaré en prestations de services encaisse 3 000 € sur le mois. Il paie 636 € de cotisations et garde 2 364 € avant ses frais.",
  ],
  faq: [
    {
      pregunta: "Faut-il déclarer chaque mois ou chaque trimestre ?",
      respuesta: "Les deux sont possibles. Vous choisissez la périodicité, et la déclaration doit être faite même quand le chiffre d'affaires est nul.",
    },
    {
      pregunta: "Le versement libératoire est-il intéressant ?",
      respuesta:
        "Il est réservé aux foyers dont le revenu fiscal de référence ne dépasse pas un plafond. Il est souvent avantageux si votre taux d'imposition au barème serait plus élevé que le taux du versement libératoire.",
    },
    {
      pregunta: "Les frais sont-ils déductibles ?",
      respuesta:
        "Non. Les cotisations se calculent sur le chiffre d'affaires, pas sur le bénéfice. Pour l'impôt sans versement libératoire, un abattement forfaitaire tient compte des frais.",
    },
  ],
  glosario: [
    { termino: "Micro-entrepreneur", definicion: "Entrepreneur individuel au régime simplifié de la micro-entreprise, aussi appelé auto-entrepreneur." },
    { termino: "Versement libératoire", definicion: "Option qui permet de payer l'impôt sur le revenu en pourcentage du chiffre d'affaires." },
    { termino: "Cipav", definicion: "Caisse de retraite de certaines professions libérales réglementées." },
  ],
});
