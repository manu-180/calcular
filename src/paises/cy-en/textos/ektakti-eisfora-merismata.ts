import { definirTextos } from "@/motor/edicion";
import base from "../../cy/calculadoras/ektakti-eisfora-merismata";
import { MENSAJES } from "../lib/comun";

export default definirTextos(base, {
  calculadora: "cy-en.ektakti-eisfora-merismata",
  slug: "dividend-tax-calculator",
  campos: {
    merisma: { etiqueta: "Dividend" },
    kerdi: {
      etiqueta: "Paid out of profits from",
      opciones: { merismata: "2026 or later", "merismata-palaia": "2025 or earlier" },
      ayuda: "For dividends from profits up to 2025, the old rate applies to those paid within six years of the reform.",
    },
  },
  filas: {
    kathara: { etiqueta: "Net dividend" },
    amyna: { etiqueta: "Special Defence Contribution" },
    gesy: { etiqueta: "GeSY contribution" },
    syntelestis: { etiqueta: "Defence contribution rate" },
  },
  mensajes: MENSAJES,
});
