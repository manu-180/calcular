import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ml.calcul-its",
  h1: "Calcul de l'ITS au Mali",
  title: "Calcul ITS Mali : impôt sur les traitements et salaires",
  description:
    "Calculez l'ITS retenu sur votre salaire au Mali avec le barème de l'article 10 du CGI, la réduction pour charges de famille et les deux points de réduction.",
  intro: [
    "Au Mali, l'employeur retient chaque mois l'impôt sur les traitements et salaires (ITS) et le reverse aux Impôts. Le barème est progressif et tient compte de la situation de famille.",
    "Indiquez votre salaire brut imposable, la retenue pour la retraite qui figure sur votre bulletin et votre situation de famille. Vous obtenez l'impôt du mois et le détail du calcul.",
  ],
  comoSeCalcula: [
    "On retire du salaire brut la retenue pour la retraite, dans la limite de {{ml.its-deduction-retraite}} du brut. La cotisation AMO ne se déduit pas. Le résultat multiplié par 12 donne le revenu imposable annuel.",
    "Le barème s'applique par tranches : rien jusqu'à {{ml.its-bareme[0].hasta}}, {{ml.its-bareme[1].tasa}} jusqu'à {{ml.its-bareme[1].hasta}}, {{ml.its-bareme[2].tasa}} jusqu'à {{ml.its-bareme[2].hasta}}, {{ml.its-bareme[3].tasa}} jusqu'à {{ml.its-bareme[3].hasta}}, {{ml.its-bareme[4].tasa}} jusqu'à {{ml.its-bareme[4].hasta}}, {{ml.its-bareme[5].tasa}} jusqu'à {{ml.its-bareme[5].hasta}}, puis {{ml.its-bareme[-1].tasa}} au-delà.",
    "L'impôt obtenu baisse de {{ml.its-reduction-famille[marie]}} si vous êtes marié(e) et de {{ml.its-reduction-famille[enfant]}} par enfant à charge ({{ml.its-reduction-famille[enfant-infirme]}} pour un enfant majeur infirme), dans la limite de {{ml.its-enfants-max}} enfants.",
    "Enfin, le taux réel de l'impôt est réduit de {{ml.its-reduction-points}} points : cela revient à retirer {{ml.its-reduction-points}} du revenu imposable, sans descendre sous zéro. L'impôt annuel divisé par 12 donne la retenue du mois.",
  ],
  ejemplo: [
    "Avec 250 000 F bruts par mois sans retenue retraite, le revenu imposable annuel est de 3 000 000 F. Le barème donne 540 040 F. Les deux points retirent 60 000 F : l'ITS est de 480 040 F par an, soit 40 003 F par mois pour une personne seule sans enfant.",
  ],
  faq: [
    {
      pregunta: "Un salarié payé au SMIG paie-t-il l'ITS ?",
      respuesta:
        "Non. Le décret qui fixe le SMIG précise que ce salaire n'est pas soumis à l'ITS. Le calcul le confirme : pour un SMIG à temps plein, la réduction de deux points absorbe tout l'impôt du barème.",
    },
    {
      pregunta: "Quels enfants comptent pour la réduction ?",
      respuesta:
        "Les enfants mineurs, les enfants de moins de 25 ans qui poursuivent leurs études, les enfants infirmes et, sous conditions, les enfants recueillis, s'ils n'ont pas de revenus propres. La situation retenue est celle du 1er janvier de l'année d'imposition.",
    },
    {
      pregunta: "Les indemnités de transport sont-elles imposables ?",
      respuesta:
        "L'indemnité de transport n'est pas imposée si le salarié n'est pas transporté par l'entreprise et si elle ne dépasse pas 10 % du traitement de base. Les remboursements de frais ne sont pas imposés non plus. Les avantages en nature comptent pour moitié de leur valeur.",
    },
    {
      pregunta: "La cotisation AMO réduit-elle l'impôt ?",
      respuesta:
        "Non. La DGI a précisé que les cotisations à l'Assurance maladie obligatoire ne sont pas déductibles de la base de l'ITS. Seule la retenue pour la retraite se déduit, dans la limite de {{ml.its-deduction-retraite}} du salaire brut.",
    },
  ],
  glosario: [
    { termino: "ITS", definicion: "Impôt sur les traitements et salaires, retenu à la source par l'employeur." },
    { termino: "Taux réel", definicion: "L'impôt calculé divisé par le revenu imposable de l'année." },
    { termino: "Revenu imposable", definicion: "Le salaire brut et les avantages imposables, moins la retenue déductible pour la retraite." },
  ],
});
