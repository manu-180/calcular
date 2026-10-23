import { definirTextos } from "@/motor/edicion";
import preavisLicenciement from "../../lu/calculadoras/preavis-licenciement";
import { COMUN } from "../lib/comun";

export default definirTextos(preavisLicenciement, {
  calculadora: "lu-de.preavis-licenciement",
  slug: "kuendigungsfrist-rechner",
  campos: {
    initiative: { etiqueta: "Wer beendet den Vertrag?", opciones: { "employeur": "Der Arbeitgeber (Kündigung)", "salarie": "Der Arbeitnehmer (Kündigung durch den Arbeitnehmer)" } },
    entree: { etiqueta: "Eintrittsdatum im Unternehmen" },
    notification: { etiqueta: "Datum der Zustellung der Kündigung" },
  },
  filas: {
    fin: { etiqueta: "Vertragsende (letzter Tag der Kündigungsfrist)" },
    debut: { etiqueta: "Beginn der Kündigungsfrist" },
    mois: { etiqueta: "Dauer der Kündigungsfrist" },
    anciennete: { etiqueta: "Betriebszugehörigkeit bei der Zustellung (volle Jahre)" },
  },
  ...COMUN,
});
