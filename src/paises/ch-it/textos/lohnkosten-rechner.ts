import { definirTextos } from "@/motor/edicion";
import lohnkostenRechner from "../../ch/calculadoras/lohnkosten-rechner";
import { ANZAHL, COMUN } from "../lib/comun";

export default definirTextos(lohnkostenRechner, {
  calculadora: "ch-it.lohnkosten-rechner",
  slug: "costo-datore-di-lavoro",
  campos: {
    monatslohn: { etiqueta: "Salario lordo mensile" },
    anzahl: { etiqueta: "Numero di mensilità all'anno", opciones: ANZAHL },
    alter: { etiqueta: "Età della persona dipendente" },
    fak: { etiqueta: "Aliquota della cassa di compensazione per assegni familiari (CAF)", ayuda: "L'aliquota dipende dal cantone e dalla cassa." },
    bu: { etiqueta: "Premio infortuni professionali (AIP)", ayuda: "Secondo la polizza del tuo assicuratore infortuni." },
    ktg: { etiqueta: "Quota del datore di lavoro per la perdita di guadagno malattia" },
    bvgMonat: { etiqueta: "Contributo LPP del datore di lavoro al mese", ayuda: "Lascia vuoto: il calcolatore usa metà dell'accredito di vecchiaia legale." },
  },
  filas: {
    kostenMonat: { etiqueta: "Costo salariale al mese" },
    ahv: { etiqueta: "AVS/AI/IPG quota del datore di lavoro" },
    alv: { etiqueta: "AD quota del datore di lavoro" },
    bvg: { etiqueta: "Cassa pensioni quota del datore di lavoro" },
    fak: { etiqueta: "Cassa di compensazione per assegni familiari" },
    bu: { etiqueta: "Infortuni professionali" },
    ktg: { etiqueta: "Perdita di guadagno malattia" },
    beitraege: { etiqueta: "Contributi del datore di lavoro al mese" },
    zuschlag: { etiqueta: "Supplemento sul salario lordo" },
    kostenJahr: { etiqueta: "Costo salariale all'anno" },
  },
  ...COMUN,
});
