import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

export default definirCasos(calculadora, [
  {
    "nombre": "Ontario after October 1, 2026",
    "origen": {
      "tipo": "recalculado",
      "detalle": "17.95 × 40 = 718; × 52 = 37,336."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "region": "on",
      "federal": false,
      "horas": 40
    },
    "esperado": {
      "hora": 17.95,
      "semanal": 718,
      "anual": 37336
    }
  },
  {
    "nombre": "Federal job in Alberta",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Federal 18.15 is higher than Alberta 15.00."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "region": "ab",
      "federal": true,
      "horas": 40
    },
    "esperado": {
      "hora": 18.15,
      "provincial": 15
    }
  },
  {
    "nombre": "Nova Scotia on October 1, 2026",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Rate goes from 16.75 to 17.00 on October 1, 2026."
    },
    "fecha": "2026-10-01",
    "entrada": {
      "region": "ns",
      "federal": false,
      "horas": 40
    },
    "esperado": {
      "hora": 17
    }
  },
  {
    "nombre": "Federal job in BC",
    "origen": {
      "tipo": "recalculado",
      "detalle": "BC 18.25 is higher than the federal 18.15, so BC applies."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "region": "bc",
      "federal": true,
      "horas": 35
    },
    "esperado": {
      "hora": 18.25,
      "semanal": 638.75
    }
  }
]);
