import { definirCasos } from "@/motor/calculo";
import calculadora from "./dollar-to-birr";

export default definirCasos(calculadora, [
  {
    nombre: "US$100 at the rate of 26 October 2026",
    origen: { tipo: "oficial", url: "https://nbe.gov.et/exchange/", detalle: "NBE indicative rate for 26 October 2026: 160.9999 birr per US dollar. 100 × 160.9999 = 16,099.99." },
    fecha: "2026-10-26",
    entrada: { monto: 100, sentido: "usd" },
    esperado: { birr: 16099.99, tasa: 160.9999, fecha: "2026-10-26" },
  },
  {
    nombre: "ETB 16,099.99 to dollars",
    origen: { tipo: "recalculado", detalle: "16,099.99 / 160.9999 = 100.00." },
    fecha: "2026-10-26",
    entrada: { monto: 16099.99, sentido: "etb" },
    esperado: { dolares: 100 },
  },
  {
    nombre: "Rate of 20 October 2026",
    origen: { tipo: "oficial", url: "https://nbe.gov.et/exchange/", detalle: "NBE indicative rate for 20 October 2026: 160.9878. 1,000 × 160.9878 = 160,987.80." },
    fecha: "2026-10-20",
    entrada: { monto: 1000, sentido: "usd" },
    esperado: { birr: 160987.8, fecha: "2026-10-20" },
  },
]);
