import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tn.periode-d-essai",
  h1: "Période d'essai en Tunisie",
  title: "Période d'essai Tunisie 2026 : durée et date de fin",
  description:
    "Calculez la fin de votre période d'essai en Tunisie selon la loi n° 2025-9 : {{tn.periode-essai[mois-max]}} mois au plus, un seul renouvellement et un délai de prévenance de 15 jours.",
  intro: [
    "Depuis la loi n° 2025-9 du 21 mai 2025, le contrat de travail est conclu en principe pour une durée indéterminée et la période d'essai est encadrée par l'article 6-3 du code du travail.",
    "Indiquez votre date d'entrée, la durée prévue au contrat et si l'essai est renouvelé. Vous obtenez la date de fin et la date limite pour prévenir l'autre partie.",
  ],
  comoSeCalcula: [
    "La période d'essai ne peut pas dépasser {{tn.periode-essai[mois-max]}} mois. Elle peut être renouvelée une fois, pour la même durée.",
    "Pour mettre fin au contrat pendant l'essai, chaque partie prévient l'autre par un moyen qui laisse une trace écrite, {{tn.periode-essai[preavis-jours]}} jours avant la fin de l'essai.",
    "Le calcul ajoute la durée en mois à la date d'entrée, puis retire {{tn.periode-essai[preavis-jours]}} jours pour la date limite de prévenance.",
  ],
  faq: [
    {
      pregunta: "Quelle est la durée maximale de la période d'essai en Tunisie ?",
      respuesta:
        "{{tn.periode-essai[mois-max]}} mois, renouvelables une seule fois pour la même durée, soit douze mois au plus avec le renouvellement.",
    },
    {
      pregunta: "Un contrat à durée déterminée peut-il prévoir une période d'essai ?",
      respuesta:
        "Non. La loi n° 2025-9 interdit la période d'essai dans le contrat à durée déterminée, qui n'est plus permis que dans des cas exceptionnels.",
    },
    {
      pregunta: "Que se passe-t-il si l'employeur réembauche le salarié après un essai interrompu ?",
      respuesta:
        "Le nouveau contrat entre les mêmes parties est conclu pour une durée indéterminée et sans période d'essai.",
    },
    {
      pregunta: "Les essais de plus de six mois signés avant la loi restent-ils valables ?",
      respuesta:
        "La loi maintient les périodes d'essai des contrats antérieurs lorsqu'elles sont inférieures à six mois.",
    },
  ],
  glosario: [
    { termino: "Période d'essai", definicion: "Début du contrat pendant lequel chaque partie peut y mettre fin plus facilement." },
    { termino: "Loi n° 2025-9", definicion: "Loi du 21 mai 2025 sur les contrats de travail et l'interdiction de la sous-traitance de main-d'œuvre." },
  ],
});
