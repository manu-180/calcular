import { definirTextos } from "@/motor/edicion";
import ahvBeitraegeSelbststaendige from "../../ch/calculadoras/ahv-beitraege-selbststaendige";
import { COMUN } from "../lib/comun";

export default definirTextos(ahvBeitraegeSelbststaendige, {
  calculadora: "ch-it.ahv-beitraege-selbststaendige",
  slug: "contributi-avs-indipendenti",
  campos: {
    einkommen: { etiqueta: "Reddito annuo da attività indipendente" },
  },
  filas: {
    beitrag: { etiqueta: "Contributo AVS/AI/IPG all'anno" },
    satz: { etiqueta: "Aliquota di contribuzione" },
    monat: { etiqueta: "Al mese" },
  },
  ...COMUN,
});
