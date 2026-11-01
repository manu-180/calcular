import { definirCasos } from "@/motor/calculo";
import calculadora from "./usd-to-nad";

export default definirCasos(calculadora, [
  {
    nombre: "US$100 at the rate of 27 October 2026",
    origen: {
      tipo: "oficial",
      url: "https://services.bon.com.na/ratestable/api/rates",
      detalle: "Bank of Namibia rate for 27 October 2026: N$16.6406 per US dollar. 100 × 16.6406 = 1,664.06.",
    },
    fecha: "2026-10-27",
    entrada: { monto: 100, sentido: "usd" },
    esperado: { nad: 1664.06, tasa: 16.6406, fecha: "2026-10-27" },
  },
  {
    nombre: "N$1,664.06 to US dollars",
    origen: { tipo: "recalculado", detalle: "1,664.06 / 16.6406 = 100.00." },
    fecha: "2026-10-27",
    entrada: { monto: 1664.06, sentido: "nad" },
    esperado: { dolares: 100 },
  },
]);
