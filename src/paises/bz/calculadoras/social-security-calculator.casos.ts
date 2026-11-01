import { definirCasos } from "@/motor/calculo";
import socialSecurityCalculator from "./social-security-calculator";

export default definirCasos(socialSecurityCalculator, [
  {
    "nombre": "BZ$2,000 a month",
    "origen": {
      "tipo": "recalculado",
      "url": "https://socialsecurity.org.bz/wp-content/uploads/2022/03/Cont_Ben_Schedule.pdf",
      "detalle": "Weekly pay 2,000 x 12 / 52 = 461.54, band 460.00 to 499.99: employee 20.86, employer 27.14 a week. Monthly: 20.86 x 52 / 12 = 90.39."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "monto": 2000,
      "base": "mes",
      "edad": "regular"
    },
    "esperado": {
      "asegurable": 480,
      "trabajadorSemana": 20.86,
      "empleadorSemana": 27.14,
      "trabajadorMes": 90.39,
      "empleadorMes": 117.61,
      "totalMes": 208,
      "trabajadorAnio": 1084.72,
      "netoMes": 1909.61
    }
  },
  {
    "nombre": "Top band at BZ$520 a week",
    "origen": {
      "tipo": "recalculado",
      "url": "https://socialsecurity.org.bz/wp-content/uploads/2022/03/Cont_Ben_Schedule.pdf",
      "detalle": "Band 500.00 and over: employee 23.40, employer 28.60."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "monto": 520,
      "base": "semana",
      "edad": "regular"
    },
    "esperado": {
      "asegurable": 520,
      "trabajadorSemana": 23.4,
      "empleadorSemana": 28.6,
      "trabajadorMes": 101.4,
      "empleadorMes": 123.93
    }
  },
  {
    "nombre": "Lowest band",
    "origen": {
      "tipo": "recalculado",
      "url": "https://socialsecurity.org.bz/wp-content/uploads/2022/03/Cont_Ben_Schedule.pdf",
      "detalle": "Under 70.00 a week: employee 1.03, employer 4.47."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "monto": 60,
      "base": "semana",
      "edad": "regular"
    },
    "esperado": {
      "asegurable": 55,
      "trabajadorSemana": 1.03,
      "empleadorSemana": 4.47
    }
  },
  {
    "nombre": "Age 65 or older",
    "origen": {
      "tipo": "recalculado",
      "url": "https://socialsecurity.org.bz/wp-content/uploads/2022/03/Cont_Ben_Schedule.pdf",
      "detalle": "Employment injury cover only: employee 0.00, employer 2.60 a week."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "monto": 300,
      "base": "semana",
      "edad": "limitada"
    },
    "esperado": {
      "trabajadorSemana": 0,
      "empleadorSemana": 2.6
    }
  }
]);
