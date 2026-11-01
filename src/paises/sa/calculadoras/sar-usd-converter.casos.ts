import { definirCasos } from "@/motor/calculo";
import calculadora from "./sar-usd-converter";

export default definirCasos(calculadora, [
  {
    nombre: "1.000 riyales a dólares",
    origen: { tipo: "oficial", url: "https://sama.gov.sa/ar-sa/MediaCenter/News/Pages/news-557.aspx", detalle: "Paridad oficial 3,75: 1.000 / 3,75 = 266,67." },
    fecha: "2026-10-24",
    entrada: { importe: 1000, sentido: "sar-usd" },
    esperado: { resultado: 266.67, tasa: 3.75, inversa: 0.266667 },
    tolerancia: 0.0001,
  },
  {
    nombre: "500 dólares a riyales",
    origen: { tipo: "recalculado", detalle: "500 x 3,75 = 1.875." },
    fecha: "2026-10-24",
    entrada: { importe: 500, sentido: "usd-sar" },
    esperado: { resultado: 1875, moneda: "ريال سعودي" },
  },
  {
    nombre: "Importe cero",
    origen: { tipo: "recalculado", detalle: "Importe 0." },
    fecha: "2026-10-24",
    entrada: { importe: 0, sentido: "usd-sar" },
    esperaError: true,
  },
]);
