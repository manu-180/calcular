import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-et.bono",
  slug: "poolaasta-preemia",
  campos: {
    sueldo: { etiqueta: "Brutokuupalk" },
    meses: { etiqueta: "Töötatud kuude arv poolaastas" },
    region: { etiqueta: "Piirkond, kus töötad" },
    regimen: { etiqueta: "Ettevõtte suurus", opciones: { general: "Keskmine või suur ettevõte", pequena: "Väike ettevõte" } },
  },
  filas: {
    base: { etiqueta: "Arvutuses kasutatud palk" },
    bono: { etiqueta: "Preemia" },
    bonificacion: { etiqueta: "Lisatasu" },
    total: { etiqueta: "Saad kokku" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "Kuude arv on 1 kuni 6.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "Sinu palk on väiksem kui sinu piirkonna miinimumpalk, seega arvutatakse preemia miinimumpalga järgi.",
  },
});
