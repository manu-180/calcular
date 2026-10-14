import { definirCasos } from "@/motor/calculo";
import calculadora from "./tfsa-contribution-room";

export default definirCasos(calculadora, [
  {
    "nombre": "Eligible since 2009, no contributions",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Sum of the CRA dollar limits 2009 to 2026 = 109,000."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "desde": 2009,
      "aportes": 0,
      "retiros": 0
    },
    "esperado": {
      "espacio": 109000,
      "anios": 18
    }
  },
  {
    "nombre": "Eligible since 2020 with contributions and withdrawals",
    "origen": {
      "tipo": "recalculado",
      "detalle": "2020 to 2022: 3 × 6,000; 2023: 6,500; 2024 to 2026: 3 × 7,000 → 45,500. + 5,000 − 20,000 = 30,500."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "desde": 2020,
      "aportes": 20000,
      "retiros": 5000
    },
    "esperado": {
      "espacio": 30500,
      "acumulado": 45500
    }
  },
  {
    "nombre": "Turned 18 before 2009",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Room only starts in 2009."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "desde": 1990,
      "aportes": 0,
      "retiros": 0
    },
    "esperado": {
      "espacio": 109000
    }
  }
]);
