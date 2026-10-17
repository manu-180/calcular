import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "be-fr.inflatie-berekenen",
  h1: "Calcul de l'inflation avec l'indice des prix à la consommation",
  title: "Calcul de l'inflation en Belgique avec l'indice Statbel",
  description:
    "Convertissez un montant avec l'indice belge des prix à la consommation de Statbel. Vous voyez la hausse des prix et ce que vaut le montant aujourd'hui.",
  intro: [
    "Statbel mesure chaque mois l'évolution des prix en Belgique avec l'indice des prix à la consommation. Le dernier indice de notre série est de {{be.cpi}} (base 2013 = 100).",
    "Choisissez un montant, un mois de départ et un mois final. Vous voyez ce que vaut ce montant au mois final et de combien les prix ont augmenté sur la période.",
  ],
  comoSeCalcula: [
    "Nouveau montant = montant × indice du mois final ÷ indice du mois de départ.",
    "Nous utilisons l'indice des prix à la consommation en base 2013 = 100. Le rapport entre deux mois est pratiquement le même quelle que soit l'année de base.",
    "Si le mois final n'est pas encore publié, le calcul s'arrête au dernier mois publié par Statbel.",
  ],
  ejemplo: [
    "1.000 € en janvier 2025 correspondent en septembre 2026 à environ 1.043,50 €, soit une hausse d'environ 4,4 %.",
  ],
  faq: [
    {
      pregunta: "Quel indice utilisez-vous ?",
      respuesta:
        "L'indice des prix à la consommation de Statbel, l'office belge de statistique, en base 2013 = 100. Depuis 2026, Statbel publie aussi une série en base 2025 = 100, mais le rapport entre deux mois reste pratiquement le même.",
    },
    {
      pregunta: "Pourquoi la série ne remonte-t-elle qu'à décembre 2024 ?",
      respuesta: "Nous chargeons les chiffres officiels directement chez Statbel. La série s'allonge chaque mois avec le dernier chiffre.",
    },
    {
      pregunta: "À quelle fréquence Statbel publie-t-il l'indice ?",
      respuesta: "Chaque mois. Dès qu'un nouveau chiffre paraît, il est repris automatiquement dans ce calcul.",
    },
  ],
  glosario: [
    { termino: "Indice des prix à la consommation", definicion: "Une mesure mensuelle de Statbel de l'évolution des prix des biens et services achetés par les ménages." },
    { termino: "Année de base", definicion: "L'année où l'indice vaut 100. Ici, 2013." },
  ],
});
