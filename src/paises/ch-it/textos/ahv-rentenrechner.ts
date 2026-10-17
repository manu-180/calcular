import { definirTextos } from "@/motor/edicion";
import ahvRentenrechner from "../../ch/calculadoras/ahv-rentenrechner";
import { COMUN } from "../lib/comun";

export default definirTextos(ahvRentenrechner, {
  calculadora: "ch-it.ahv-rentenrechner",
  slug: "rendita-avs",
  campos: {
    einkommen: { etiqueta: "Reddito annuo medio determinante", ayuda: "Media dei redditi rivalutati, più gli accrediti per compiti educativi e assistenziali. La tua cassa di compensazione lo indica in un calcolo anticipato della rendita." },
    verheiratet: { etiqueta: "Coniugato, entrambi i coniugi ricevono una rendita di vecchiaia" },
    einkommenPartner: { etiqueta: "Reddito annuo determinante del coniuge" },
  },
  filas: {
    rente: { etiqueta: "Rendita di vecchiaia AVS al mese" },
    ungekuerzt: { etiqueta: "Rendita prima del plafonamento" },
    partner: { etiqueta: "Rendita del coniuge al mese" },
    summe: { etiqueta: "Rendite della coppia insieme" },
    dreizehnte: { etiqueta: "13a rendita di vecchiaia a dicembre" },
    jahr: { etiqueta: "Rendita di vecchiaia all'anno" },
    tabellenwert: { etiqueta: "Reddito determinante (arrotondato al valore della tabella)" },
  },
  ...COMUN,
});
