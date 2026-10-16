import { definirTextos } from "@/motor/edicion";
import oas from "../../ca/calculadoras/oas-clawback";
import { MENSAJES_COMUNES } from "../lib/comun";

export default definirTextos(oas, {
  calculadora: "ca-fr.oas-clawback",
  slug: "recuperation-securite-vieillesse",
  campos: {
    anio: {
      etiqueta: "Année de revenu",
      opciones: {
        "2026": "2026 (remboursé de juillet 2027 à juin 2028)",
        "2025": "2025 (remboursé de juillet 2026 à juin 2027)",
        "2024": "2024 (remboursé de juillet 2025 à juin 2026)",
      },
    },
    ingreso: { etiqueta: "Revenu net mondial de l'année" },
    oas: { etiqueta: "Pension de la Sécurité de la vieillesse reçue dans l'année" },
  },
  filas: {
    repago: { etiqueta: "Impôt de récupération de la pension de la SV" },
    mensual: { etiqueta: "Environ par mois pendant la période de récupération" },
    conservas: { etiqueta: "Pension de la SV que vous gardez" },
    umbral: { etiqueta: "Seuil de revenu pour cette année" },
    exceso: { etiqueta: "Revenu au-delà du seuil" },
  },
  mensajes: {
    ...MENSAJES_COMUNES,
    "Your income is high enough that the whole pension is repaid.": "Votre revenu est assez élevé pour que toute la pension soit remboursée.",
  },
});
