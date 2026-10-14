import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

export default definirCasos(calculadora, [
  {
    "nombre": "$1,000 from January 2020 to August 2026",
    "origen": {
      "tipo": "recalculado",
      "detalle": "CPI 136.8 and 169.8 (StatCan v41690973). 1,000 × 169.8 / 136.8 = 1,241.23."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "importe": 1000,
      "desde": "2020-01-01",
      "hasta": "2026-08-01"
    },
    "esperado": {
      "actualizado": 1241.23,
      "indiceInicial": 136.8,
      "indiceFinal": 169.8
    }
  },
  {
    "nombre": "End month not published yet",
    "origen": {
      "tipo": "recalculado",
      "detalle": "On 2026-10-14 the latest CPI is August 2026."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "importe": 100,
      "desde": "2025-08-01",
      "hasta": "2026-12-01"
    },
    "esperado": {
      "mesFinal": "August 2026"
    }
  },
  {
    "nombre": "Start before 2000",
    "origen": {
      "tipo": "recalculado",
      "detalle": "The series starts in January 2000."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "importe": 100,
      "desde": "1999-12-01",
      "hasta": "2026-01-01"
    },
    "esperaError": true
  }
]);
