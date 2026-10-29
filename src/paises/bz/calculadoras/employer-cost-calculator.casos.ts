import { definirCasos } from "@/motor/calculo";
import employerCostCalculator from "./employer-cost-calculator";

export default definirCasos(employerCostCalculator, [
  {
    "nombre": "BZ$2,000 a month",
    "origen": {
      "tipo": "recalculado",
      "url": "https://socialsecurity.org.bz/wp-content/uploads/2022/03/Cont_Ben_Schedule.pdf",
      "detalle": "Employer share 27.14 a week x 52 / 12 = 117.61. Cost 2,000 + 117.61 = 2,117.61; a year 25,411.32; total to the Board 90.39 + 117.61 = 208.00."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "salario": 2000,
      "otros": 0
    },
    "esperado": {
      "costoMes": 2117.61,
      "costoAnio": 25411.32,
      "ssbEmpleador": 117.61,
      "ssbTotal": 208,
      "recargo": 5.8805
    }
  },
  {
    "nombre": "With other monthly costs",
    "origen": {
      "tipo": "recalculado",
      "url": "https://socialsecurity.org.bz/wp-content/uploads/2022/03/Cont_Ben_Schedule.pdf",
      "detalle": "2,117.61 + 150 = 2,267.61."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "salario": 2000,
      "otros": 150
    },
    "esperado": {
      "costoMes": 2267.61
    }
  }
]);
