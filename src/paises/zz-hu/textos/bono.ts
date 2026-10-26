import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-hu.bono",
  slug: "felevi-premium",
  campos: {
    sueldo: { etiqueta: "Bruttó havi fizetés" },
    meses: { etiqueta: "Hány hónapot dolgoztál le a félévből" },
    region: { etiqueta: "Megye, ahol dolgozol" },
    regimen: { etiqueta: "A cég mérete", opciones: { general: "Közepes vagy nagy cég", pequena: "Kisvállalkozás" } },
  },
  filas: {
    base: { etiqueta: "A számítás alapja" },
    bono: { etiqueta: "Prémium" },
    bonificacion: { etiqueta: "Kiegészítés" },
    total: { etiqueta: "Összesen kifizetve" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "A hónapok száma 1 és 6 között lehet.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "A fizetésed alacsonyabb a megyéd minimálbérénél, ezért a prémiumot a minimálbérrel számoljuk.",
  },
});
