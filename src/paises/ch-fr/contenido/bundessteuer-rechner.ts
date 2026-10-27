import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-fr.bundessteuer-rechner",
  h1: "Calcul de l'impôt fédéral direct",
  title: "Impôt fédéral direct {{anio}} : calculer l'IFD",
  description: "Impôt fédéral direct {{anio}} pour personnes seules, couples mariés et familles : barème de l'art. 36 LIFD, réduction de {{ch.dbst-kinderermaessigung}} par enfant, taux marginal.",
  intro: [
    "L'impôt fédéral direct est la part de l'impôt sur le revenu qui revient à la Confédération. Le canton et la commune perçoivent leurs propres impôts en plus, qui ne sont pas compris ici.",
    "Le barème est le même dans tout le pays. Le Département fédéral des finances adapte les tranches en raison de la progression à froid, en dernier lieu pour 2026 et 2027. Le calculateur prend le barème de l'année où vous calculez.",
  ],
  comoSeCalcula: [
    "La base est le revenu imposable après toutes les déductions. Le calcul se fait par tranches entières de 100 francs.",
    "Les personnes seules sans enfant paient selon le barème de l'art. 36, al. 1, LIFD. Les personnes mariées et toutes celles qui vivent avec des enfants dans le même ménage et assument l'essentiel de leur entretien paient selon le barème plus bas de l'al. 2.",
    "Avec des enfants, l'impôt diminue de {{ch.dbst-kinderermaessigung}} par enfant. Les montants inférieurs à {{ch.dbst-mindestbetrag}} ne sont pas perçus.",
    "À partir d'un revenu élevé, un taux fixe de 11,5 % s'applique à tout le revenu.",
  ],
  ejemplo: [
    "Une personne seule avec un revenu imposable de 80 000 francs paie environ 1378 francs d'impôt fédéral direct, soit environ 1,7 % du revenu. Chaque tranche supplémentaire de 100 francs coûte 5,94 francs de plus.",
  ],
  faq: [
    { pregunta: "Qu'est-ce que le revenu imposable ?", respuesta: "Le revenu après toutes les déductions, par exemple les frais professionnels, les versements au pilier 3a et les primes d'assurance. Il figure dans votre taxation de l'impôt fédéral direct. Il peut différer du revenu imposable cantonal." },
    { pregunta: "Pourquoi suis-je imposé selon le barème des personnes mariées avec un enfant ?", respuesta: "La loi applique ce barème aussi aux personnes célibataires, divorcées ou veuves qui vivent avec des enfants dans le même ménage et assument l'essentiel de leur entretien. En plus, l'impôt diminue de {{ch.dbst-kinderermaessigung}} par enfant." },
    { pregunta: "Qu'est-ce que le taux marginal ?", respuesta: "La part d'impôt fédéral que vous payez sur 100 francs de revenu supplémentaires. Il montre combien une déduction, par exemple un versement au pilier 3a, fait économiser sur l'impôt fédéral." },
    { pregunta: "Quel est le taux maximal de l'impôt fédéral direct ?", respuesta: "11,5 % du revenu imposable. À partir d'une limite fixée dans le barème, de 794 000 francs (personnes seules) et 941 400 francs (personnes mariées) en 2026, ce taux s'applique à tout le revenu." },
  ],
  glosario: [
    { termino: "LIFD", definicion: "Loi fédérale sur l'impôt fédéral direct." },
    { termino: "Progression à froid", definicion: "Charge supplémentaire lorsque les salaires augmentent seulement en raison du renchérissement. La Confédération la compense en adaptant les tranches du barème." },
  ],
});
