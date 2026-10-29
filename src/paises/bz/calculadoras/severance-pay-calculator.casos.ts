import { definirCasos } from "@/motor/calculo";
import severancePayCalculator from "./severance-pay-calculator";

export default definirCasos(severancePayCalculator, [
  {
    "nombre": "Eleven years, employer ends the job",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.ruraltransformation.gov.bz/docs/39/Labour_Act.pdf",
      "detalle": "11 complete years x 2 weeks = 22 weeks x 461.54 = 10,153.85."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "sueldo": 2000,
      "inicio": "2015-02-02",
      "fin": "2026-10-29",
      "motivo": "empleador"
    },
    "esperado": {
      "total": 10153.85,
      "anios": 11,
      "semanas": 22
    }
  },
  {
    "nombre": "Seven years",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.ruraltransformation.gov.bz/docs/39/Labour_Act.pdf",
      "detalle": "7 x 1 week = 7 weeks x 461.54 = 3,230.77."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "sueldo": 2000,
      "inicio": "2019-03-01",
      "fin": "2026-10-29",
      "motivo": "empleador"
    },
    "esperado": {
      "total": 3230.77,
      "anios": 7,
      "semanas": 7
    }
  },
  {
    "nombre": "Service that began before May 2011",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.ruraltransformation.gov.bz/docs/39/Labour_Act.pdf",
      "detalle": "21 years: 6 complete years before 1 May 2011 at 1 week, 15 after at 2 weeks = 36 weeks x 461.54 = 16,615.38."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "sueldo": 2000,
      "inicio": "2005-01-10",
      "fin": "2026-10-29",
      "motivo": "empleador"
    },
    "esperado": {
      "total": 16615.38,
      "anios": 21,
      "semanas": 36
    }
  },
  {
    "nombre": "Under five years",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.ruraltransformation.gov.bz/docs/39/Labour_Act.pdf",
      "detalle": "Severance pay starts at five years."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "sueldo": 2000,
      "inicio": "2023-01-09",
      "fin": "2026-10-29",
      "motivo": "empleador"
    },
    "esperado": {
      "total": 0,
      "anios": 3
    }
  },
  {
    "nombre": "Resignation after seven years",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.ruraltransformation.gov.bz/docs/39/Labour_Act.pdf",
      "detalle": "Gratuity on resignation needs ten years."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "sueldo": 2000,
      "inicio": "2019-03-01",
      "fin": "2026-10-29",
      "motivo": "renuncia"
    },
    "esperado": {
      "total": 0
    }
  }
]);
