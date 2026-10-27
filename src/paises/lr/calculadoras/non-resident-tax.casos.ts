import { definirCasos } from "@/motor/calculo";
import calculadora from "./non-resident-tax";

export default definirCasos(calculadora, [
  {
    nombre: "Royalty of US$10,000",
    origen: { tipo: "recalculado", detalle: "Section 806(b): 15% × 10,000 = 1,500. Net 8,500." },
    fecha: "2026-10-27",
    entrada: { monto: 10000, modo: "bruto" },
    esperado: { retencion: 1500, neto: 8500, tasa: 15 },
  },
  {
    nombre: "Licence fee grossed up to a net of US$8,500",
    origen: { tipo: "recalculado", detalle: "8,500 ÷ 0.85 = 10,000 gross; 1,500 withheld." },
    fecha: "2026-10-27",
    entrada: { monto: 8500, modo: "neto" },
    esperado: { bruto: 10000, retencion: 1500, neto: 8500 },
  },
  {
    nombre: "No amount",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { monto: 0, modo: "bruto" },
    esperaError: true,
  },
]);
