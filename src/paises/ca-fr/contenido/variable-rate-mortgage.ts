import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca-fr.variable-rate-mortgage",
  h1: "Calcul d'hypothèque à taux variable (taux préférentiel)",
  title: "Hypothèque à taux variable : versement au taux d'aujourd'hui",
  description: "Voyez votre versement mensuel sur une hypothèque à taux variable au taux préférentiel d'aujourd'hui, et ce qui change si les taux bougent d'un quart de point.",
  intro: [
    "Inscrivez le montant de votre prêt, l'amortissement et votre escompte ou votre prime par rapport au taux préférentiel pour voir le versement mensuel aux taux d'aujourd'hui.",
    "Le taux préférentiel vient de la série hebdomadaire de la Banque du Canada sur le taux préférentiel des banques à charte, à côté du taux directeur de la Banque du Canada.",
  ],
  comoSeCalcula: [
    "Votre taux est le taux préférentiel plus votre écart. Un écart de moins 0,5 signifie le taux préférentiel moins un demi-point.",
    "Le versement mensuel est un versement fixe sur toute la période d'amortissement à ce taux, avec le taux divisé par 12 chaque mois.",
    "Les lignes du quart de point montrent comment le versement changerait si votre taux montait ou baissait de 0,25 point.",
  ],
  ejemplo: [
    "Avec un taux préférentiel de 4,45 %, une hypothèque de 500 000 $ au taux préférentiel moins 0,5 (3,95 %) sur 25 ans coûte 2 625,40 $ par mois. Une hausse de 0,25 point ajoute 69,31 $.",
  ],
  faq: [
    {
      pregunta: "Qu'est-ce que le taux préférentiel?",
      respuesta: "Le taux que les banques à charte utilisent comme base pour les prêts et les marges de crédit à taux variable. Cette calculatrice utilise la série hebdomadaire du taux préférentiel de la Banque du Canada.",
    },
    {
      pregunta: "Qu'est-ce que le taux directeur de la Banque du Canada?",
      respuesta: "La cible du taux du financement à un jour fixée par la Banque du Canada. Il s'affiche à côté du taux préférentiel pour que vous puissiez les comparer.",
    },
    {
      pregunta: "Mon versement réel est-il le même?",
      respuesta: "Il peut différer. Votre prêteur fixe son propre taux préférentiel et ses règles de versement : vérifiez votre contrat hypothécaire.",
    },
  ],
  glosario: [
    { termino: "Amortissement", definicion: "Le nombre total d'années qu'il faudrait pour rembourser l'hypothèque au versement actuel." },
    { termino: "Écart par rapport au taux préférentiel", definicion: "L'escompte ou la prime que votre prêteur applique à son taux préférentiel." },
  ],
});
