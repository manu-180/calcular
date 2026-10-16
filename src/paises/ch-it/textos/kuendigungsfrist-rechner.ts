import { definirTextos } from "@/motor/edicion";
import kuendigungsfristRechner from "../../ch/calculadoras/kuendigungsfrist-rechner";
import { COMUN } from "../lib/comun";

export default definirTextos(kuendigungsfristRechner, {
  calculadora: "ch-it.kuendigungsfrist-rechner",
  slug: "termine-di-disdetta",
  campos: {
    beginn: { etiqueta: "Inizio del rapporto di lavoro" },
    zugang: { etiqueta: "Giorno in cui la disdetta giunge al destinatario" },
    probezeit: { etiqueta: "Periodo di prova in mesi", ayuda: "Senza accordo, il primo mese è il periodo di prova. Al massimo sono possibili tre mesi." },
    vertragFrist: { etiqueta: "Termine di disdetta secondo il contratto in mesi (se diverso)" },
  },
  filas: {
    ende: { etiqueta: "Ultimo giorno di lavoro (fine del rapporto di lavoro)" },
    frist: { etiqueta: "Termine di disdetta" },
    dienstjahr: { etiqueta: "Anno di servizio quando giunge la disdetta" },
  },
  ...COMUN,
});
