import { definirTextos } from "@/motor/edicion";
import base from "../../be/calculadoras/bruto-netto-berekenen";
import { GEZIN, STATUUT } from "../lib/fr";

export default definirTextos(base, {
  calculadora: "be-fr.bruto-netto-berekenen",
  slug: "calcul-salaire-brut-net",
  campos: {
    bruto: { etiqueta: "Salaire mensuel brut" },
    statuut: { etiqueta: "Statut", opciones: STATUUT },
    gezin: { etiqueta: "Situation familiale", opciones: GEZIN },
    kinderen: { etiqueta: "Enfants à charge", ayuda: "Un enfant handicapé compte pour deux." },
    alleenstaandeOuder: { etiqueta: "Vous élevez seul vos enfants" },
  },
  filas: {
    netto: { etiqueta: "Salaire net par mois" },
    bruto: { etiqueta: "Salaire brut" },
    rsz: { etiqueta: "Moins : cotisations personnelles ONSS" },
    werkbonus: { etiqueta: "Plus : bonus à l'emploi social" },
    belastbaar: { etiqueta: "Salaire imposable" },
    bedrijfsvoorheffing: { etiqueta: "Moins : précompte professionnel" },
    werkbonusFiscaal: { etiqueta: "Dont déjà déduit : bonus à l'emploi fiscal" },
    bbsz: { etiqueta: "Moins : cotisation spéciale de sécurité sociale" },
    aandeel: { etiqueta: "Net en pourcentage du brut" },
  },
  mensajes: {
    "Vul een brutoloon boven nul in.": "Indiquez un salaire brut supérieur à zéro.",
    "Dit is je nettoloon voor een voltijdse maand zonder extra's. Maaltijdcheques, een bedrijfswagen, overuren, premies of een groepsverzekering veranderen het bedrag.":
      "Il s'agit de votre salaire net pour un mois complet à temps plein, sans avantages. Les chèques-repas, une voiture de société, les heures supplémentaires, les primes ou une assurance groupe modifient le montant.",
    "De bedrijfsvoorheffing is een voorschot op je personenbelasting. Met je belastingaangifte krijg je later geld terug of betaal je bij, onder meer door de gemeentebelasting van je gemeente.":
      "Le précompte professionnel est une avance sur votre impôt des personnes physiques. Avec votre déclaration, vous serez remboursé ou devrez payer un supplément, notamment selon la taxe communale de votre commune.",
    "Als arbeider krijg je je vakantiegeld van de RJV of een vakantiefonds. Daarom worden de RSZ-bijdragen berekend op 108 % van je brutoloon.":
      "En tant qu'ouvrier, vous recevez votre pécule de vacances de l'ONVA ou d'une caisse de vacances. C'est pourquoi les cotisations ONSS sont calculées sur 108 % de votre salaire brut.",
  },
});
