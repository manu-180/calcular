import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca-fr.take-home-pay",
  h1: "Calcul du salaire net {{anio}} au Québec",
  title: "Calcul du salaire net {{anio}} : salaire après impôt",
  description: "Passez du salaire brut au salaire net {{anio}} au Québec : impôt fédéral et du Québec, RRQ, assurance-emploi et RQAP. Par semaine, aux deux semaines ou par mois.",
  intro: [
    "Inscrivez votre salaire brut et votre province ou votre territoire pour voir ce qui vous reste chaque année, chaque mois et à chaque paie.",
    "Au Québec, le calcul retire l'impôt fédéral, l'impôt du Québec, les cotisations au RRQ, à l'assurance-emploi et au RQAP avec les chiffres de 2026.",
  ],
  comoSeCalcula: [
    "Le RRQ est de {{ca.qpp[base]}} plus {{ca.qpp[first]}} sur les gains entre {{ca.cpp[exemption]}} et {{ca.cpp[ympe]}}, et de {{ca.qpp[second]}} entre {{ca.cpp[ympe]}} et {{ca.cpp[yampe]}}.",
    "L'assurance-emploi est de {{ca.ei-rates[employee-qc]}} de la rémunération jusqu'à {{ca.ei-maximum}}, et le RQAP de {{ca.qpip-rates[employee]}} jusqu'à {{ca.qpip-maximum}}.",
    "L'impôt du Québec se calcule sur le revenu moins la déduction pour travailleurs ({{ca.qc-workers-deduction[rate]}} du revenu d'emploi, jusqu'à {{ca.qc-workers-deduction[max]}}), avec le montant personnel de base de {{ca.qc-bpa}}.",
    "L'impôt fédéral est réduit de l'abattement du Québec de {{ca.qc-abatement}}.",
  ],
  ejemplo: [
    "Avec 70 000 $ au Québec, vous payez 4 189,50 $ au RRQ, 895,70 $ d'assurance-emploi, 301 $ au RQAP, 6 041,47 $ d'impôt fédéral et 7 527,62 $ d'impôt du Québec. Il vous reste 51 044,71 $ par année, soit 1 963,26 $ aux deux semaines.",
  ],
  faq: [
    {
      pregunta: "Pourquoi ma première paie de l'année est-elle plus petite que les dernières?",
      respuesta: "Les cotisations au RRQ et à l'assurance-emploi sont retenues à chaque paie jusqu'au maximum annuel. Une fois le maximum atteint, les retenues s'arrêtent jusqu'en janvier.",
    },
    {
      pregunta: "Qu'est-ce que l'abattement du Québec?",
      respuesta: "Une réduction de {{ca.qc-abatement}} de l'impôt fédéral de base accordée aux résidents du Québec.",
    },
    {
      pregunta: "Les cotisations REER réduisent-elles l'impôt?",
      respuesta: "Oui. Les cotisations retenues sur la paie réduisent le revenu sur lequel l'impôt est calculé. Le RRQ et l'assurance-emploi restent calculés sur tout le salaire.",
    },
  ],
  glosario: [
    { termino: "RRQ", definicion: "Régime de rentes du Québec. Les cotisations sont retenues sur la paie et financent votre rente de retraite." },
    { termino: "RQAP", definicion: "Régime québécois d'assurance parentale, qui verse les prestations parentales au Québec." },
    { termino: "Déduction pour travailleurs", definicion: "Une déduction de {{ca.qc-workers-deduction[rate]}} du revenu de travail, jusqu'à {{ca.qc-workers-deduction[max]}}, dans le calcul de l'impôt du Québec." },
  ],
});
