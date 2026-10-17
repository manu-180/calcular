import { definirCasos } from "@/motor/calculo";
import calculadora from "./usd-to-cad";

export default definirCasos(calculadora, [
  {
    "nombre": "US$100 at the October 13, 2026 rate",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Bank of Canada FXUSDCAD 2026-10-13 = 1.4222; 100 × 1.4222 = 142.22."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "direccion": "usd-cad",
      "monto": 100
    },
    "esperado": {
      "resultado": 142.22,
      "tasa": 1.4222,
      "fecha": "2026-10-13"
    }
  },
  {
    "nombre": "CA$100 to US dollars",
    "origen": {
      "tipo": "recalculado",
      "detalle": "100 / 1.4222 = 70.31."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "direccion": "cad-usd",
      "monto": 100
    },
    "esperado": {
      "resultado": 70.31
    }
  },
  {
    "nombre": "Zero amount",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Amount must be above zero."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "direccion": "usd-cad",
      "monto": 0
    },
    "esperaError": true
  }
]);
