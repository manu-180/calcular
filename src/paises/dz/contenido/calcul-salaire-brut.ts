import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dz.calcul-salaire-brut",
  h1: "Calcul du salaire brut à partir du net en Algérie",
  title: "Salaire net en brut Algérie 2026 : calcul inverse",
  description:
    "Retrouvez le salaire brut qui donne le net voulu en Algérie, avec la cotisation de sécurité sociale de {{dz.cnas[salarie]}} et l'IRG retenu à la source.",
  intro: [
    "Lors d'une embauche, on discute souvent d'un salaire net. Le contrat et le bulletin de paie, eux, partent du brut.",
    "Indiquez le salaire net mensuel visé. Le calcul retrouve le brut correspondant, avec le détail de la cotisation et de l'IRG.",
  ],
  comoSeCalcula: [
    "Le calcul essaie des salaires bruts jusqu'à trouver celui dont le net, après cotisation de {{dz.cnas[salarie]}} et IRG, égale le montant demandé.",
    "Sous le seuil d'exonération de {{dz.irg-exoneration}} de salaire imposable, il n'y a que la cotisation : le brut vaut le net divisé par (1 − {{dz.cnas[salarie]}}).",
    "Au-dessus, l'IRG suit le barème, l'abattement de {{dz.irg-abattement-taux}} et la formule de lissage, comme dans le calcul du salaire net.",
  ],
  faq: [
    {
      pregunta: "Pourquoi le brut n'augmente-t-il pas au même rythme que le net ?",
      respuesta:
        "Parce que l'IRG est progressif. Au-delà de {{dz.irg-bareme[2].desde}} de revenu imposable annuel, chaque dinar supplémentaire est imposé à {{dz.irg-bareme[2].tasa}} ou plus, en plus de la cotisation.",
    },
    {
      pregunta: "Ce calcul tient-il compte de la part patronale ?",
      respuesta: "Non. Il donne le brut inscrit au bulletin. Pour le coût total pour l'entreprise, utilisez le calcul du coût employeur.",
    },
    {
      pregunta: "Le brut trouvé est-il exact au dinar près ?",
      respuesta: "Il est arrondi au centime. Selon les arrondis appliqués par votre employeur, le net réel peut varier de quelques dinars.",
    },
  ],
  glosario: [
    { termino: "Salaire brut", definicion: "Rémunération avant la cotisation de sécurité sociale et l'IRG." },
    { termino: "Salaire net", definicion: "Montant effectivement versé au travailleur." },
  ],
});
