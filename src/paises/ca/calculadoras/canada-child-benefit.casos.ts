import { definirCasos } from "@/motor/calculo";
import calculadora from "./canada-child-benefit";

export default definirCasos(calculadora, [
  {
    "nombre": "Martha: one child under 6, $45,000",
    "origen": {
      "tipo": "oficial",
      "url": "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit/how-much.html",
      "detalle": "CRA example: $8,157 − $473.41 = $7,683.59 for July 2026 to June 2027."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "menores6": 1,
      "de6a17": 0,
      "ingreso": 45000,
      "compartida": false
    },
    "esperado": {
      "anual": 7683.59,
      "reduccion": 473.41
    }
  },
  {
    "nombre": "Martha: one child under 6, $100,000",
    "origen": {
      "tipo": "oficial",
      "url": "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit/how-much.html",
      "detalle": "CRA example: $3,123 + 3.2% × $17,153 = $3,671.89; payment $4,485.11."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "menores6": 1,
      "de6a17": 0,
      "ingreso": 100000,
      "compartida": false
    },
    "esperado": {
      "anual": 4485.11
    }
  },
  {
    "nombre": "Fatima: two children under 6, $60,000",
    "origen": {
      "tipo": "oficial",
      "url": "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit/how-much.html",
      "detalle": "CRA example: $16,314 − $2,938 = $13,376."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "menores6": 2,
      "de6a17": 0,
      "ingreso": 60000,
      "compartida": false
    },
    "esperado": {
      "anual": 13376
    }
  },
  {
    "nombre": "Fatima: two children under 6, $125,000",
    "origen": {
      "tipo": "oficial",
      "url": "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit/how-much.html",
      "detalle": "CRA example: $6,022 + 5.7% × $42,153 = $8,424.72; payment $7,889.28."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "menores6": 2,
      "de6a17": 0,
      "ingreso": 125000,
      "compartida": false
    },
    "esperado": {
      "anual": 7889.28
    }
  },
  {
    "nombre": "Julie: three children over 6, $50,000",
    "origen": {
      "tipo": "oficial",
      "url": "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit/how-much.html",
      "detalle": "CRA example: $20,649 − $2,234.97 = $18,414.03."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "menores6": 0,
      "de6a17": 3,
      "ingreso": 50000,
      "compartida": false
    },
    "esperado": {
      "anual": 18414.03
    }
  },
  {
    "nombre": "Kira: four children over 6, $200,000",
    "origen": {
      "tipo": "oficial",
      "url": "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit/how-much.html",
      "detalle": "CRA example: $10,260 + 9.5% × $117,153 = $21,389.53; payment $6,142.47 (the CRA truncates the reduction to the cent)."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "menores6": 0,
      "de6a17": 4,
      "ingreso": 200000,
      "compartida": false
    },
    "esperado": {
      "anual": 6142.47
    }
  },
  {
    "nombre": "Shared custody halves the amount",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Half of 7,683.59 = 3,841.795, truncated to the cent like the CRA examples: 3,841.79."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "menores6": 1,
      "de6a17": 0,
      "ingreso": 45000,
      "compartida": true
    },
    "esperado": {
      "anual": 3841.79
    }
  },
  {
    "nombre": "No children",
    "origen": {
      "tipo": "recalculado",
      "detalle": "At least one child is needed."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "menores6": 0,
      "de6a17": 0,
      "ingreso": 45000,
      "compartida": false
    },
    "esperaError": true
  }
]);
