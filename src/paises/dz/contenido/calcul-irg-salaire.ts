import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dz.calcul-irg-salaire",
  h1: "Calcul de l'IRG sur salaire en Algérie",
  title: "Calcul IRG salaire Algérie {{anio}} : barème et abattements",
  description:
    "Calculez l'IRG retenu sur votre salaire ou votre pension en Algérie : barème de l'article 104, abattement de {{dz.irg-abattement-taux}}, exonération et lissage.",
  intro: [
    "L'impôt sur le revenu global (IRG) est retenu à la source par l'employeur ou la caisse de retraite, chaque mois. Il se calcule sur le salaire diminué de la cotisation de sécurité sociale.",
    "Indiquez votre salaire brut, ou directement votre revenu imposable si vous le connaissez. Le calcul applique le barème, l'abattement et, pour les revenus modestes, l'exonération ou la formule de lissage.",
  ],
  comoSeCalcula: [
    "Revenu imposable : salaire brut moins la cotisation de sécurité sociale de {{dz.cnas[salarie]}}.",
    "Le revenu mensuel est multiplié par 12 pour appliquer le barème annuel : {{dz.irg-bareme[0].tasa}} jusqu'à {{dz.irg-bareme[0].hasta}}, puis {{dz.irg-bareme[1].tasa}}, {{dz.irg-bareme[2].tasa}}, {{dz.irg-bareme[3].tasa}}, {{dz.irg-bareme[4].tasa}} et {{dz.irg-bareme[-1].tasa}} au-delà de {{dz.irg-bareme[-1].desde}}. Le résultat est ramené au mois.",
    "Abattement : {{dz.irg-abattement-taux}} de cet impôt, au moins {{dz.irg-abattement[minimum]}} et au plus {{dz.irg-abattement[maximum]}} par mois.",
    "Exonération totale si le revenu imposable ne dépasse pas {{dz.irg-exoneration}} par mois.",
    "Entre {{dz.irg-exoneration}} et {{dz.irg-lissage-plafonds[general]}}, l'impôt après abattement est multiplié par 137/51, puis diminué de 27 925/8.",
    "Pour les travailleurs handicapés et les retraités du régime général, jusqu'à {{dz.irg-lissage-plafonds[special]}}, la formule devient : impôt × 93/61 − 81 213/41. Elle ne se cumule pas avec la précédente.",
  ],
  ejemplo: [
    "Avec 60 000 DA brut, la cotisation de sécurité sociale est de 5 400 DA et le revenu imposable de 54 600 DA. Le barème donne 8 542 DA par mois. L'abattement est plafonné à 1 500 DA : l'IRG retenu est de 7 042 DA.",
  ],
  faq: [
    {
      pregunta: "Jusqu'à quel salaire ne paie-t-on pas d'IRG en Algérie ?",
      respuesta:
        "Le revenu imposable mensuel ne doit pas dépasser {{dz.irg-exoneration}}. Comme la cotisation de sécurité sociale est déduite avant, le salaire brut correspondant est un peu plus élevé.",
    },
    {
      pregunta: "Qu'est-ce que le deuxième abattement ?",
      respuesta:
        "C'est une formule de lissage prévue par l'article 104 du code des impôts directs pour les revenus compris entre {{dz.irg-exoneration}} et {{dz.irg-lissage-plafonds[general]}}. Sans elle, passer juste au-dessus du seuil d'exonération ferait payer d'un coup un impôt élevé.",
    },
    {
      pregunta: "Les retraités paient-ils l'IRG sur leur pension ?",
      respuesta:
        "Oui, la retenue se fait sur la pension avec le même barème. Les retraités du régime général ont droit à un abattement supplémentaire jusqu'à {{dz.irg-lissage-plafonds[special]}} de revenu mensuel. Cochez la case correspondante et choisissez « revenu imposable ».",
    },
    {
      pregunta: "Comment sont imposées les primes trimestrielles ?",
      respuesta:
        "Les primes, indemnités et rappels versés autrement que chaque mois sont traités comme une mensualité distincte et soumis à une retenue de {{dz.irg-primes}}. Ce calculateur ne vise que le salaire mensuel.",
    },
  ],
  glosario: [
    { termino: "IRG", definicion: "Impôt sur le revenu global, retenu à la source sur les salaires et les pensions." },
    { termino: "CIDTA", definicion: "Code des impôts directs et taxes assimilées, modifié chaque année par la loi de finances." },
    { termino: "Revenu imposable", definicion: "Salaire brut diminué de la cotisation de sécurité sociale du travailleur." },
  ],
});
