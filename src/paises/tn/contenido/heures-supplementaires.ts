import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tn.heures-supplementaires",
  h1: "Calcul des heures supplémentaires en Tunisie",
  title: "Heures supplémentaires Tunisie : majoration de {{tn.heures-supplementaires[regime-reduit-jusqu-a-48h]}} à {{tn.heures-supplementaires[regime-48h]}}",
  description:
    "Calculez le paiement de vos heures supplémentaires selon le code du travail tunisien : {{tn.heures-supplementaires[regime-48h]}} en régime de 48 heures, {{tn.heures-supplementaires[regime-reduit-jusqu-a-48h]}} puis {{tn.heures-supplementaires[regime-reduit-au-dela]}} en dessous.",
  intro: [
    "Toute heure faite au delà de la durée normale hebdomadaire est une heure supplémentaire. Elle est payée sur la base du salaire horaire, majorée selon votre régime de travail.",
    "Indiquez votre salaire horaire de base, votre régime et vos heures supplémentaires de la semaine.",
  ],
  comoSeCalcula: [
    "Régime de 48 heures par semaine : majoration de {{tn.heures-supplementaires[regime-48h]}}.",
    "Régime à temps plein de moins de 48 heures : {{tn.heures-supplementaires[regime-reduit-jusqu-a-48h]}} jusqu'à la 48e heure, puis {{tn.heures-supplementaires[regime-reduit-au-dela]}}.",
    "Temps partiel : majoration de {{tn.heures-supplementaires[temps-partiel]}}.",
  ],
  faq: [
    {
      pregunta: "Comment sont payées les heures supplémentaires en Tunisie ?",
      respuesta: "Sur la base du salaire horaire de base, majoré de {{tn.heures-supplementaires[regime-48h]}} en régime de 48 heures. Avec une semaine plus courte, par exemple de 40 heures, la majoration est de {{tn.heures-supplementaires[regime-reduit-jusqu-a-48h]}} jusqu'à 48 heures puis de {{tn.heures-supplementaires[regime-reduit-au-dela]}}.",
    },
    {
      pregunta: "Combien d'heures peut-on travailler au maximum par semaine ?",
      respuesta: "Heures supplémentaires comprises, la durée de travail ne peut pas dépasser 60 heures par semaine, sauf travaux urgents pour prévenir un accident ou organiser des secours.",
    },
    {
      pregunta: "Ces règles valent-elles dans l'agriculture ?",
      respuesta: "Non. Ce calcul suit les règles du secteur non agricole. Le travail agricole a ses propres dispositions dans le code du travail.",
    },
  ],
  glosario: [
    { termino: "Heure supplémentaire", definicion: "Heure faite au delà de la durée normale hebdomadaire du travail." },
    { termino: "Salaire horaire de base", definicion: "Le salaire de base rapporté à une heure de travail, sur lequel se calcule la majoration." },
    { termino: "Majoration", definicion: "Supplément ajouté au salaire normal de l'heure." },
  ],
});
