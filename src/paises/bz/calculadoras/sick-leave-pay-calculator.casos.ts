import { definirCasos } from "@/motor/calculo";
import sickLeavePayCalculator from "./sick-leave-pay-calculator";

export default definirCasos(sickLeavePayCalculator, [
  {
    "nombre": "Five days off on BZ$2,000 a month",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.ruraltransformation.gov.bz/docs/39/Labour_Act.pdf",
      "detalle": "Daily pay 461.54 / 5 = 92.31; 5 days = 461.55."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "sueldo": 2000,
      "diasSemana": "5",
      "pedidos": 5,
      "usados": 0,
      "servicio": 250
    },
    "esperado": {
      "pago": 461.55,
      "pagados": 5,
      "disponibles": 16,
      "diario": 92.31
    }
  },
  {
    "nombre": "Only two paid days left",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.ruraltransformation.gov.bz/docs/39/Labour_Act.pdf",
      "detalle": "16 - 14 = 2 paid days; 2 x 92.31 = 184.62; 3 days unpaid."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "sueldo": 2000,
      "diasSemana": "5",
      "pedidos": 5,
      "usados": 14,
      "servicio": 250
    },
    "esperado": {
      "pago": 184.62,
      "pagados": 2,
      "sinPago": 3
    }
  },
  {
    "nombre": "Too little service",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.ruraltransformation.gov.bz/docs/39/Labour_Act.pdf",
      "detalle": "Fewer than 60 days of service in the last 12 months."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "sueldo": 2000,
      "diasSemana": "6",
      "pedidos": 3,
      "usados": 0,
      "servicio": 30
    },
    "esperado": {
      "pago": 0,
      "pagados": 0
    }
  }
]);
