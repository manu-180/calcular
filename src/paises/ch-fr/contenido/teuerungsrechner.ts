import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-fr.teuerungsrechner",
  h1: "Calcul du renchérissement avec l'indice des prix à la consommation",
  title: "Calcul du renchérissement Suisse : convertir avec l'IPC",
  description: "Que vaut aujourd'hui un montant d'autrefois ? Calculer le renchérissement depuis 2000 avec l'indice suisse des prix à la consommation de l'OFS, mois par mois.",
  intro: [
    "L'indice suisse des prix à la consommation (IPC) mesure l'évolution des prix des biens et services achetés par les ménages en Suisse. L'Office fédéral de la statistique le publie chaque mois.",
    "Avec le calculateur, vous convertissez un montant vers un autre mois, par exemple pour adapter un salaire, un loyer ou une contribution d'entretien au renchérissement.",
  ],
  comoSeCalcula: [
    "Montant adapté = montant × IPC du mois de fin / IPC du mois de départ.",
    "Le calcul utilise l'IPC base décembre 2025 = 100, arrondi à une décimale. Les mois plus anciens sont convertis dans cette base.",
    "Si le mois de fin n'est pas encore publié, le calculateur prend le dernier mois disponible.",
  ],
  ejemplo: [
    "1000 francs de janvier 2020 correspondent en septembre 2026 à environ 1079 francs. Le renchérissement sur cette période s'élève à environ 7,9 %.",
  ],
  faq: [
    { pregunta: "Quel est le renchérissement en Suisse ?", respuesta: "C'est ce que montre le renchérissement annuel : la variation de l'IPC par rapport au même mois de l'année précédente. Le calculateur l'indique pour le mois de fin que vous choisissez." },
    { pregunta: "D'où viennent les chiffres ?", respuesta: "De l'Office fédéral de la statistique. La série provient du portail de données de la Banque nationale suisse, qui reprend l'IPC de l'OFS, et est mise à jour après chaque publication." },
    { pregunta: "Pourquoi le résultat diffère-t-il légèrement d'autres calculateurs ?", respuesta: "D'autres calculateurs peuvent utiliser une autre base d'indice ou plus de décimales. Il en résulte de petites différences d'arrondi." },
  ],
  glosario: [
    { termino: "IPC", definicion: "Indice suisse des prix à la consommation de l'Office fédéral de la statistique." },
    { termino: "Renchérissement", definicion: "Hausse des prix à la consommation sur une période." },
  ],
});
