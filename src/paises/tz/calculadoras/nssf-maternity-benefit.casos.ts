import { definirCasos } from "@/motor/calculo";
import calculadora from "./nssf-maternity-benefit";

export default definirCasos(calculadora, [
  {
    "nombre": "TSh 6 million in six months",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.nssf.go.tz/benefits/maternity-benefits",
      "detalle": "AIDE 6,000,000 / 180 = 33,333.33. First 28 days 933,333.33. Total 84 days 2,800,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "ingresos": 6000000
    },
    "esperado": {
      "total": 2800000,
      "primera": 933333.33,
      "segunda": 1866666.67
    }
  },
]);
