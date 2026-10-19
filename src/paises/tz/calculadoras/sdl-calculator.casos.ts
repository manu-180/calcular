import { definirCasos } from "@/motor/calculo";
import calculadora from "./sdl-calculator";

export default definirCasos(calculadora, [
  {
    "nombre": "Payroll of TSh 20 million with 12 employees",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.tra.go.tz/page/skills-development-levy-sdl",
      "detalle": "3.5% × 20,000,000 = 700,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "nomina": 20000000,
      "empleados": 12
    },
    "esperado": {
      "sdl": 700000,
      "aplica": "Yes"
    }
  },
  {
    "nombre": "Fewer than ten employees",
    "origen": {
      "tipo": "recalculado",
      "detalle": "SDL does not apply."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "nomina": 5000000,
      "empleados": 8
    },
    "esperado": {
      "sdl": 0,
      "aplica": "No"
    }
  },
]);
