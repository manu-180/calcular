import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fr.smic",
  h1: "Smic 2026 : montant horaire, mensuel et net",
  title: "Smic 2026 : {{fr.smic-horaire}} brut de l'heure, net et mensuel",
  description:
    "Montant du Smic en 2026 : {{fr.smic-horaire}} brut de l'heure. Calculez le Smic mensuel brut et net selon vos heures, à temps plein ou à temps partiel.",
  intro: [
    "Le Smic est le salaire horaire minimum que doit recevoir tout salarié majeur en France. Depuis le {{fr.smic-horaire#desde}}, il est de {{fr.smic-horaire}} brut de l'heure.",
    "Indiquez vos heures par semaine : la calculatrice donne le Smic mensuel brut, le net après cotisations et le total sur la période qui vous intéresse.",
  ],
  comoSeCalcula: [
    "Le Smic mensuel brut est égal au taux horaire multiplié par les heures mensuelles : heures par semaine × 52 ÷ 12. Pour 35 heures, cela fait 151,67 heures par mois.",
    "Le net s'obtient en retirant les cotisations salariales d'un non-cadre : retraite de base et complémentaire, CSG et CRDS.",
    "Le Smic augmente au moins une fois par an, au 1er janvier. Il augmente aussi en cours d'année quand les prix ont progressé d'au moins 2 % depuis la dernière hausse.",
  ],
  ejemplo: [
    "À temps plein (35 heures), le Smic mensuel est de {{fr.smic-mensuel}} brut, soit 1 477,93 € net avant impôt.",
    "À mi-temps (17,5 heures), il est de 933,51 € brut et 738,96 € net.",
  ],
  faq: [
    {
      pregunta: "Quel est le montant du Smic net en 2026 ?",
      respuesta:
        "Pour 35 heures par semaine, le Smic net est d'environ 1 477,93 € par mois depuis le 1er juin 2026. Il peut varier de quelques euros selon la mutuelle de votre entreprise.",
    },
    {
      pregunta: "Le Smic a-t-il augmenté en 2026 ?",
      respuesta:
        "Oui, deux fois : au 1er janvier, puis au 1er juin 2026 de 2,41 %, parce que les prix avaient augmenté de plus de 2 % depuis janvier. Le taux horaire est passé à {{fr.smic-horaire}}.",
    },
    {
      pregunta: "Le Smic est-il le même partout en France ?",
      respuesta:
        "Il est identique en métropole et dans les départements d'outre-mer, sauf à Mayotte, où un montant plus bas s'applique.",
    },
    {
      pregunta: "Un salarié mineur peut-il être payé moins que le Smic ?",
      respuesta:
        "Oui, un abattement est possible pour un salarié de moins de 18 ans qui a moins de 6 mois de pratique professionnelle dans sa branche. Ce calcul porte sur le Smic d'un salarié majeur.",
    },
  ],
  glosario: [
    { termino: "Smic", definicion: "Salaire minimum interprofessionnel de croissance, fixé par heure de travail." },
    { termino: "151,67 heures", definicion: "Nombre d'heures mensuelles d'un temps plein de 35 heures : 35 × 52 ÷ 12." },
    { termino: "Net avant impôt", definicion: "Ce qui reste après les cotisations salariales, avant le prélèvement à la source." },
  ],
});
