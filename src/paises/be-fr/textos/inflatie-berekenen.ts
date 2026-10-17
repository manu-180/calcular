import { definirTextos } from "@/motor/edicion";
import base from "../../be/calculadoras/inflatie-berekenen";
import { datumFr } from "../lib/fr";

function meldingFr(texto: string): string | undefined {
  const begin = /^De reeks begint in (.+)\.$/.exec(texto);
  if (begin) return `La série commence en ${datumFr(begin[1]) ?? begin[1]}.`;
  const niet = /^Statbel heeft (.+) nog niet gepubliceerd\. De laatste maand is (.+)\.$/.exec(texto);
  if (niet) return `Statbel n'a pas encore publié ${datumFr(niet[1]) ?? niet[1]}. Le dernier mois est ${datumFr(niet[2]) ?? niet[2]}.`;
  const laatste = /^Het laatste cijfer van Statbel is van (.+), dus de berekening loopt tot die maand\.$/.exec(texto);
  if (laatste) return `Le dernier chiffre de Statbel date de ${datumFr(laatste[1]) ?? laatste[1]}, le calcul s'arrête donc à ce mois.`;
  return datumFr(texto);
}

export default definirTextos(base, {
  calculadora: "be-fr.inflatie-berekenen",
  slug: "calcul-inflation",
  campos: {
    bedrag: { etiqueta: "Montant" },
    van: { etiqueta: "Mois du montant d'origine", ayuda: "Nous utilisons l'indice des prix à la consommation de ce mois. Le jour n'a pas d'importance." },
    tot: { etiqueta: "Mois vers lequel convertir" },
  },
  filas: {
    nieuwBedrag: { etiqueta: "Montant aux prix du mois final" },
    verschil: { etiqueta: "Hausse due à l'inflation" },
    totaal: { etiqueta: "Inflation sur toute la période" },
    jaar: { etiqueta: "Inflation sur 12 mois (mois final)" },
    beginmaand: { etiqueta: "Mois de départ" },
    indexBegin: { etiqueta: "Indice des prix à la consommation du mois de départ (2013 = 100)" },
    eindmaand: { etiqueta: "Mois final" },
    indexEind: { etiqueta: "Indice des prix à la consommation du mois final (2013 = 100)" },
  },
  mensajes: {
    "De begindatum moet vóór de einddatum liggen.": "La date de départ doit précéder la date finale.",
  },
  traducir: meldingFr,
});
