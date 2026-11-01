import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tn.calcul-salaire-net",
  h1: "Calcul du salaire net en Tunisie",
  title: "Salaire net Tunisie {{anio}} : du brut au net avec CNSS et IRPP",
  description:
    "Passez du salaire brut au salaire net en Tunisie : cotisation CNSS de {{tn.cnss-salarie}}, impôt sur le revenu selon le barème et contribution sociale de solidarité.",
  intro: [
    "Entre le salaire brut inscrit sur le contrat et le montant versé sur votre compte, trois retenues s'appliquent : la cotisation de sécurité sociale à la CNSS, l'impôt sur le revenu des personnes physiques et la contribution sociale de solidarité.",
    "Indiquez votre salaire brut mensuel et votre situation de famille. Vous voyez chaque retenue et votre salaire net, par mois et par an.",
  ],
  comoSeCalcula: [
    "Cotisation CNSS : {{tn.cnss-salarie}} du salaire brut dans le secteur non agricole.",
    "Impôt : sur le salaire annuel diminué de la CNSS, on retire {{tn.frais-professionnels-taux}} de frais professionnels, dans la limite de {{tn.frais-professionnels-plafond}} par an, puis les déductions pour charges de famille. Le barème progressif s'applique au reste.",
    "Contribution sociale de solidarité : {{tn.css-majoration}} du revenu imposable, sauf si celui ci ne dépasse pas {{tn.css-seuil-exoneration}} par an.",
    "Net = brut − CNSS − impôt − contribution, sur une base annuelle divisée par 12.",
  ],
  faq: [
    {
      pregunta: "Comment calculer son salaire net à partir du brut en Tunisie ?",
      respuesta:
        "Retirez d'abord la cotisation CNSS de {{tn.cnss-salarie}}. Calculez ensuite l'impôt sur le revenu avec le barème annuel, après les frais professionnels et les déductions familiales, puis la contribution sociale de solidarité. Le reste est votre salaire net.",
    },
    {
      pregunta: "Le chef de famille paie-t-il moins d'impôt ?",
      respuesta:
        "Oui. Il déduit {{tn.deductions-famille[chef-de-famille]}} par an de son revenu imposable, plus {{tn.deductions-famille[par-enfant]}} pour chacun des {{tn.enfants-deduction-max}} premiers enfants à charge. La déduction monte à {{tn.deductions-famille[enfant-etudiant]}} pour un étudiant sans bourse et à {{tn.deductions-famille[enfant-infirme]}} pour un enfant infirme.",
    },
    {
      pregunta: "Jusqu'à quel salaire ne paie-t-on pas d'impôt ?",
      respuesta:
        "La première tranche du barème, jusqu'à {{tn.irpp-bareme[0].hasta}} de revenu net imposable par an, est taxée à {{tn.irpp-bareme[0].tasa}}. Comme les cotisations et les frais professionnels sont déduits avant, le salaire brut correspondant est plus élevé.",
    },
  ],
  glosario: [
    { termino: "CNSS", definicion: "Caisse nationale de sécurité sociale, qui gère la sécurité sociale des salariés du secteur privé." },
    { termino: "IRPP", definicion: "Impôt sur le revenu des personnes physiques, retenu à la source sur les salaires." },
    { termino: "CSS", definicion: "Contribution sociale de solidarité, versée au profit des caisses sociales." },
  ],
});
