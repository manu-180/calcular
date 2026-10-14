import { definirCasos } from "@/motor/calculo";
import calculadora from "./land-transfer-tax";

export default definirCasos(calculadora, [
  {
    "nombre": "Ontario, $700,000",
    "origen": {
      "tipo": "recalculado",
      "detalle": "275 + 1,950 + 2,250 + 6,000 = 10,475."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "lugar": "on",
      "precio": 700000,
      "primeraVez": false
    },
    "esperado": {
      "total": 10475
    }
  },
  {
    "nombre": "Toronto, $700,000, first-time buyer",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Ontario 10,475 − 4,000; Toronto 10,475 − 4,475; total 12,475."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "lugar": "toronto",
      "precio": 700000,
      "primeraVez": true
    },
    "esperado": {
      "total": 12475,
      "municipal": 10475,
      "rebaja": 8475
    }
  },
  {
    "nombre": "BC scenario 1, $650,000",
    "origen": {
      "tipo": "oficial",
      "url": "https://www2.gov.bc.ca/gov/content/taxes/property-taxes/property-transfer-tax/calculation-examples",
      "detalle": "Official example: $2,000 + $9,000 = $11,000."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "lugar": "bc",
      "precio": 650000,
      "primeraVez": false
    },
    "esperado": {
      "total": 11000
    }
  },
  {
    "nombre": "BC further 2%, $4,500,000",
    "origen": {
      "tipo": "oficial",
      "url": "https://www2.gov.bc.ca/gov/content/taxes/property-taxes/property-transfer-tax/calculation-examples",
      "detalle": "Official example: general tax $113,000 plus further 2% of $1,500,000 = $30,000."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "lugar": "bc",
      "precio": 4500000,
      "primeraVez": false
    },
    "esperado": {
      "total": 143000
    }
  },
  {
    "nombre": "Toronto, $5,000,000",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Ontario: 275 + 1,950 + 2,250 + 32,000 + 75,000 = 111,475. Toronto: 36,475 up to 2M + 25,000 + 44,000 + 54,500 = 159,975."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "lugar": "toronto",
      "precio": 5000000,
      "primeraVez": false
    },
    "esperado": {
      "provincial": 111475,
      "municipal": 159975
    }
  }
]);
