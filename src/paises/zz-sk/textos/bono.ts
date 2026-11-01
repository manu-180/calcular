import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-sk.bono",
  slug: "polrocna-premia",
  campos: {
    sueldo: { etiqueta: "Hrubá mesačná mzda" },
    meses: { etiqueta: "Koľko mesiacov polroka ste odpracovali" },
    region: { etiqueta: "Kraj, v ktorom pracujete" },
    regimen: { etiqueta: "Veľkosť firmy", opciones: { general: "Stredná alebo veľká firma", pequena: "Malá firma" } },
  },
  filas: {
    base: { etiqueta: "Mzda na výpočet" },
    bono: { etiqueta: "Prémia" },
    bonificacion: { etiqueta: "Príplatok" },
    total: { etiqueta: "Spolu na výplatu" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "Počet mesiacov je od 1 do 6.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "Vaša mzda je nižšia ako minimálna mzda vo vašom kraji, preto sa prémia počíta z minimálnej mzdy.",
  },
});
