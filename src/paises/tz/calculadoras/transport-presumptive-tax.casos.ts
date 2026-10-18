import { definirCasos } from "@/motor/calculo";
import calculadora from "./transport-presumptive-tax";

export default definirCasos(calculadora, [
  {
    "nombre": "One 14-seater daladala",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.tra.go.tz/page/income-tax-for-individuals",
      "detalle": "Class A, 6 to 15 passengers: 250,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "tipo": "psv-15",
      "vehiculos": 1
    },
    "esperado": {
      "total": 250000
    }
  },
  {
    "nombre": "Two 10-tonne trucks",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Class C, 6 to 10 tonnes: 750,000 × 2 = 1,500,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "tipo": "goods-10",
      "vehiculos": 2
    },
    "esperado": {
      "total": 1500000,
      "porVehiculo": 750000
    }
  },
  {
    "nombre": "Ride hailing car",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Class D: 350,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "tipo": "ride-hailing",
      "vehiculos": 1
    },
    "esperado": {
      "total": 350000
    }
  },
]);
