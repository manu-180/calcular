import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-payroll-cost";

export default definirCasos(calculadora, [
  {
    "nombre": "$60,000 outside Quebec",
    "origen": {
      "tipo": "recalculado",
      "detalle": "CPP 56,500 × 5.95% = 3,361.75; EI 60,000 × 2.282% = 1,369.20; total 64,730.95."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "salario": 60000,
      "lugar": "canada"
    },
    "esperado": {
      "total": 64730.95,
      "pension": 3361.75,
      "seguro": 1369.2,
      "qpip": 0
    }
  },
  {
    "nombre": "$60,000 in Quebec",
    "origen": {
      "tipo": "recalculado",
      "detalle": "QPP 56,500 × 6.3% = 3,559.50; EI 60,000 × 1.82% = 1,092; QPIP 60,000 × 0.602% = 361.20; total 65,012.70."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "salario": 60000,
      "lugar": "qc"
    },
    "esperado": {
      "total": 65012.7,
      "pension": 3559.5,
      "seguro": 1092,
      "qpip": 361.2
    }
  },
  {
    "nombre": "$100,000 with CPP2",
    "origen": {
      "tipo": "recalculado",
      "detalle": "CPP 71,100 × 5.95% = 4,230.45 + 10,400 × 4% = 416; EI 68,900 × 2.282% = 1,572.30 (T4127 employer maximum)."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "salario": 100000,
      "lugar": "canada"
    },
    "esperado": {
      "pension": 4646.45,
      "seguro": 1572.3
    }
  }
]);
