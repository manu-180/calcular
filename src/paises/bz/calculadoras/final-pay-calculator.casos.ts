import { definirCasos } from "@/motor/calculo";
import finalPayCalculator from "./final-pay-calculator";

export default definirCasos(finalPayCalculator, [
  {
    "nombre": "Employer ends the job with no notice",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.ruraltransformation.gov.bz/docs/39/Labour_Act.pdf",
      "detalle": "Severance 10,153.85, notice 8 x 461.54 = 3,692.31, holiday pay 12,000 / 26 = 461.54; total 14,307.70."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "sueldo": 2000,
      "inicio": "2015-02-02",
      "fin": "2026-10-29",
      "motivo": "empleador",
      "avisoDado": false,
      "mesesSinVacaciones": 6
    },
    "esperado": {
      "total": 14307.7,
      "severance": 10153.85,
      "aviso": 3692.31,
      "vacaciones": 461.54
    }
  },
  {
    "nombre": "Retirement with notice and a full holiday year",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.ruraltransformation.gov.bz/docs/39/Labour_Act.pdf",
      "detalle": "Severance 10,153.85 and holiday pay 24,000 / 26 = 923.08."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "sueldo": 2000,
      "inicio": "2015-02-02",
      "fin": "2026-10-29",
      "motivo": "retiro",
      "avisoDado": true,
      "mesesSinVacaciones": 12
    },
    "esperado": {
      "total": 11076.93,
      "aviso": 0,
      "vacaciones": 923.08
    }
  },
  {
    "nombre": "Under three months since the last holiday",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.ruraltransformation.gov.bz/docs/39/Labour_Act.pdf",
      "detalle": "No holiday pay under three months."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "sueldo": 2000,
      "inicio": "2015-02-02",
      "fin": "2026-10-29",
      "motivo": "retiro",
      "avisoDado": true,
      "mesesSinVacaciones": 2
    },
    "esperado": {
      "vacaciones": 0
    }
  }
]);
