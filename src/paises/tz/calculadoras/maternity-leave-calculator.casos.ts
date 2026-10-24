import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-leave-calculator";

export default definirCasos(calculadora, [
  {
    "nombre": "Maternity leave from 1 November 2026",
    "origen": {
      "tipo": "recalculado",
      "url": "https://commons.laws.africa/akn/tz/act/2004/6/media/publication/tz-act-2004-6-publication-document.pdf",
      "detalle": "84 days: 1 November 2026 to 23 January 2027."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "tipo": "maternity",
      "inicio": "2026-11-01"
    },
    "esperado": {
      "ultimo": "2027-01-23",
      "dias": 84,
      "regreso": "2027-01-24"
    }
  },
  {
    "nombre": "Twins",
    "origen": {
      "tipo": "recalculado",
      "detalle": "100 days from 1 November 2026: to 8 February 2027."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "tipo": "multiple",
      "inicio": "2026-11-01"
    },
    "esperado": {
      "ultimo": "2027-02-08",
      "dias": 100
    }
  },
  {
    "nombre": "Paternity leave",
    "origen": {
      "tipo": "recalculado",
      "detalle": "3 days from 19 October 2026: to 21 October."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "tipo": "paternity",
      "inicio": "2026-10-19"
    },
    "esperado": {
      "ultimo": "2026-10-21",
      "dias": 3
    }
  },
]);
