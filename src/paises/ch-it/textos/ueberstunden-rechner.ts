import { definirTextos } from "@/motor/edicion";
import ueberstundenRechner from "../../ch/calculadoras/ueberstunden-rechner";
import { COMUN } from "../lib/comun";

export default definirTextos(ueberstundenRechner, {
  calculadora: "ch-it.ueberstunden-rechner",
  slug: "lavoro-straordinario",
  campos: {
    lohnart: { etiqueta: "Tipo di salario", opciones: { "monat": "Salario mensile", "stunde": "Salario orario" } },
    lohn: { etiqueta: "Salario lordo (al mese o all'ora)" },
    wochenstunden: { etiqueta: "Orario di lavoro contrattuale alla settimana (ore)" },
    stunden: { etiqueta: "Numero di ore di lavoro straordinario" },
    zuschlag: { etiqueta: "Supplemento secondo il contratto", ayuda: "Lascia vuoto: vale il supplemento legale." },
  },
  filas: {
    total: { etiqueta: "Retribuzione del lavoro straordinario" },
    grund: { etiqueta: "Salario normale per queste ore" },
    zuschlag: { etiqueta: "Supplemento" },
    satz: { etiqueta: "Aliquota del supplemento" },
    stundenlohn: { etiqueta: "Salario orario" },
  },
  ...COMUN,
});
