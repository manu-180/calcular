import { definirTextos } from "@/motor/edicion";
import nettoBruttoRechner from "../../ch/calculadoras/netto-brutto-rechner";
import { ANZAHL, COMUN } from "../lib/comun";

export default definirTextos(nettoBruttoRechner, {
  calculadora: "ch-it.netto-brutto-rechner",
  slug: "stipendio-netto-lordo",
  campos: {
    netto: { etiqueta: "Salario netto mensile desiderato" },
    anzahl: { etiqueta: "Numero di mensilità all'anno", opciones: ANZAHL },
    alter: { etiqueta: "Età (anno civile meno anno di nascita)" },
    nbu: { etiqueta: "Premio infortuni non professionali (AINP)" },
    ktg: { etiqueta: "Contributo perdita di guadagno in caso di malattia (se dedotto)" },
  },
  filas: {
    brutto: { etiqueta: "Salario lordo mensile necessario" },
    netto: { etiqueta: "Salario netto con questo lordo" },
    abzuege: { etiqueta: "Deduzioni al mese" },
    jahreslohn: { etiqueta: "Salario lordo annuo" },
  },
  ...COMUN,
});
