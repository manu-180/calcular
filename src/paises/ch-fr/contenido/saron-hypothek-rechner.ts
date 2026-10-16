import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-fr.saron-hypothek-rechner",
  h1: "Calcul d'une hypothèque SARON avec le SARON actuel",
  title: "Hypothèque SARON : coût des intérêts avec le SARON actuel",
  description: "Coût d'une hypothèque SARON : SARON actuel publié par la BNS plus votre marge, par mois, trimestre et année. Avec le taux directeur de la BNS.",
  intro: [
    "Pour une hypothèque SARON, le taux se compose du SARON et d'une marge fixe de la banque. Le SARON est un taux au jour le jour garanti en francs.",
    "Le calculateur prend le dernier SARON publié sur le portail de données de la BNS et indique ce que votre hypothèque coûte avec ce taux.",
  ],
  comoSeCalcula: [
    "Taux = SARON + marge. Si le SARON est négatif, vous calculez selon votre contrat avec 0 % ou avec la valeur publiée.",
    "Intérêt par an = montant de l'hypothèque × taux. Par mois un douzième, par trimestre un quart.",
  ],
  ejemplo: [
    "Une hypothèque de 600 000 francs avec une marge de 0,8 % coûte environ 400 francs par mois avec un SARON proche de zéro.",
  ],
  faq: [
    { pregunta: "Qu'est-ce que le SARON ?", respuesta: "Le Swiss Average Rate Overnight, un taux de référence pour l'argent au jour le jour en francs. Il est fixé chaque jour." },
    { pregunta: "Quel est le lien entre le SARON et le taux directeur ?", respuesta: "La Banque nationale vise à maintenir les taux à court terme garantis du marché monétaire en francs proches du taux directeur de la BNS. Le calculateur affiche les deux valeurs côte à côte pour que vous voyiez l'écart." },
    { pregunta: "Mon taux vaut-il pour toute la durée ?", respuesta: "Non. Seule la marge est fixe. La part SARON change à chaque nouvelle valeur." },
  ],
  glosario: [
    { termino: "Marge", definicion: "Supplément fixe de la banque sur le SARON, convenu dans le contrat hypothécaire." },
    { termino: "Taux directeur", definicion: "Taux avec lequel la Banque nationale suisse met en œuvre sa politique monétaire." },
  ],
});
