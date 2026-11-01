import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-fi.bono",
  slug: "puolivuotisbonus",
  campos: {
    sueldo: { etiqueta: "Bruttokuukausipalkka" },
    meses: { etiqueta: "Työkuukaudet puolivuotiskaudella" },
    region: { etiqueta: "Vyöhyke, jolla työskentelet" },
    regimen: { etiqueta: "Yrityksen koko", opciones: { general: "Keskisuuri tai suuri yritys", pequena: "Pieni yritys" } },
  },
  filas: {
    base: { etiqueta: "Laskennassa käytetty palkka" },
    bono: { etiqueta: "Bonus" },
    bonificacion: { etiqueta: "Lisä" },
    total: { etiqueta: "Saat yhteensä" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "Kuukausia voi olla vähintään 1 ja enintään 6.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "Palkkasi on vyöhykkeesi vähimmäispalkkaa pienempi, joten bonus lasketaan vähimmäispalkan mukaan.",
  },
});
