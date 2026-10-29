import { definirCasos } from "@/motor/calculo";
import calculadora from "./excise-tax";

export default definirCasos(calculadora, [
  {
    nombre: "100 litres of beer",
    origen: { tipo: "recalculado", detalle: "Schedule 1, HS 2203: US$1.00 per litre × 100 = US$100." },
    fecha: "2026-10-27",
    entrada: { producto: "beer", cantidad: 100 },
    esperado: { impuesto: 100, tasa: 1 },
  },
  {
    nombre: "50 litres of spirits",
    origen: { tipo: "recalculado", detalle: "Schedule 1, HS 2208: US$3.00 per litre × 50 = US$150." },
    fecha: "2026-10-27",
    entrada: { producto: "spirits", cantidad: 50 },
    esperado: { impuesto: 150 },
  },
  {
    nombre: "1,000 packs of cigarettes",
    origen: { tipo: "recalculado", detalle: "Schedule 1: US$0.50 per pack of 20 × 1,000 = US$500." },
    fecha: "2026-10-27",
    entrada: { producto: "cigarettes", cantidad: 1000 },
    esperado: { impuesto: 500 },
  },
  {
    nombre: "Local unsweetened water pays nothing",
    origen: { tipo: "recalculado", detalle: "Schedule 1, HS 2201: local NIL." },
    fecha: "2026-10-27",
    entrada: { producto: "water-local", cantidad: 500 },
    esperado: { impuesto: 0 },
  },
  {
    nombre: "33 litres of sweetened drinks",
    origen: { tipo: "recalculado", detalle: "HS 2202: US$0.45 × 33 = US$14.85." },
    fecha: "2026-10-27",
    entrada: { producto: "sweetened", cantidad: 33 },
    esperado: { impuesto: 14.85 },
  },
  {
    nombre: "No quantity",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { producto: "beer", cantidad: 0 },
    esperaError: true,
  },
]);
