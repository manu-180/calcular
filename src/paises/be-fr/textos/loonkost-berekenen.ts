import { definirTextos } from "@/motor/edicion";
import base from "../../be/calculadoras/loonkost-berekenen";
import { STATUUT } from "../lib/fr";

export default definirTextos(base, {
  calculadora: "be-fr.loonkost-berekenen",
  slug: "calcul-cout-employeur",
  campos: {
    bruto: { etiqueta: "Salaire mensuel brut" },
    statuut: { etiqueta: "Statut", opciones: STATUUT },
  },
  filas: {
    perMaand: { etiqueta: "Coût salarial par mois" },
    bruto: { etiqueta: "Salaire brut" },
    rsz: { etiqueta: "Plus : cotisations patronales ONSS" },
    tarief: { etiqueta: "Taux des cotisations patronales" },
    vakantie: { etiqueta: "Plus : cotisation pour le pécule de vacances des ouvriers" },
    dubbel: { etiqueta: "Double pécule de vacances par an (employés)" },
    perJaar: { etiqueta: "Coût salarial par an" },
  },
  mensajes: {
    "Vul een brutoloon boven nul in.": "Indiquez un salaire brut supérieur à zéro.",
    "Dit is de loonkost zonder RSZ-verminderingen. Veel werkgevers krijgen een structurele vermindering of een doelgroepvermindering, bijvoorbeeld voor eerste aanwervingen of lage lonen, en betalen dan minder.":
      "Il s'agit du coût salarial sans réductions ONSS. Beaucoup d'employeurs bénéficient d'une réduction structurelle ou d'une réduction groupe-cible, par exemple pour les premiers engagements ou les bas salaires, et paient alors moins.",
    "Niet inbegrepen: eindejaarspremie, maaltijdcheques, verzekering arbeidsongevallen, groepsverzekering, vervoerskosten en andere voordelen.":
      "Non compris : prime de fin d'année, chèques-repas, assurance accidents du travail, assurance groupe, frais de déplacement et autres avantages.",
  },
});
