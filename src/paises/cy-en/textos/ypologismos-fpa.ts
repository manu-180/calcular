import { definirTextos } from "@/motor/edicion";
import base from "../../cy/calculadoras/ypologismos-fpa";
import { MENSAJES } from "../lib/comun";

export default definirTextos(base, {
  calculadora: "cy-en.ypologismos-fpa",
  slug: "cyprus-vat-calculator",
  campos: {
    poso: { etiqueta: "Amount" },
    syntelestis: { etiqueta: "VAT rate" },
    kateuthynsi: { etiqueta: "The amount is", opciones: { xoris: "Before VAT (add VAT)", me: "Including VAT (remove VAT)" } },
  },
  filas: {
    synolo: { etiqueta: "Price including VAT" },
    kathari: { etiqueta: "Net value before VAT" },
    fpa: { etiqueta: "VAT" },
    syntelestis: { etiqueta: "Rate" },
  },
  mensajes: MENSAJES,
});
