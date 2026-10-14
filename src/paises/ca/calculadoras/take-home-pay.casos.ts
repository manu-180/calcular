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
  }
]);
