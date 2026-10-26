import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-cs.bono",
  slug: "pololetni-premie",
  campos: {
    sueldo: { etiqueta: "Hrubá měsíční mzda" },
    meses: { etiqueta: "Kolik měsíců pololetí jste odpracovali" },
    region: { etiqueta: "Kraj, kde pracujete" },
    regimen: { etiqueta: "Velikost firmy", opciones: { general: "Střední nebo velká firma", pequena: "Malá firma" } },
  },
  filas: {
    base: { etiqueta: "Mzda pro výpočet" },
    bono: { etiqueta: "Prémie" },
    bonificacion: { etiqueta: "Příplatek" },
    total: { etiqueta: "Celkem k výplatě" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "Počet měsíců je od 1 do 6.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "Vaše mzda je nižší než minimální mzda ve vašem kraji, proto se prémie počítá z minimální mzdy.",
  },
});
