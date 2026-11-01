import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-ro.bono",
  slug: "prima-semestriala",
  campos: {
    sueldo: { etiqueta: "Salariul brut lunar" },
    meses: { etiqueta: "Câte luni din semestru ați lucrat" },
    region: { etiqueta: "Regiunea în care lucrați" },
    regimen: { etiqueta: "Mărimea companiei", opciones: { general: "Companie mijlocie sau mare", pequena: "Companie mică" } },
  },
  filas: {
    base: { etiqueta: "Salariul folosit la calcul" },
    bono: { etiqueta: "Prima" },
    bonificacion: { etiqueta: "Suplimentul" },
    total: { etiqueta: "Total de primit" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "Numărul de luni este între 1 și 6.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "Salariul dumneavoastră este sub minimul din regiune, așa că prima se calculează la salariul minim.",
  },
});
