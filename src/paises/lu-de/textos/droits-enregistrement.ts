import { definirTextos } from "@/motor/edicion";
import droitsEnregistrement from "../../lu/calculadoras/droits-enregistrement";
import { COMUN } from "../lib/comun";

export default definirTextos(droitsEnregistrement, {
  calculadora: "lu-de.droits-enregistrement",
  slug: "registrierungsgebuehren-rechner",
  campos: {
    prix: { etiqueta: "Kaufpreis der Immobilie" },
    habitation: { etiqueta: "Für Ihre Hauptwohnung (Bëllegen Akt)" },
    acquereurs: { etiqueta: "Anzahl der Käufer, die den Steuerkredit beantragen" },
  },
  filas: {
    apayer: { etiqueta: "Zu zahlende Gebühren" },
    droits: { etiqueta: "Gebühren vor Steuerkredit" },
    enregistrement: { etiqueta: "Registrierungsgebühren" },
    transcription: { etiqueta: "Umschreibungsgebühren" },
    credit: { etiqueta: "Genutzter Steuerkredit Bëllegen Akt" },
  },
  ...COMUN,
});
