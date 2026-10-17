import { definirTextos } from "@/motor/edicion";
import ferienrechner from "../../ch/calculadoras/ferienrechner";
import { COMUN } from "../lib/comun";

export default definirTextos(ferienrechner, {
  calculadora: "ch-it.ferienrechner",
  slug: "calcolo-vacanze",
  campos: {
    alter: { etiqueta: "Età" },
    tageProWoche: { etiqueta: "Giorni di lavoro alla settimana" },
    monate: { etiqueta: "Mesi nell'anno di servizio", ayuda: "Per un anno di servizio incompleto, per esempio in caso di entrata o uscita." },
    vertragWochen: { etiqueta: "Settimane di vacanza secondo il contratto (se più della legge)" },
  },
  filas: {
    tage: { etiqueta: "Giorni di vacanza per questo periodo" },
    wochen: { etiqueta: "Settimane di vacanza per anno di servizio" },
    tageJahr: { etiqueta: "Giorni di vacanza per un anno di servizio intero" },
    zuschlag: { etiqueta: "Supplemento vacanze teorico per il salario orario" },
  },
  ...COMUN,
});
