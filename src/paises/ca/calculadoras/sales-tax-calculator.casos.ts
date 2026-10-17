import { definirCasos } from "@/motor/calculo";
import calculadora from "./sales-tax-calculator";

export default definirCasos(calculadora, [
  {
    "nombre": "Ontario HST on $100",
    "origen": {
      "tipo": "oficial",
      "url": "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate/calculator.html",
      "detalle": "CRA table: Ontario GST and HST 13%, PST N/A. 100 × 13% = 13."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "region": "on",
      "operacion": "agregar",
      "monto": 100
    },
    "esperado": {
      "total": 113,
      "impuestoFederal": 13,
      "impuestoProvincial": 0
    }
  },
  {
    "nombre": "Quebec GST and QST on $100",
    "origen": {
      "tipo": "recalculado",
      "detalle": "5% GST = 5; 9.975% QST = 9.975 → 9.98; total 114.98."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "region": "qc",
      "operacion": "agregar",
      "monto": 100
    },
    "esperado": {
      "total": 114.98,
      "impuestoFederal": 5,
      "impuestoProvincial": 9.98,
      "tasaTotal": 14.975
    }
  },
  {
    "nombre": "Take tax out of $112 in BC",
    "origen": {
      "tipo": "recalculado",
      "detalle": "112 / 1.12 = 100; GST 5, PST 7."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "region": "bc",
      "operacion": "quitar",
      "monto": 112
    },
    "esperado": {
      "antes": 100,
      "impuestoFederal": 5,
      "impuestoProvincial": 7
    }
  },
  {
    "nombre": "Nova Scotia HST 14%",
    "origen": {
      "tipo": "recalculado",
      "detalle": "HST 14% since April 1, 2025: 200 × 14% = 28."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "region": "ns",
      "operacion": "agregar",
      "monto": 200
    },
    "esperado": {
      "total": 228
    }
  },
  {
    "nombre": "Alberta GST only",
    "origen": {
      "tipo": "recalculado",
      "detalle": "5% GST, no PST: 100 → 105."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "region": "ab",
      "operacion": "agregar",
      "monto": 100
    },
    "esperado": {
      "total": 105,
      "impuestoProvincial": 0
    }
  },
  {
    "nombre": "Zero amount",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Amount must be above zero."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "region": "on",
      "operacion": "agregar",
      "monto": 0
    },
    "esperaError": true
  }
]);
