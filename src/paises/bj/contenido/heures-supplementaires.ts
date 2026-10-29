import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bj.heures-supplementaires",
  h1: "Calcul des heures supplémentaires au Bénin ({{anio}})",
  title: "Heures supplémentaires {{anio}} au Bénin : majorations",
  description: "Calculez le paiement de vos heures supplémentaires au Bénin avec les majorations du Code du travail, de {{bj.heures-sup-majorations[41-48]}} à {{bj.heures-sup-majorations[dimanche-nuit]}}.",
  intro: [
    "La durée légale du travail est de {{bj.duree-legale-travail}} par semaine au Bénin. Les heures faites au-delà sont des heures supplémentaires et se paient plus cher.",
    "Indiquez votre salaire et le nombre d'heures de la semaine selon le moment où elles ont été faites. Vous obtenez le paiement total et le détail.",
  ],
  comoSeCalcula: [
    "Le taux horaire se déduit du salaire mensuel : on multiplie par 12, on divise par 52 semaines puis par {{bj.duree-legale-travail}}.",
    "De jour, les {{bj.heures-sup-premiere-tranche}} premières heures supplémentaires (de la 41e à la 48e) sont majorées de {{bj.heures-sup-majorations[41-48]}}, les suivantes de {{bj.heures-sup-majorations[au-dela-48]}} (article 147 du Code du travail).",
    "Les heures du dimanche et des jours fériés, de jour, sont majorées de {{bj.heures-sup-majorations[dimanche-jour]}}. De nuit, entre 21 heures et 5 heures, la majoration est de {{bj.heures-sup-majorations[nuit]}} en semaine et de {{bj.heures-sup-majorations[dimanche-nuit]}} le dimanche ou un jour férié.",
    "L'employeur peut imposer jusqu'à {{bj.heures-sup-plafond-annuel}} supplémentaires par année civile et par salarié. Au-delà, l'autorisation préalable de l'inspecteur du travail est nécessaire (article 145).",
  ],
  ejemplo: [
    "Avec 200 000 F par mois, le taux horaire est d'environ 1 154 F. Pour 8 heures supplémentaires de jour dans la semaine, chacune est payée à 1 154 F majoré de 12 %, soit environ 1 292 F : environ 10 338 F pour la semaine.",
  ],
  faq: [
    {
      pregunta: "Quelles sont les majorations des heures supplémentaires au Bénin ?",
      respuesta: "L'article 147 du Code du travail prévoit 12 % de la 41e à la 48e heure, 35 % au-delà, 50 % les dimanches et jours fériés, et 50 % ou 100 % la nuit.",
    },
    {
      pregunta: "Combien d'heures supplémentaires par an au maximum ?",
      respuesta: "Selon l'article 145, l'employeur peut en imposer {{bj.heures-sup-plafond-annuel}} par année civile et par salarié. Au-delà, l'inspecteur du travail doit les autoriser.",
    },
    {
      pregunta: "Quelle est la durée légale hebdomadaire ?",
      respuesta: "L'article 142 du Code du travail fixe la durée légale à {{bj.duree-legale-travail}} par semaine hors établissements agricoles.",
    },
  ],
  glosario: [
    { termino: "Heure supplémentaire", definicion: "Une heure travaillée au-delà de la durée légale hebdomadaire." },
    { termino: "Majoration", definicion: "Le pourcentage ajouté au taux horaire normal." },
    { termino: "Contingent", definicion: "Le nombre d'heures supplémentaires que l'employeur peut imposer seul sur l'année." },
  ],
});
