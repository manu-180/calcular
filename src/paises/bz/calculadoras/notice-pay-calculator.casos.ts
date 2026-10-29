import { definirCasos } from "@/motor/calculo";
import noticePayCalculator from "./notice-pay-calculator";

export default definirCasos(noticePayCalculator, [
  {
    "nombre": "Employer gives no notice after more than five years",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.ruraltransformation.gov.bz/docs/39/Labour_Act.pdf",
      "detalle": "8 weeks x 461.54 = 3,692.31."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "sueldo": 2000,
      "inicio": "2020-03-02",
      "fin": "2026-10-29",
      "quien": "empleador"
    },
    "esperado": {
      "semanas": 8,
      "pago": 3692.31,
      "salarioSemana": 461.54
    }
  },
  {
    "nombre": "Worker leaves without notice",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.ruraltransformation.gov.bz/docs/39/Labour_Act.pdf",
      "detalle": "Half of 3,692.31 = 1,846.15."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "sueldo": 2000,
      "inicio": "2020-03-02",
      "fin": "2026-10-29",
      "quien": "trabajador"
    },
    "esperado": {
      "semanas": 8,
      "pago": 1846.15
    }
  },
  {
    "nombre": "Between six months and two years",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.ruraltransformation.gov.bz/docs/39/Labour_Act.pdf",
      "detalle": "Service from 6 Jan 2025 to 29 Oct 2026 is under two years: 2 weeks = 923.08."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "sueldo": 2000,
      "inicio": "2025-01-06",
      "fin": "2026-10-29",
      "quien": "empleador"
    },
    "esperado": {
      "semanas": 2,
      "pago": 923.08
    }
  },
  {
    "nombre": "Under two weeks of service",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.ruraltransformation.gov.bz/docs/39/Labour_Act.pdf",
      "detalle": "Nine days: no notice is due."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "sueldo": 2000,
      "inicio": "2026-10-20",
      "fin": "2026-10-29",
      "quien": "empleador"
    },
    "esperado": {
      "semanas": 0,
      "pago": 0
    }
  }
]);
