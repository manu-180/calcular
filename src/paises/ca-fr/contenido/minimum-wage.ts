import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca-fr.minimum-wage",
  h1: "Salaire minimum au Québec et au Canada (2026)",
  title: "Salaire minimum 2026 au Québec et par province",
  description: "Le salaire minimum en vigueur au Québec ({{ca.minimum-wage@qc}}) et dans chaque province et territoire, plus le minimum fédéral. Salaire par semaine, par mois et par année.",
  intro: [
    "Choisissez votre province ou votre territoire pour voir le salaire minimum général en vigueur aujourd'hui et ce qu'il représente par semaine, par mois et par année.",
    "Les taux viennent de la base de données du gouvernement du Canada sur les salaires minimums actuels et à venir.",
  ],
  comoSeCalcula: [
    "Le taux horaire est le salaire minimum général de votre province ou de votre territoire à la date d'aujourd'hui.",
    "Si votre emploi est de compétence fédérale, vous recevez le minimum fédéral de {{ca.federal-minimum-wage}}, ou le taux provincial s'il est plus élevé.",
    "Le salaire hebdomadaire est le taux horaire multiplié par vos heures. Le montant annuel compte 52 semaines et le montant mensuel est l'année divisée par 12.",
  ],
  ejemplo: [
    "Au Québec, le salaire minimum est de {{ca.minimum-wage@qc}} de l'heure, en vigueur depuis le {{ca.minimum-wage@qc#desde}}.",
  ],
  faq: [
    {
      pregunta: "Le salaire minimum est-il le même partout au Canada?",
      respuesta: "Non. Chaque province et chaque territoire fixe son propre salaire minimum général, et les emplois de compétence fédérale ont un minimum fédéral distinct de {{ca.federal-minimum-wage}}.",
    },
    {
      pregunta: "Depuis quand le salaire minimum du Québec est-il à ce taux?",
      respuesta: "Il est de {{ca.minimum-wage@qc}} depuis le {{ca.minimum-wage@qc#desde}}.",
    },
    {
      pregunta: "Qui reçoit le salaire minimum fédéral?",
      respuesta: "Les travailleurs des secteurs de compétence fédérale, comme les banques, les télécommunications et le transport interprovincial ou international. Ils reçoivent {{ca.federal-minimum-wage}} ou le minimum provincial, selon le plus élevé des deux.",
    },
  ],
  glosario: [
    { termino: "Salaire minimum général", definicion: "Le taux horaire le plus bas que la plupart des employés peuvent recevoir. Certaines provinces ont des taux particuliers pour certains emplois." },
    { termino: "Compétence fédérale", definicion: "Les secteurs régis par le Code canadien du travail plutôt que par les lois provinciales du travail." },
  ],
});
