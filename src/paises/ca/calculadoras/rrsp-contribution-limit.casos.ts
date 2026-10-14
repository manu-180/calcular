import { definirCasos } from "@/motor/calculo";
import calculadora from "./rrsp-contribution-limit";

export default definirCasos(calculadora, [
  {
    "nombre": "$80,000 of income and $5,000 unused",
    "origen": {
      "tipo": "recalculado",
      "detalle": "18% × 80,000 = 14,400 < 33,810; + 5,000 = 19,400."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "ingreso": 80000,
      "pa": 0,
      "noUsado": 5000,
      "aportado": 0
    },
    "esperado": {
      "total": 19400,
      "nuevo": 14400
    }
  },
  {
    "nombre": "High income capped, with a pension adjustment",
    "origen": {
      "tipo": "recalculado",
      "detalle": "18% × 250,000 = 45,000, capped at 33,810, less PA 3,000 = 30,810."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "ingreso": 250000,
      "pa": 3000,
      "noUsado": 0,
      "aportado": 0
    },
    "esperado": {
      "total": 30810,
      "limite": 33810
    }
  },
  {
    "nombre": "2027 dollar limit",
    "origen": {
      "tipo": "recalculado",
      "detalle": "CRA: 2027 RRSP dollar limit 35,390. 18% × 250,000 capped at 35,390."
    },
    "fecha": "2027-02-01",
    "entrada": {
      "ingreso": 250000,
      "pa": 0,
      "noUsado": 0,
      "aportado": 0
    },
    "esperado": {
      "total": 35390
    }
  }
]);
