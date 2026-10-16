import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca-fr.usd-to-cad",
  h1: "Convertisseur dollar américain et dollar canadien (taux de la Banque du Canada)",
  title: "Convertisseur USD CAD au taux de la Banque du Canada",
  description: "Convertissez des dollars américains en dollars canadiens, ou l'inverse, au dernier taux de change moyen quotidien publié par la Banque du Canada.",
  intro: [
    "Inscrivez un montant pour le convertir entre dollars américains et canadiens au taux moyen quotidien de la Banque du Canada.",
    "Le taux est mis à jour chaque jour ouvrable : la date du taux utilisé s'affiche à côté du résultat.",
  ],
  comoSeCalcula: [
    "La Banque du Canada publie un taux indicatif par jour ouvrable : la valeur d'un dollar américain en dollars canadiens.",
    "Les dollars américains sont multipliés par ce taux pour obtenir des dollars canadiens. Les dollars canadiens sont divisés par ce taux pour obtenir des dollars américains.",
  ],
  ejemplo: ["À un taux de 1,4222, 100 $ US valent 142,22 $ CA, et 100 $ CA valent environ 70,31 $ US."],
  faq: [
    {
      pregunta: "Est-ce le taux que ma banque me donnera?",
      respuesta: "Non. Le taux de la Banque du Canada est une moyenne de référence. Les banques, les bureaux de change et les émetteurs de cartes ajoutent leur propre marge.",
    },
    {
      pregunta: "D'où vient le taux?",
      respuesta: "De la série FXUSDCAD de la Banque du Canada : le taux de change moyen quotidien du dollar américain en dollars canadiens.",
    },
    {
      pregunta: "Pourquoi n'y a-t-il pas de taux la fin de semaine?",
      respuesta: "La Banque du Canada publie des taux seulement les jours ouvrables. La fin de semaine et les jours fériés, le taux du dernier jour ouvrable est utilisé.",
    },
  ],
  glosario: [
    { termino: "Taux moyen quotidien", definicion: "Le taux de change indicatif de la Banque du Canada pour un jour ouvrable." },
    { termino: "USD/CAD", definicion: "Le nombre de dollars canadiens nécessaires pour acheter un dollar américain." },
  ],
});
