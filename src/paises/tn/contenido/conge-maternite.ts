import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tn.conge-maternite",
  h1: "Congé de maternité et de paternité en Tunisie",
  title: "Congé maternité Tunisie 2026 : dates et durée",
  description:
    "Calculez vos dates de congé de maternité en Tunisie selon la loi n° 2024-44 : prénatal, {{tn.conges-maternite[naissance-mois]}} mois de congé de naissance, postnatal et congé de paternité.",
  intro: [
    "La loi n° 2024-44 du 12 août 2024 a allongé les congés de maternité et créé un vrai congé de paternité, dans la fonction publique comme dans le secteur privé.",
    "Indiquez la date d'accouchement, votre situation et la durée du congé postnatal éventuel. Vous obtenez les dates de chaque congé, la reprise du travail et la fin de la pause d'allaitement.",
  ],
  comoSeCalcula: [
    "Congé prénatal : au plus {{tn.conges-maternite[prenatal-jours]}} jours pendant le dernier mois de grossesse, sur certificat médical.",
    "Congé de naissance : {{tn.conges-maternite[naissance-mois]}} mois, portés à {{tn.conges-maternite[naissance-mois-renforce]}} mois pour des jumeaux, un enfant prématuré, handicapé ou atteint de malformations, et ramenés à {{tn.conges-maternite[mort-ne-mois]}} mois pour un enfant mort-né.",
    "Congé postnatal : de {{tn.conges-maternite[postnatal-min-mois]}} à {{tn.conges-maternite[postnatal-max-mois]}} mois juste après le congé de naissance, à la demande de la mère et avec l'accord de l'employeur.",
    "Congé de paternité : {{tn.conges-maternite[paternite-jours]}} jours payés, {{tn.conges-maternite[paternite-jours-renforce]}} jours dans les cas renforcés, à prendre dans les {{tn.conges-maternite[paternite-delai-jours]}} jours qui suivent la naissance.",
  ],
  faq: [
    {
      pregunta: "Combien dure le congé de maternité en Tunisie en 2026 ?",
      respuesta:
        "{{tn.conges-maternite[naissance-mois]}} mois de congé de naissance après l'accouchement, plus jusqu'à {{tn.conges-maternite[prenatal-jours]}} jours avant. La mère peut demander ensuite un congé postnatal de {{tn.conges-maternite[postnatal-min-mois]}} à {{tn.conges-maternite[postnatal-max-mois]}} mois.",
    },
    {
      pregunta: "Le congé de maternité est-il payé dans le privé ?",
      respuesta:
        "Dans le secteur privé, la mère reçoit pendant les congés prénatal, de naissance et postnatal une indemnité calculée selon la législation de sécurité sociale. Dans la fonction publique, le salaire est maintenu en entier, puis à moitié pendant le congé postnatal.",
    },
    {
      pregunta: "Combien de jours de congé de paternité en Tunisie ?",
      respuesta:
        "{{tn.conges-maternite[paternite-jours]}} jours payés, {{tn.conges-maternite[paternite-jours-renforce]}} jours pour des jumeaux ou un enfant prématuré, handicapé ou avec malformations, et {{tn.conges-maternite[paternite-mort-ne-jours]}} jours si l'enfant est mort-né.",
    },
    {
      pregunta: "Peut-on être licenciée pendant la grossesse ?",
      respuesta:
        "Non. La loi interdit de sanctionner ou de licencier une femme pendant sa grossesse ou ses congés pour un motif lié à la grossesse, à l'accouchement ou à l'allaitement.",
    },
  ],
  glosario: [
    { termino: "Congé de naissance", definicion: "Congé de la mère qui commence dès l'accouchement." },
    { termino: "Congé postnatal", definicion: "Congé facultatif qui prolonge le congé de naissance." },
    { termino: "Pause d'allaitement", definicion: "Une heure par jour au début ou à la fin du travail, pendant neuf mois après la reprise, ou jusqu'au premier anniversaire après un congé postnatal." },
  ],
});
