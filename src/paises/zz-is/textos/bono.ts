import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-is.bono",
  slug: "halfsarsbonus",
  campos: {
    sueldo: { etiqueta: "Heildarlaun á mánuði" },
    meses: { etiqueta: "Hversu marga mánuði þú vannst á hálfa árinu" },
    region: { etiqueta: "Svæðið þar sem þú vinnur" },
    regimen: { etiqueta: "Stærð fyrirtækis", opciones: { general: "Meðalstórt eða stórt fyrirtæki", pequena: "Lítið fyrirtæki" } },
  },
  filas: {
    base: { etiqueta: "Laun til útreiknings" },
    bono: { etiqueta: "Kaupauki" },
    bonificacion: { etiqueta: "Viðbót" },
    total: { etiqueta: "Samtals til greiðslu" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "Fjöldi mánaða er frá 1 til 6.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "Launin þín eru undir lágmarkslaunum á þínu svæði, svo kaupaukinn er reiknaður af lágmarkslaunum.",
  },
});
