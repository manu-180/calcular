import { definirCasos } from "@/motor/calculo";
import usdToBzd from "./usd-to-bzd";

export default definirCasos(usdToBzd, [
  {
    "nombre": "US$100 at the fixed rate",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.centralbank.org.bz/detail-pages/news/2026/05/11/belize-commemorates-50-years-of-exchange-rate-stability",
      "detalle": "100 x 2 = 200."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "monto": 100,
      "sentido": "usd"
    },
    "esperado": {
      "bzd": 200,
      "tasa": 2
    }
  },
  {
    "nombre": "BZ$500 to dollars",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.centralbank.org.bz/detail-pages/news/2026/05/11/belize-commemorates-50-years-of-exchange-rate-stability",
      "detalle": "500 / 2 = 250."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "monto": 500,
      "sentido": "bzd"
    },
    "esperado": {
      "usd": 250
    }
  }
]);
