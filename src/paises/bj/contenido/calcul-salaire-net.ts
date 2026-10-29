import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bj.calcul-salaire-net",
  h1: "Calcul du salaire net au Bénin",
  title: "Calcul salaire net Bénin : du brut au net",
  description:
    "Passez du brut au net au Bénin : ITS selon le barème mensuel, redevance ORTB et cotisation pension CNSS de {{bj.cnss-taux[pension-salarie]}}.",
  intro: [
    "Le salaire net est ce qui reste du brut après l'impôt sur les traitements et salaires (ITS) et la cotisation pension à la CNSS.",
    "Indiquez votre brut du mois et le mois de paie. Vous obtenez le net à payer et le détail des retenues.",
  ],
  comoSeCalcula: [
    "L'ITS s'applique au salaire brut imposable du mois avec un barème progressif. Jusqu'à {{bj.its-bareme[0].hasta}}, le taux est de {{bj.its-bareme[0].tasa}}.",
    "En mars, une redevance ORTB de {{bj.its-redevance-ortb[mars]}} s'ajoute à l'impôt. En juin, elle est de {{bj.its-redevance-ortb[juin]}} si le salaire dépasse la première tranche.",
    "La CNSS retient {{bj.cnss-taux[pension-salarie]}} du brut pour la pension, sans plafond. On retire enfin les autres retenues que vous indiquez.",
  ],
  ejemplo: [
    "Avec 300 000 F bruts un mois ordinaire : 33 500 F d'ITS et 10 800 F de CNSS. Le net à payer est de 255 700 F.",
  ],
  faq: [
    {
      pregunta: "La cotisation CNSS diminue-t-elle la base de l'ITS ?",
      respuesta:
        "Non. Le Code général des impôts calcule l'ITS sur le montant brut des salaires, primes, indemnités et avantages. La cotisation pension se retire à côté.",
    },
    {
      pregunta: "L'indemnité de transport est-elle imposable ?",
      respuesta: "Oui. Le salaire mensuel imposable comprend les indemnités de toute sorte, y compris les indemnités de transport.",
    },
    {
      pregunta: "Pourquoi mon net baisse-t-il en mars et en juin ?",
      respuesta:
        "La redevance au profit de l'ORTB s'ajoute à l'ITS sur ces deux salaires : {{bj.its-redevance-ortb[mars]}} en mars et {{bj.its-redevance-ortb[juin]}} en juin.",
    },
    {
      pregunta: "Le nombre d'enfants change-t-il l'ITS ?",
      respuesta: "Le barème du Code général des impôts 2026 ne prévoit pas de réduction pour charges de famille : l'impôt dépend du seul salaire imposable.",
    },
  ],
  glosario: [
    { termino: "ITS", definicion: "Impôt sur les traitements et salaires, retenu chaque mois par l'employeur." },
    { termino: "ORTB", definicion: "Office de radiodiffusion et télévision du Bénin, qui reçoit la redevance de mars et de juin." },
    { termino: "Net à payer", definicion: "La somme versée au salarié une fois toutes les retenues faites." },
  ],
});
