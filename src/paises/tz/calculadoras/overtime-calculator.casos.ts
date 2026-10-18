import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-calculator";

export default definirCasos(calculadora, [
  {
    "nombre": "10 overtime hours at TSh 3,000 an hour",
    "origen": {
      "tipo": "recalculado",
      "url": "https://commons.laws.africa/akn/tz/act/2004/6/media/publication/tz-act-2004-6-publication-document.pdf",
      "detalle": "3,000 × 1.5 × 10 = 45,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "hora": 3000,
      "horas": 10,
      "nocturnas": 0
    },
    "esperado": {
      "total": 45000,
      "tarifa": 4500
    }
  },
  {
    "nombre": "4 of them at night",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Night premium 5% of 4,500 = 225 × 4 = 900. Total 45,900."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "hora": 3000,
      "horas": 10,
      "nocturnas": 4
    },
    "esperado": {
      "total": 45900,
      "nocturno": 900
    }
  },
  {
    "nombre": "More night hours than overtime hours",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Not possible."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "hora": 3000,
      "horas": 2,
      "nocturnas": 3
    },
    "esperaError": true
  },
]);
