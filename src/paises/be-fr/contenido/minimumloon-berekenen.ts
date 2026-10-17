import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "be-fr.minimumloon-berekenen",
  h1: "Salaire minimum en Belgique",
  title: "Salaire minimum Belgique 2026 : {{be.ggmmi}} brut par mois",
  description:
    "Le salaire minimum en Belgique est de {{be.ggmmi}} brut par mois pour un temps plein dès 18 ans. Calculez le minimum pour vos heures, par heure et par an.",
  intro: [
    "En Belgique, le salaire minimum s'appelle officiellement revenu minimum mensuel moyen garanti (RMMMG). Depuis le {{be.ggmmi#desde}}, il est de {{be.ggmmi}} brut par mois pour un travailleur à temps plein de 18 ans ou plus.",
    "Si vous travaillez à temps partiel, le minimum s'applique en proportion de vos heures. Indiquez vos heures et, si vous le souhaitez, votre salaire brut pour vérifier que vous recevez au moins le minimum.",
  ],
  comoSeCalcula: [
    "Minimum pour vos heures : {{be.ggmmi}} × vos heures ÷ les heures d'un temps plein dans votre secteur.",
    "Par heure : salaire mensuel × 3 ÷ 13 (les semaines d'un trimestre) ÷ les heures d'un temps plein par semaine.",
    "Par an : 12 fois le montant mensuel, sans pécule de vacances ni prime de fin d'année.",
  ],
  ejemplo: [
    "Pour une semaine à temps plein de 38 heures, le minimum est de {{be.ggmmi}} par mois. Si vous travaillez 30 heures, votre minimum est ce montant × 30 ÷ 38.",
  ],
  faq: [
    {
      pregunta: "Qui fixe le salaire minimum en Belgique ?",
      respuesta:
        "Les partenaires sociaux, au sein du Conseil national du travail. Le montant figure dans la convention collective de travail n° 43. Votre secteur peut aussi avoir son propre salaire minimum, fixé en commission paritaire.",
    },
    {
      pregunta: "Quand le salaire minimum augmente-t-il ?",
      respuesta:
        "Le salaire minimum est indexé quand l'indice-pivot est dépassé. Il a aussi augmenté en plus le 1er avril 2022, le 1er avril 2024 et le 1er avril 2026, comme convenu par les partenaires sociaux en 2021.",
    },
    {
      pregunta: "Le salaire minimum s'applique-t-il dans mon secteur ?",
      respuesta:
        "Le RMMMG est le plancher absolu pour tous les travailleurs de 18 ans ou plus sous contrat de travail. Le salaire minimum de votre commission paritaire peut être plus élevé, et c'est alors ce montant qui s'applique.",
    },
  ],
  glosario: [
    { termino: "RMMMG", definicion: "Revenu minimum mensuel moyen garanti, le salaire minimum interprofessionnel en Belgique." },
    { termino: "Commission paritaire", definicion: "L'organe de concertation des employeurs et des syndicats d'un secteur, qui fixe notamment les salaires minimums de ce secteur." },
  ],
});
