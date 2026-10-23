import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave-calculator";

export default definirCasos(calculadora, [
  {
    "nombre": "Full cycle with 10 days taken",
    "origen": {
      "tipo": "recalculado",
      "url": "https://commons.laws.africa/akn/tz/act/2004/6/media/publication/tz-act-2004-6-publication-document.pdf",
      "detalle": "28 − 10 = 18 days."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "meses": 12,
      "tomados": 10
    },
    "esperado": {
      "pendientes": 18,
      "ganados": 28
    }
  },
  {
    "nombre": "Six months",
    "origen": {
      "tipo": "recalculado",
      "detalle": "28 × 6 / 12 = 14 days."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "meses": 6,
      "tomados": 0
    },
    "esperado": {
      "pendientes": 14
    }
  },
]);
