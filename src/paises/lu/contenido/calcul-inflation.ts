import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lu.calcul-inflation",
  h1: "Calcul de l'inflation au Luxembourg avec l'IPCN",
  title: "Calcul inflation Luxembourg : convertir avec l'IPCN",
  description: "Que vaut aujourd'hui un montant d'autrefois ? Calculez l'inflation depuis 2000 avec l'indice des prix à la consommation national (IPCN) de STATEC.",
  intro: [
    "L'indice des prix à la consommation national (IPCN) mesure l'évolution des prix au Luxembourg. STATEC le publie chaque mois.",
    "Avec le calculateur, vous convertissez un montant vers un autre mois, par exemple pour comparer un loyer ou un prix dans le temps.",
  ],
  comoSeCalcula: [
    "Montant ajusté = montant x IPCN du mois de fin / IPCN du mois de départ.",
    "Le calcul utilise l'IPCN en base 100 au 1er janvier 1948, tel que STATEC le publie.",
    "Si le mois de fin n'est pas encore publié, le calculateur prend le dernier mois disponible.",
  ],
  ejemplo: [
    "1.000 euros de janvier 2020 correspondent en septembre 2026 à environ 1.227,50 euros.",
  ],
  faq: [
    { pregunta: "Quelle est la différence entre IPCN et IPCH ?", respuesta: "L'IPCN est l'indice national qui sert à l'échelle mobile des salaires. L'IPCH est l'indice harmonisé européen." },
    { pregunta: "D'où viennent les chiffres ?", respuesta: "De la base de données LUSTAT de STATEC, mise à jour après chaque publication." },
    { pregunta: "L'IPCN sert-il à indexer les salaires ?", respuesta: "Oui, à travers sa moyenne semestrielle. Le calculateur d'indexation des salaires montre où en est la prochaine tranche." },
  ],
  glosario: [
    { termino: "IPCN", definicion: "Indice des prix à la consommation national de STATEC." },
  ],
});
