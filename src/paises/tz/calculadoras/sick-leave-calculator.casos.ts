import { definirCasos } from "@/motor/calculo";
import calculadora from "./sick-leave-calculator";

export default definirCasos(calculadora, [
  {
    "nombre": "70 sick days",
    "origen": {
      "tipo": "recalculado",
      "url": "https://commons.laws.africa/akn/tz/act/2004/6/media/publication/tz-act-2004-6-publication-document.pdf",
      "detalle": "63 on full wages, 7 on half wages. 63 × 20,000 + 7 × 10,000 = 1,330,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "dias": 70,
      "diario": 20000
    },
    "esperado": {
      "completos": 63,
      "medios": 7,
      "sinPaga": 0,
      "paga": 1330000
    }
  },
  {
    "nombre": "130 sick days",
    "origen": {
      "tipo": "recalculado",
      "detalle": "63 full, 63 half, 4 without pay."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "dias": 130,
      "diario": null
    },
    "esperado": {
      "completos": 63,
      "medios": 63,
      "sinPaga": 4,
      "paga": null
    }
  },
]);
