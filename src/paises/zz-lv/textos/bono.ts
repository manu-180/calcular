import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-lv.bono",
  slug: "pusgada-premija",
  campos: {
    sueldo: { etiqueta: "Mēneša bruto alga" },
    meses: { etiqueta: "Cik pusgada mēnešus strādājāt" },
    region: { etiqueta: "Reģions, kurā strādājat" },
    regimen: { etiqueta: "Uzņēmuma lielums", opciones: { general: "Vidējs vai liels uzņēmums", pequena: "Mazs uzņēmums" } },
  },
  filas: {
    base: { etiqueta: "Aprēķina alga" },
    bono: { etiqueta: "Prēmija" },
    bonificacion: { etiqueta: "Piemaksa" },
    total: { etiqueta: "Kopā izmaksājams" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "Mēnešu skaitam jābūt no 1 līdz 6.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "Jūsu alga ir mazāka par minimālo jūsu reģionā, tāpēc prēmiju aprēķina no minimālās algas.",
  },
});
