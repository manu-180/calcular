import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tg.smig",
  h1: "SMIG au Togo : vérifier un salaire",
  title: "SMIG Togo : montant mensuel et horaire",
  description:
    "Le SMIG togolais est de {{tg.smig}} par mois depuis le {{tg.smig#desde}}. Comparez un salaire au minimum et obtenez le SMIG horaire.",
  intro: [
    "Le salaire minimum interprofessionnel garanti (SMIG) est le plus bas salaire qu'un employeur peut verser pour un emploi à temps plein au Togo.",
    "Saisissez le salaire de base proposé ou reçu pour savoir s'il atteint le SMIG et combien il manque le cas échéant.",
  ],
  comoSeCalcula: [
    "Le SMIG mensuel est de {{tg.smig}} pour un temps plein.",
    "Le SMIG horaire se déduit de la durée légale de {{tg.duree-legale-travail}} par semaine : le SMIG mensuel fois 12, divisé par 52 semaines et par la durée légale.",
    "La différence avec votre salaire indique le montant manquant.",
  ],
  ejemplo: ["Un salaire de 50 000 F par mois reste sous le SMIG : il manque 2 500 F."],
  faq: [
    {
      pregunta: "Le SMIG sert-il aussi aux cotisations ?",
      respuesta: "Oui. La CNSS calcule les cotisations sur au moins le SMIG, même si la rémunération déclarée est plus basse.",
    },
    {
      pregunta: "Le SMIG est-il brut ou net ?",
      respuesta: "C'est un montant brut, avant les cotisations sociales retenues sur le salaire.",
    },
    {
      pregunta: "Les travailleurs payés à la tâche y ont-ils droit ?",
      respuesta:
        "Le Code du travail prévoit qu'ils ne peuvent pas recevoir moins que le SMIG lorsqu'ils travaillent au moins 160 heures dans le mois.",
    },
  ],
  glosario: [
    { termino: "SMIG", definicion: "Salaire minimum interprofessionnel garanti." },
    { termino: "Durée légale", definicion: "Le temps de travail de référence au-delà duquel commencent les heures supplémentaires." },
  ],
});
