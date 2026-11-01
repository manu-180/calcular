import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-lt.bono",
  slug: "pusmecio-premija",
  campos: {
    sueldo: { etiqueta: "Mėnesinis atlyginimas „ant popieriaus“" },
    meses: { etiqueta: "Kiek pusmečio mėnesių dirbote" },
    region: { etiqueta: "Regionas, kuriame dirbate" },
    regimen: { etiqueta: "Įmonės dydis", opciones: { general: "Vidutinė arba didelė įmonė", pequena: "Maža įmonė" } },
  },
  filas: {
    base: { etiqueta: "Skaičiavimo atlyginimas" },
    bono: { etiqueta: "Premija" },
    bonificacion: { etiqueta: "Priedas" },
    total: { etiqueta: "Iš viso išmokama" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "Mėnesių skaičius turi būti nuo 1 iki 6.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "Jūsų atlyginimas mažesnis už minimalų jūsų regione, todėl premija skaičiuojama nuo minimalaus atlyginimo.",
  },
});
