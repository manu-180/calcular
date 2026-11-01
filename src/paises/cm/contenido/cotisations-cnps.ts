import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cm.cotisations-cnps",
  h1: "Calcul des cotisations CNPS",
  title: "Cotisations CNPS Cameroun : part salariale et patronale",
  description:
    "Calculez les cotisations CNPS d'un salaire : pension de {{cm.cnps-pension[salarie]}} pour le salarié, prestations familiales et accidents du travail pour l'employeur.",
  intro: [
    "La Caisse nationale de prévoyance sociale (CNPS) gère trois branches : la pension vieillesse, les prestations familiales et les accidents du travail.",
    "Le salarié ne paie que la pension. L'employeur paie sa part de pension et les deux autres branches.",
  ],
  comoSeCalcula: [
    "La pension coûte {{cm.cnps-pension[salarie]}} au salarié et {{cm.cnps-pension[employeur]}} à l'employeur, sur un salaire limité à {{cm.cnps-plafond}} par mois.",
    "Les prestations familiales sont payées par l'employeur sur le même salaire plafonné : {{cm.cnps-prestations-familiales[general]}} au régime général, {{cm.cnps-prestations-familiales[agricole]}} au régime agricole et {{cm.cnps-prestations-familiales[enseignement-prive]}} dans l'enseignement privé.",
    "Les accidents du travail sont à la charge de l'employeur, sur tout le salaire, selon le risque : {{cm.cnps-accidents-travail[a]}}, {{cm.cnps-accidents-travail[b]}} ou {{cm.cnps-accidents-travail[c]}}.",
  ],
  ejemplo: [
    "Pour 300 000 F au régime général en groupe A : le salarié paie 12 600 F. L'employeur paie 12 600 F de pension, 21 000 F de prestations familiales et 5 250 F d'accidents du travail.",
  ],
  faq: [
    {
      pregunta: "Le plafond s'applique-t-il aux accidents du travail ?",
      respuesta: "Non. Le plafond de {{cm.cnps-plafond}} vaut pour la pension et les prestations familiales. Les accidents du travail portent sur toute la rémunération.",
    },
    {
      pregunta: "Comment connaître le groupe de risque de mon entreprise ?",
      respuesta:
        "Le décret classe les activités en trois groupes, du risque faible (A) au risque élevé (C). La CNPS peut modifier le classement après un contrôle si l'activité réelle est différente.",
    },
    {
      pregunta: "La part du salarié réduit-elle l'IRPP ?",
      respuesta: "Oui. La pension versée à la CNPS par le salarié est déduite du revenu avant le calcul de l'IRPP.",
    },
  ],
  glosario: [
    { termino: "Salaire cotisable", definicion: "Rémunération sur laquelle se calculent les cotisations, dans la limite du plafond." },
    { termino: "Prestations familiales", definicion: "Branche de la CNPS qui verse notamment les allocations familiales." },
  ],
});
