import { definirCasos } from "@/motor/calculo";
import calculadora from "./gift-tax";

export default definirCasos(calculadora, [
  {
    nombre: "Resident receives GH₵10,000",
    origen: { tipo: "recalculado", detalle: "15% of 10,000 = 1,500." },
    fecha: "2026-10-18",
    entrada: { valor: 10000, residente: "resident" },
    esperado: { impuesto: 1500, tasa: 15 },
  },
  {
    nombre: "Non-resident",
    origen: { tipo: "recalculado", detalle: "25% of 10,000 = 2,500." },
    fecha: "2026-10-18",
    entrada: { valor: 10000, residente: "non-resident" },
    esperado: { impuesto: 2500, tasa: 25 },
  },
  {
    nombre: "Zero",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-18",
    entrada: { valor: 0, residente: "resident" },
    esperaError: true,
  },
]);
