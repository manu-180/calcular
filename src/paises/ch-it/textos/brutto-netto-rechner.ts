import { definirTextos } from "@/motor/edicion";
import bruttoNettoRechner from "../../ch/calculadoras/brutto-netto-rechner";
import { ANZAHL, COMUN } from "../lib/comun";

export default definirTextos(bruttoNettoRechner, {
  calculadora: "ch-it.brutto-netto-rechner",
  slug: "calcolo-stipendio-netto",
  campos: {
    monatslohn: { etiqueta: "Salario lordo mensile" },
    anzahl: { etiqueta: "Numero di mensilità all'anno", opciones: ANZAHL },
    alter: { etiqueta: "Età (anno civile meno anno di nascita)" },
    nbu: { etiqueta: "Premio infortuni non professionali (AINP)", ayuda: "Lo trovi sul conteggio del salario. Dipende dall'assicuratore e dal ramo." },
    ktg: { etiqueta: "Contributo perdita di guadagno in caso di malattia (se dedotto)" },
    bvgMonat: { etiqueta: "Deduzione LPP mensile secondo il conteggio del salario", ayuda: "Lascia vuoto: il calcolatore stima il contributo minimo legale." },
  },
  filas: {
    netto: { etiqueta: "Salario netto mensile" },
    ahv: { etiqueta: "AVS/AI/IPG" },
    alv: { etiqueta: "Assicurazione contro la disoccupazione (AD)" },
    bvg: { etiqueta: "Cassa pensioni (LPP)" },
    nbu: { etiqueta: "Infortuni non professionali (AINP)" },
    ktg: { etiqueta: "Perdita di guadagno malattia" },
    total: { etiqueta: "Deduzioni totali al mese" },
    jahreslohn: { etiqueta: "Salario lordo annuo" },
    nettoJahr: { etiqueta: "Salario netto annuo" },
    koordinierterLohn: { etiqueta: "Salario coordinato (LPP)" },
  },
  ...COMUN,
});
