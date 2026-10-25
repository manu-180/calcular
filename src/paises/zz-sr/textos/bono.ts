import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-sr.bono",
  slug: "polugodisnji-bonus",
  campos: {
    sueldo: { etiqueta: "Bruto mesečna zarada" },
    meses: { etiqueta: "Koliko ste meseci radili u polugodištu" },
    region: { etiqueta: "Region u kojem radite" },
    regimen: { etiqueta: "Veličina firme", opciones: { general: "Srednja ili velika firma", pequena: "Mala firma" } },
  },
  filas: {
    base: { etiqueta: "Zarada za obračun" },
    bono: { etiqueta: "Bonus" },
    bonificacion: { etiqueta: "Dodatak" },
    total: { etiqueta: "Ukupno za isplatu" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "Broj meseci je od 1 do 6.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "Vaša zarada je niža od minimalne zarade u vašem regionu, pa se bonus računa od minimalne zarade.",
  },
});
