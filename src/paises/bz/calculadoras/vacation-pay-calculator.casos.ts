import { definirCasos } from "@/motor/calculo";
import vacationPayCalculator from "./vacation-pay-calculator";

export default definirCasos(vacationPayCalculator, [
  {
    "nombre": "Full year at BZ$2,000 a month",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.ruraltransformation.gov.bz/docs/39/Labour_Act.pdf",
      "detalle": "Total remuneration 24,000 / 26 = 923.08, which is two weeks of 461.54."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "sueldo": 2000,
      "meses": 12,
      "situacion": "vacaciones"
    },
    "esperado": {
      "pago": 923.08,
      "semanas": 2,
      "semanal": 461.54,
      "remuneracion": 24000
    }
  },
  {
    "nombre": "Job ends after six months",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.ruraltransformation.gov.bz/docs/39/Labour_Act.pdf",
      "detalle": "12,000 / 26 = 461.54."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "sueldo": 2000,
      "meses": 6,
      "situacion": "salida"
    },
    "esperado": {
      "pago": 461.54
    }
  },
  {
    "nombre": "Job ends after two months",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.ruraltransformation.gov.bz/docs/39/Labour_Act.pdf",
      "detalle": "Holiday pay on leaving needs three months."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "sueldo": 2000,
      "meses": 2,
      "situacion": "salida"
    },
    "esperado": {
      "pago": 0
    }
  },
  {
    "nombre": "Holiday before a full year",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.ruraltransformation.gov.bz/docs/39/Labour_Act.pdf",
      "detalle": "An annual holiday is earned after a full year."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "sueldo": 2000,
      "meses": 6,
      "situacion": "vacaciones"
    },
    "esperaError": true
  }
]);
