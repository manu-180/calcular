import { definirCasos } from "@/motor/calculo";
import calculadora from "./presumptive-tax-calculator";

export default definirCasos(calculadora, [
  {
    "nombre": "TSh 6 million with complete records",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.tra.go.tz/page/income-tax-for-individuals",
      "detalle": "3% × (6,000,000 − 4,000,000) = 60,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "ventas": 6000000,
      "registros": true
    },
    "esperado": {
      "anual": 60000
    }
  },
  {
    "nombre": "TSh 6 million with incomplete records",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Fixed TSh 100,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "ventas": 6000000,
      "registros": false
    },
    "esperado": {
      "anual": 100000
    }
  },
  {
    "nombre": "TSh 9 million with complete records",
    "origen": {
      "tipo": "recalculado",
      "detalle": "90,000 + 3% × 2,000,000 = 150,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "ventas": 9000000,
      "registros": true
    },
    "esperado": {
      "anual": 150000
    }
  },
  {
    "nombre": "TSh 9 million with incomplete records",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Fixed TSh 250,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "ventas": 9000000,
      "registros": false
    },
    "esperado": {
      "anual": 250000
    }
  },
  {
    "nombre": "TSh 50 million",
    "origen": {
      "tipo": "recalculado",
      "detalle": "4% × 50,000,000 = 2,000,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "ventas": 50000000,
      "registros": true
    },
    "esperado": {
      "anual": 2000000
    }
  },
  {
    "nombre": "TSh 3 million",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Below TSh 4 million: nil."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "ventas": 3000000,
      "registros": false
    },
    "esperado": {
      "anual": 0
    }
  },
  {
    "nombre": "Above TSh 200 million",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Outside the presumptive regime."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "ventas": 250000000,
      "registros": true
    },
    "esperaError": true
  },
]);
