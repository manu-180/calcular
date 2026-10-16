import { definirTextos } from "@/motor/edicion";
import base from "../../be/calculadoras/overuren-berekenen";

export default definirTextos(base, {
  calculadora: "be-fr.overuren-berekenen",
  slug: "calcul-heures-supplementaires",
  campos: {
    maandloon: { etiqueta: "Salaire mensuel brut" },
    uren: { etiqueta: "Heures par semaine dans votre contrat" },
    week: { etiqueta: "Heures supplémentaires en semaine et le samedi" },
    zondag: { etiqueta: "Heures supplémentaires le dimanche ou un jour férié" },
  },
  filas: {
    totaal: { etiqueta: "Brut pour vos heures supplémentaires" },
    uurloon: { etiqueta: "Salaire horaire brut" },
    gewoonLoon: { etiqueta: "Salaire normal pour ces heures" },
    toeslag: { etiqueta: "Sursalaire" },
  },
  mensajes: {
    "Vul je brutomaandloon in.": "Indiquez votre salaire mensuel brut.",
    "Het overloon wordt berekend op je gewone loon, met de premies die er rechtstreeks bij horen, zoals een ploegenpremie. Je cao of arbeidsreglement kan meer toekennen.":
      "Le sursalaire est calculé sur votre rémunération ordinaire, avec les primes qui y sont directement liées, comme une prime d'équipe. Votre convention collective ou votre règlement de travail peut accorder davantage.",
  },
});
