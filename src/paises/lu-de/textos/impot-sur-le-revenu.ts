import { definirTextos } from "@/motor/edicion";
import impotSurLeRevenu from "../../lu/calculadoras/impot-sur-le-revenu";
import { COMUN, STEUERKLASSE } from "../lib/comun";

export default definirTextos(impotSurLeRevenu, {
  calculadora: "lu-de.impot-sur-le-revenu",
  slug: "einkommensteuer-rechner",
  campos: {
    revenu: { etiqueta: "Steuerpflichtiges Jahreseinkommen", ayuda: "Einkommen nach Abzug der Werbungskosten, Sonderausgaben und Freibeträge." },
    classe: { etiqueta: "Steuerklasse", opciones: STEUERKLASSE },
  },
  filas: {
    total: { etiqueta: "Jährliche Einkommensteuer" },
    impot: { etiqueta: "Steuer laut Tarif" },
    fonds: { etiqueta: "Beitrag zum Beschäftigungsfonds" },
    base: { etiqueta: "Einkommen auf 50 Euro abgerundet" },
    moyen: { etiqueta: "Durchschnittssteuersatz" },
  },
  ...COMUN,
});
