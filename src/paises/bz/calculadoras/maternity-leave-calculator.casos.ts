import { definirCasos } from "@/motor/calculo";
import maternityLeaveCalculator from "./maternity-leave-calculator";

export default definirCasos(maternityLeaveCalculator, [
  {
    "nombre": "Four weeks before a 10 December 2026 due date",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.ruraltransformation.gov.bz/docs/39/Labour_Act.pdf",
      "detalle": "Start 10 Dec - 28 days = 12 Nov 2026. After: 14 - 4 = 10 weeks, last day 10 Dec + 69 days = 17 Feb 2027. Full pay 461.54 x 14 = 6,461.54."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "parto": "2026-12-10",
      "antes": 4,
      "sueldo": 2000,
      "servicio": 250
    },
    "esperado": {
      "inicio": "2026-11-12",
      "ultimo": "2027-02-17",
      "regreso": "2027-02-18",
      "semanasDespues": 10,
      "pago": 6461.54
    }
  },
  {
    "nombre": "Seven weeks before",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.ruraltransformation.gov.bz/docs/39/Labour_Act.pdf",
      "detalle": "Start 22 Oct 2026; 7 weeks after, last day 27 Jan 2027."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "parto": "2026-12-10",
      "antes": 7,
      "sueldo": 2000,
      "servicio": 250
    },
    "esperado": {
      "inicio": "2026-10-22",
      "ultimo": "2027-01-27"
    }
  },
  {
    "nombre": "Not enough days with the employer",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.ruraltransformation.gov.bz/docs/39/Labour_Act.pdf",
      "detalle": "Fewer than 150 days: leave without pay."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "parto": "2026-12-10",
      "antes": 4,
      "sueldo": 2000,
      "servicio": 100
    },
    "esperado": {
      "pago": 0
    }
  },
  {
    "nombre": "Less than the mandatory two weeks before",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.ruraltransformation.gov.bz/docs/39/Labour_Act.pdf",
      "detalle": "The last two weeks before the date are mandatory."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "parto": "2026-12-10",
      "antes": 1,
      "sueldo": 2000,
      "servicio": 250
    },
    "esperaError": true
  }
]);
