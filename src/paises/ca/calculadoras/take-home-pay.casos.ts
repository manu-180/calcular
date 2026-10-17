import { definirCasos } from "@/motor/calculo";
import calculadora from "./take-home-pay";

export default definirCasos(calculadora, [
  {
    "nombre": "Ontario, $70,000, every two weeks",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Salary 70,000 − federal 7,278.19 − Ontario 3,855.73 − CPP 3,956.75 − EI 1,123.07 = 53,786.26; ÷ 26 = 2,068.70."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "salario": 70000,
      "provincia": "on",
      "periodo": "biweekly",
      "pension": 0
    },
    "esperado": {
      "anual": 53786.26,
      "porPago": 2068.7,
      "cpp": 3956.75,
      "ei": 1123.07,
      "cpp2": 0
    },
    "tolerancia": 0.011
  },
  {
    "nombre": "BC, $100,000 with 5% pension, monthly",
    "origen": {
      "tipo": "recalculado",
      "detalle": "CPP max 4,230.45, CPP2 (85,000 − 74,600) × 4% = 416, EI 1,123.07, pension 5,000. Take-home 100,000 − 12,276.60 − 5,170.52 − 4,230.45 − 416 − 1,123.07 − 5,000 = 71,783.36."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "salario": 100000,
      "provincia": "bc",
      "periodo": "monthly",
      "pension": 5
    },
    "esperado": {
      "anual": 71783.36,
      "cpp2": 416,
      "aportePension": 5000,
      "porPago": 5981.95
    },
    "tolerancia": 0.011
  },
  {
    "nombre": "Alberta, $50,000",
    "origen": {
      "tipo": "recalculado",
      "detalle": "CPP 46,500 × 5.95% = 2,766.75, EI 815. Take-home 40,541.17."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "salario": 50000,
      "provincia": "ab",
      "periodo": "biweekly",
      "pension": 0
    },
    "esperado": {
      "anual": 40541.17,
      "cpp": 2766.75,
      "ei": 815
    },
    "tolerancia": 0.011
  },
  {
    "nombre": "Quebec, $70,000",
    "origen": {
      "tipo": "recalculado",
      "detalle": "QPP (66,500 × 5.3%) 3,524.50 + 665 = 4,189.50; EI 68,900 × 1.30% = 895.70; QPIP 70,000 × 0.43% = 301. Federal: taxable 69,335; 10,409.68 - 14% × (16,452 + 1,501 + 3,524.50 + 895.70 + 301) = 7,235.29, less the 16.5% Quebec abatement = 6,041.47. Quebec: taxable 69,335 - 1,450 (workers) = 67,885; 10,180.90 - 14% × 18,952 = 7,527.62. Take-home 51,044.71."
    },
    "fecha": "2026-10-16",
    "entrada": {
      "salario": 70000,
      "provincia": "qc",
      "periodo": "biweekly",
      "pension": 0
    },
    "esperado": {
      "anual": 51044.71,
      "federal": 6041.47,
      "provincial": 7527.62,
      "cpp": 4189.5,
      "ei": 895.7,
      "qpip": 301
    },
    "tolerancia": 0.011
  }
]);
