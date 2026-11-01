import { definirCasos } from "@/motor/calculo";
import calculadora from "./dividend-tax";

export default definirCasos(calculadora, [
  {
    nombre: "GRA example: D50,000 dividend",
    origen: {
      tipo: "oficial",
      url: "https://www.gra.gm/download-file/8d0c84c3-d217-11ed-9b31-029254d29bb1",
      detalle: "15% of 50,000 = 7,500 withheld. The shareholder receives 42,500.",
    },
    fecha: "2026-10-27",
    entrada: { dividendo: 50000 },
    esperado: { impuesto: 7500, neto: 42500 },
  },
  {
    nombre: "D1,234.56 dividend",
    origen: { tipo: "recalculado", detalle: "15% of 1,234.56 = 185.18. Net 1,049.38." },
    fecha: "2026-10-27",
    entrada: { dividendo: 1234.56 },
    esperado: { impuesto: 185.18, neto: 1049.38 },
  },
  {
    nombre: "No dividend",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { dividendo: 0 },
    esperaError: true,
  },
]);
