import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

export default definirCasos(calculadora, [
  {
    "nombre": "Sector not specified",
    "origen": {
      "tipo": "oficial",
      "url": "https://commons.laws.africa/akn/tz/act/gn/2025/605a/media/publication/tz-act-gn-2025-605a-publication-document.pdf",
      "detalle": "Second Schedule, item 16: TSh 175,000 a month."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "sector": "other",
      "sueldo": null
    },
    "esperado": {
      "mensual": 175000,
      "diario": 6731,
      "hora": 897
    }
  },
  {
    "nombre": "Other domestic workers",
    "origen": {
      "tipo": "oficial",
      "url": "https://commons.laws.africa/akn/tz/act/gn/2025/605a/media/publication/tz-act-gn-2025-605a-publication-document.pdf",
      "detalle": "Second Schedule, item 4(d): TSh 80,000 a month."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "sector": "domestic-other",
      "sueldo": 70000
    },
    "esperado": {
      "mensual": 80000,
      "diferencia": -10000
    }
  },
  {
    "nombre": "Commercial banks",
    "origen": {
      "tipo": "oficial",
      "url": "https://commons.laws.africa/akn/tz/act/gn/2025/605a/media/publication/tz-act-gn-2025-605a-publication-document.pdf",
      "detalle": "Second Schedule, item 12(b)(i): TSh 733,000 a month."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "sector": "finance-commercial-banks",
      "sueldo": null
    },
    "esperado": {
      "mensual": 733000
    }
  },
  {
    "nombre": "Energy, international companies",
    "origen": {
      "tipo": "oficial",
      "url": "https://commons.laws.africa/akn/tz/act/gn/2025/605a/media/publication/tz-act-gn-2025-605a-publication-document.pdf",
      "detalle": "Second Schedule, item 7(a): TSh 765,900 a month."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "sector": "energy-international",
      "sueldo": null
    },
    "esperado": {
      "mensual": 765900
    }
  },
]);
