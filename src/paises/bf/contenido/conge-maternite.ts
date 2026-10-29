import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bf.conge-maternite",
  h1: "Calcul des dates du congé de maternité",
  title: "Congé de maternité Burkina Faso : dates de début et de fin",
  description:
    "Le congé de maternité dure {{bf.maternite-semaines[total]}}. Calculez la date de départ, le dernier jour et la reprise selon la date présumée de l'accouchement.",
  intro: [
    "La femme enceinte a droit à un congé de maternité, que l'enfant naisse vivant ou non.",
    "Indiquez la date présumée de l'accouchement et le nombre de semaines avant. Vous obtenez les dates du congé.",
  ],
  comoSeCalcula: [
    "Le congé dure {{bf.maternite-semaines[total]}} en tout.",
    "Il commence au plus tôt {{bf.maternite-semaines[avant-max]}} et au plus tard {{bf.maternite-semaines[avant-min]}} avant la date présumée, ou deux semaines avant sur avis d'un médecin.",
    "Le congé peut être prolongé de {{bf.maternite-semaines[prolongation]}} au plus en cas de maladie liée à la grossesse ou aux couches.",
  ],
  ejemplo: ["Terme prévu le 1er décembre 2026, départ six semaines avant : congé du 20 octobre 2026 au 25 janvier 2027, reprise le 26 janvier."],
  faq: [
    {
      pregunta: "Combien de semaines après l'accouchement ?",
      respuesta:
        "Au plus {{bf.maternite-semaines[apres-max]}} à partir de la date effective de l'accouchement, sauf naissance avant le terme ou départ moins de quatre semaines avant sur avis médical.",
    },
    {
      pregunta: "Mon employeur peut-il me licencier pendant le congé ?",
      respuesta: "Non. Le code du travail interdit à l'employeur de prononcer le licenciement de la femme en congé de maternité.",
    },
    {
      pregunta: "Que se passe-t-il si j'accouche avant la date prévue ?",
      respuesta: "La limite de {{bf.maternite-semaines[apres-max]}} après l'accouchement ne s'applique pas dans ce cas.",
    },
  ],
  glosario: [
    { termino: "Date présumée", definicion: "La date d'accouchement prévue par le médecin ou la sage-femme." },
    { termino: "Prolongation", definicion: "Semaines de congé en plus, accordées en cas de maladie due à la grossesse ou aux couches." },
  ],
});
