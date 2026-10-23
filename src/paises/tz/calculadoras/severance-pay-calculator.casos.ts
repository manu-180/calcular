import { definirCasos } from "@/motor/calculo";
import calculadora from "./severance-pay-calculator";

export default definirCasos(calculadora, [
  {
    "nombre": "Five years at TSh 40,000 a day",
    "origen": {
      "tipo": "recalculado",
      "url": "https://commons.laws.africa/akn/tz/act/2004/6/media/publication/tz-act-2004-6-publication-document.pdf",
      "detalle": "40,000 × 7 × 5 = 1,400,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "diario": 40000,
      "anios": 5,
      "motivo": "employer"
    },
    "esperado": {
      "severance": 1400000,
      "contados": 5
    }
  },
  {
    "nombre": "Fifteen years counts ten",
    "origen": {
      "tipo": "recalculado",
      "detalle": "40,000 × 7 × 10 = 2,800,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "diario": 40000,
      "anios": 15,
      "motivo": "employer"
    },
    "esperado": {
      "severance": 2800000,
      "contados": 10
    }
  },
  {
    "nombre": "Dismissed for misconduct",
    "origen": {
      "tipo": "recalculado",
      "detalle": "No severance."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "diario": 40000,
      "anios": 5,
      "motivo": "misconduct"
    },
    "esperado": {
      "severance": 0
    }
  },
]);
