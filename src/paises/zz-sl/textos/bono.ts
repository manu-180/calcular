import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-sl.bono",
  slug: "polletna-nagrada",
  campos: {
    sueldo: { etiqueta: "Bruto mesečna plača" },
    meses: { etiqueta: "Koliko mesecev ste delali v polletju" },
    region: { etiqueta: "Regija, v kateri delate" },
    regimen: { etiqueta: "Velikost podjetja", opciones: { general: "Srednje ali veliko podjetje", pequena: "Majhno podjetje" } },
  },
  filas: {
    base: { etiqueta: "Plača za izračun" },
    bono: { etiqueta: "Nagrada" },
    bonificacion: { etiqueta: "Dodatek" },
    total: { etiqueta: "Skupaj za izplačilo" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "Število mesecev je od 1 do 6.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "Vaša plača je nižja od minimalne plače v vaši regiji, zato se nagrada izračuna od minimalne plače.",
  },
});
