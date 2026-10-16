import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "be-fr.sociale-bijdragen-zelfstandige",
  h1: "Calcul des cotisations sociales d'indépendant",
  title: "Cotisations sociales indépendant 2026 : calcul par trimestre",
  description:
    "Calculez vos cotisations sociales d'indépendant à titre principal ou complémentaire : {{be.rsvz-tarieven[tarief-1]}} jusqu'à {{be.rsvz[grens-1]}} et {{be.rsvz-tarieven[tarief-2]}} au-delà.",
  intro: [
    "Comme indépendant, vous payez chaque trimestre des cotisations sociales à votre caisse d'assurances sociales. Elles sont calculées sur votre revenu professionnel net imposable.",
    "Indiquez votre revenu et choisissez activité principale ou complémentaire. Vous voyez votre cotisation par trimestre et par an, hors frais de gestion de votre caisse.",
  ],
  comoSeCalcula: [
    "{{be.rsvz-tarieven[tarief-1]}} sur la partie du revenu jusqu'à {{be.rsvz[grens-1]}}.",
    "{{be.rsvz-tarieven[tarief-2]}} sur la partie entre {{be.rsvz[grens-1]}} et {{be.rsvz[grens-2]}}. Au-delà, vous ne payez plus rien.",
    "À titre principal, un revenu minimum de {{be.rsvz[minimum-inkomen]}} s'applique, ou de {{be.rsvz[minimum-inkomen-primostarter]}} pendant vos trimestres de primo-starter.",
    "À titre complémentaire, vous ne payez rien si votre revenu reste sous {{be.rsvz[drempel-bijberoep]}}.",
    "La cotisation annuelle est divisée par 4 pour le montant trimestriel.",
  ],
  ejemplo: [
    "Avec 40.000 € de revenu net imposable à titre principal, vous payez {{be.rsvz-tarieven[tarief-1]}}, soit 8.200 € par an ou 2.050 € par trimestre, plus les frais de gestion de votre caisse.",
  ],
  faq: [
    {
      pregunta: "Sur quel revenu les cotisations sont-elles calculées ?",
      respuesta:
        "Les cotisations définitives sont calculées sur votre revenu professionnel net imposable de l'année même. Tant qu'il n'est pas connu, vous payez des cotisations provisoires sur votre revenu revalorisé d'il y a trois ans, ou sur un revenu estimé si vous débutez.",
    },
    {
      pregunta: "Que sont les frais de gestion ?",
      respuesta: "Un montant que votre caisse d'assurances sociales facture en plus de vos cotisations. Il varie selon la caisse et n'est pas repris dans ce calcul.",
    },
    {
      pregunta: "Qu'est-ce qu'un primo-starter ?",
      respuesta:
        "Un indépendant à titre principal qui commence pour la première fois. Pendant ses premiers trimestres, un revenu minimum plus bas s'applique, de sorte que la cotisation minimale est plus basse.",
    },
  ],
  glosario: [
    { termino: "Caisse d'assurances sociales", definicion: "L'organisme auquel vous êtes affilié comme indépendant et qui perçoit vos cotisations." },
    { termino: "INASTI", definicion: "Institut national d'assurances sociales pour travailleurs indépendants, qui gère le statut social des indépendants." },
    { termino: "Activité complémentaire", definicion: "Vous êtes indépendant en plus d'une autre activité principale, par exemple un emploi salarié." },
  ],
});
