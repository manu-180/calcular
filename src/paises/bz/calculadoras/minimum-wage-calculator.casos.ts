import { definirCasos } from "@/motor/calculo";
import minimumWageCalculator from "./minimum-wage-calculator";

export default definirCasos(minimumWageCalculator, [
  {
    "nombre": "BZ$900 a month for a 45 hour week",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.pressoffice.gov.bz/wp-content/uploads/2019/12/Dec-22-PR378-22-Minimum-Wage-Increases-for-All-Categories-of-Workers.pdf",
      "detalle": "900 x 12 / 52 = 207.69 a week, 4.62 an hour. Minimum a month: 5 x 45 x 52 / 12 = 975, so the shortfall is 75."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "monto": 900,
      "base": "mes",
      "horas": 45
    },
    "esperado": {
      "minimoHora": 5,
      "minimoSemana": 225,
      "minimoMes": 975,
      "tuHora": 4.62,
      "faltaMes": 75
    }
  },
  {
    "nombre": "Paid exactly the minimum per hour",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.pressoffice.gov.bz/wp-content/uploads/2019/12/Dec-22-PR378-22-Minimum-Wage-Increases-for-All-Categories-of-Workers.pdf",
      "detalle": "5.00 an hour equals the minimum, so there is no shortfall."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "monto": 5,
      "base": "hora",
      "horas": 45
    },
    "esperado": {
      "minimoHora": 5,
      "tuHora": 5,
      "faltaMes": 0
    }
  },
  {
    "nombre": "BZ$1,000 a month for 40 hours",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.pressoffice.gov.bz/wp-content/uploads/2019/12/Dec-22-PR378-22-Minimum-Wage-Increases-for-All-Categories-of-Workers.pdf",
      "detalle": "Minimum for 40 hours: 5 x 40 = 200 a week, 200 x 52 / 12 = 866.67 a month."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "monto": 1000,
      "base": "mes",
      "horas": 40
    },
    "esperado": {
      "minimoSemana": 200,
      "minimoMes": 866.67,
      "faltaMes": 0
    }
  }
]);
