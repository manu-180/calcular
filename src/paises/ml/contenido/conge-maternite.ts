import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ml.conge-maternite",
  h1: "Calcul des dates du congé de maternité au Mali",
  title: "Congé de maternité au Mali : dates de début et de fin",
  description: "Trouvez les dates de votre congé de maternité au Mali : {{ml.maternite-semaines[total]}} au total, dont {{ml.maternite-semaines[avant]}} avant la date présumée de l'accouchement.",
  intro: [
    "Toute femme enceinte salariée a droit à un congé de maternité. Il commence avant la date présumée de l'accouchement et se termine plusieurs semaines après.",
    "Indiquez la date présumée de l'accouchement. Vous obtenez les dates de début et de fin du congé.",
  ],
  comoSeCalcula: [
    "Le congé dure {{ml.maternite-semaines[total]}}. Il commence {{ml.maternite-semaines[avant]}} avant la date présumée et se termine {{ml.maternite-semaines[apres]}} après l'accouchement.",
    "Une maladie attestée par un médecin et due à la grossesse ou aux couches permet de prolonger le congé de {{ml.maternite-semaines[prolongation-maladie]}}.",
  ],
  ejemplo: ["Pour un terme au 15 décembre 2026, le congé va du 3 novembre 2026 au 8 février 2027."],
  faq: [
    {
      pregunta: "Que se passe-t-il si le bébé naît en avance ?",
      respuesta: "Le repos est prolongé jusqu'à la fin des {{ml.maternite-semaines[total]}} de congé : vous ne perdez pas de semaines.",
    },
    {
      pregunta: "Pendant combien de temps l'employeur ne peut-il pas me faire travailler ?",
      respuesta: "Le Code interdit d'employer la salariée pendant sept semaines consécutives, dont trois avant la date présumée de l'accouchement.",
    },
    {
      pregunta: "Suis-je payée pendant le congé ?",
      respuesta: "Oui. Pendant le congé de maternité, la salariée a droit aux soins gratuits et à la rémunération qu'elle percevait au moment de l'arrêt, dans les conditions du Code de prévoyance sociale.",
    },
  ],
  glosario: [{ termino: "Date présumée de l'accouchement", definicion: "La date du terme indiquée par le médecin ou la sage-femme." }],
});
