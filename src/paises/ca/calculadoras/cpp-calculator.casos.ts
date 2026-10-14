import { definirCasos } from "@/motor/calculo";
import calculadora from "./cpp-calculator";

export default definirCasos(calculadora, [
  {
    "nombre": "Employee at the 2026 maximum",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Base 71,100 × 4.95% = 3,519.45; first additional 71,100 × 1% = 711; CPP2 10,400 × 4% = 416. Matches the T4127 maximums."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "ingreso": 90000,
      "situacion": "employee",
      "plan": "cpp"
    },
    "esperado": {
      "total": 4646.45,
      "base": 3519.45,
      "primera": 711,
      "segunda": 416,
      "empleador": 4646.45,
      "deducible": 1127
    }
  },
  {
    "nombre": "Self-employed, $50,000",
    "origen": {
      "tipo": "recalculado",
      "detalle": "(50,000 − 3,500) × 9.9% = 4,603.50 base; × 2% = 930 first additional; total 5,533.50."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "ingreso": 50000,
      "situacion": "self-employed",
      "plan": "cpp"
    },
    "esperado": {
      "total": 5533.5,
      "base": 4603.5,
      "primera": 930,
      "empleador": 0
    }
  },
  {
    "nombre": "QPP employee at the maximum",
    "origen": {
      "tipo": "recalculado",
      "detalle": "QPP base 71,100 × 5.3% = 3,768.30 (T4127 maximum), first additional 711, QPP2 416."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "ingreso": 90000,
      "situacion": "employee",
      "plan": "qpp"
    },
    "esperado": {
      "total": 4895.3,
      "base": 3768.3
    }
  },
  {
    "nombre": "Below the basic exemption",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Earnings of 3,000 are under the 3,500 exemption."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "ingreso": 3000,
      "situacion": "employee",
      "plan": "cpp"
    },
    "esperado": {
      "total": 0
    }
  }
]);
