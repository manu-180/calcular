import { definirCasos } from "@/motor/calculo";
import calculadora from "./fringe-benefits-tax";

export default definirCasos(calculadora, [
  {
    nombre: "GRA example: housing, two cars, fuel and household staff",
    origen: {
      tipo: "oficial",
      url: "https://www.gra.gm/download-file/8d0ca971-d217-11ed-9b31-029254d29bb1",
      detalle: "Housing 75,000, vehicles 62,500, fuel 30,000 and household staff 24,000: 191,500. Grossed up 191,500 / 0.73 = 262,328.77; tax 27% = 70,828.77, which the brochure rounds to D70,829 (its grossed-up line reads 264,329, a typing slip: 70,829 / 0.27 = 262,330).",
    },
    fecha: "2026-10-27",
    entrada: { vivienda: 75000, vehiculo: 92500, otros: 24000 },
    esperado: { valor: 191500, impuesto: 70829 },
    tolerancia: 0.5,
  },
  {
    nombre: "Housing only",
    origen: { tipo: "recalculado", detalle: "73,000 / 0.73 = 100,000. Tax 27,000, 6,750 a quarter." },
    fecha: "2026-10-27",
    entrada: { vivienda: 73000, vehiculo: 0, otros: 0 },
    esperado: { gravable: 100000, impuesto: 27000, trimestral: 6750 },
  },
  {
    nombre: "No benefits",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { vivienda: 0, vehiculo: 0, otros: 0 },
    esperaError: true,
  },
]);
