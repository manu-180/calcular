import { definirTextos } from "@/motor/edicion";
import arbeitslosengeldRechner from "../../ch/calculadoras/arbeitslosengeld-rechner";
import { COMUN } from "../lib/comun";

export default definirTextos(arbeitslosengeldRechner, {
  calculadora: "ch-it.arbeitslosengeld-rechner",
  slug: "indennita-di-disoccupazione",
  campos: {
    verdienst: { etiqueta: "Salario mensile medio degli ultimi 6 o 12 mesi", ayuda: "Conta la più alta delle due medie." },
    unterhalt: { etiqueta: "Obbligo di mantenimento verso figli sotto i 25 anni" },
    ivRente: { etiqueta: "Rendita AI per un grado d'invalidità di almeno il 40 %" },
    alter: { etiqueta: "Età" },
    beitragsmonate: { etiqueta: "Mesi di contribuzione negli ultimi due anni" },
  },
  filas: {
    taggeld: { etiqueta: "Indennità giornaliera lorda" },
    satz: { etiqueta: "Quota del guadagno assicurato" },
    monat: { etiqueta: "Al mese lordo (21.7 indennità)" },
    versichert: { etiqueta: "Guadagno assicurato al mese" },
    anzahl: { etiqueta: "Numero massimo di indennità giornaliere" },
    gesamt: { etiqueta: "Totale se ricevi tutte le indennità" },
  },
  ...COMUN,
});
