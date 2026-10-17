import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-fr.kapitalbezug-steuer-rechner",
  h1: "Retrait en capital : impôt fédéral sur la caisse de pension et le pilier 3a",
  title: "Impôt sur le retrait en capital : LPP et pilier 3a",
  description: "Impôt fédéral direct sur le retrait du capital de la caisse de pension ou du pilier 3a : un cinquième du barème selon l'art. 38 LIFD.",
  intro: [
    "Les personnes qui retirent leur capital de la caisse de pension ou du pilier 3a paient un impôt séparé. Il est perçu séparément des autres revenus, pour l'année du versement.",
    "Le calculateur montre la part de la Confédération. Le canton et la commune imposent aussi le retrait.",
  ],
  comoSeCalcula: [
    "L'impôt fédéral sur les prestations en capital provenant de la prévoyance correspond à un cinquième de l'impôt ordinaire selon le barème du revenu (art. 38 LIFD).",
    "Le barème pour personnes seules ou pour personnes mariées s'applique. Les personnes vivant avec des enfants dans le même ménage utilisent le barème des personnes mariées, mais sans la réduction par enfant.",
    "Aucune déduction sociale n'est accordée. Le calcul se fait par tranches entières de 100 francs.",
  ],
  ejemplo: [
    "Pour un capital de 200 000 francs, une personne seule paie environ 2581 francs d'impôt fédéral direct, soit environ 1,3 % du montant.",
  ],
  faq: [
    { pregunta: "Le retrait en capital s'additionne-t-il au salaire ?", respuesta: "Non. Les prestations en capital provenant de la prévoyance sont imposées séparément. Elles ne s'ajoutent pas aux autres revenus de l'année." },
    { pregunta: "Cela vaut-il aussi pour le pilier 3a ?", respuesta: "Oui. Le capital de la prévoyance individuelle liée est imposé comme celui de la caisse de pension." },
    { pregunta: "Pourquoi le canton n'est-il pas compris ?", respuesta: "Chaque canton a ses propres barèmes et règles pour les prestations en capital. Pour l'impôt cantonal, utilisez le calculateur d'impôt de votre canton." },
  ],
  glosario: [
    { termino: "Prestation en capital provenant de la prévoyance", definicion: "Versement de l'avoir de la caisse de pension ou du pilier 3a en une seule fois au lieu d'une rente." },
  ],
});
