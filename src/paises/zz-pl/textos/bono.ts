import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-pl.bono",
  slug: "premia-polroczna",
  campos: {
    sueldo: { etiqueta: "Miesięczne wynagrodzenie brutto" },
    meses: { etiqueta: "Miesiące przepracowane w półroczu" },
    region: { etiqueta: "Strefa, w której pracujesz" },
    regimen: { etiqueta: "Wielkość firmy", opciones: { general: "Średnia lub duża firma", pequena: "Mała firma" } },
  },
  filas: {
    base: { etiqueta: "Wynagrodzenie użyte do obliczeń" },
    bono: { etiqueta: "Premia" },
    bonificacion: { etiqueta: "Dodatek" },
    total: { etiqueta: "Razem do wypłaty" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "Liczba miesięcy musi wynosić od 1 do 6.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "Twoje wynagrodzenie jest niższe niż minimum w twojej strefie, więc premię liczymy od minimum.",
  },
});
