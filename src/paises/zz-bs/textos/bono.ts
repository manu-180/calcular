import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-bs.bono",
  slug: "polugodisnja-nagrada",
  campos: {
    sueldo: { etiqueta: "Bruto mjesečna plata" },
    meses: { etiqueta: "Koliko ste mjeseci radili u polugodištu" },
    region: { etiqueta: "Regija u kojoj radite" },
    regimen: { etiqueta: "Veličina firme", opciones: { general: "Srednja ili velika firma", pequena: "Mala firma" } },
  },
  filas: {
    base: { etiqueta: "Plata za izračun" },
    bono: { etiqueta: "Nagrada" },
    bonificacion: { etiqueta: "Dodatak" },
    total: { etiqueta: "Ukupno za isplatu" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "Broj mjeseci je od 1 do 6.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "Vaša je plata niža od minimalne plate u vašoj regiji, pa se nagrada računa od minimalne plate.",
  },
});
