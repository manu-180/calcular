import { definirTextos } from "@/motor/edicion";
import inflation from "../../ca/calculadoras/inflation-calculator";
import { moisEnFrancais } from "../lib/comun";

const ARMADOS: readonly [RegExp, (m: RegExpMatchArray) => string][] = [
  [/^The index starts in (.+)\.$/, (m) => `L'indice commence en ${moisEnFrancais(m[1])}.`],
  [/^The CPI for (.+) is not out yet\. The latest is (.+)\.$/, (m) => `L'IPC de ${moisEnFrancais(m[1])} n'est pas encore publié. Le plus récent est celui de ${moisEnFrancais(m[2])}.`],
  [/^The latest CPI published is for (.+), so the calculation stops at that month\.$/, (m) => `Le dernier IPC publié est celui de ${moisEnFrancais(m[1])} : le calcul s'arrête donc à ce mois.`],
];

export default definirTextos(inflation, {
  calculadora: "ca-fr.inflation-calculator",
  slug: "calculatrice-inflation",
  campos: {
    importe: { etiqueta: "Montant" },
    desde: { etiqueta: "Mois du montant de départ", ayuda: "Le calcul utilise l'IPC de ce mois. Le jour ne compte pas." },
    hasta: { etiqueta: "Mois où ramener le montant" },
  },
  filas: {
    actualizado: { etiqueta: "Montant ajusté selon l'inflation" },
    diferencia: { etiqueta: "Hausse due à l'inflation" },
    acumulada: { etiqueta: "Inflation selon l'IPC sur la période" },
    interanual: { etiqueta: "Inflation selon l'IPC sur 12 mois jusqu'au mois d'arrivée" },
    mesInicial: { etiqueta: "Mois de départ" },
    indiceInicial: { etiqueta: "IPC du mois de départ (2002=100)" },
    mesFinal: { etiqueta: "Mois d'arrivée" },
    indiceFinal: { etiqueta: "IPC du mois d'arrivée (2002=100)" },
  },
  mensajes: {
    "The start month has to be before the end month.": "Le mois de départ doit précéder le mois d'arrivée.",
  },
  traducir: (t) => {
    for (const [re, f] of ARMADOS) {
      const m = t.match(re);
      if (m) return f(m);
    }
    const mes = moisEnFrancais(t);
    return mes !== t ? mes : undefined;
  },
});
