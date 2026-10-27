import { definirCasos } from "@/motor/calculo";
import calculadora from "./capital-gains-tax";

export default definirCasos(calculadora, [
  {
    nombre: "P300 000 gain on a sale",
    origen: {
      tipo: "recalculado",
      detalle: "Schedule 1, Part I, paragraph 2 of the Income Tax Act, 2026: 13 650 + 25% × (300 000 − 156 000) = 49 650.",
    },
    fecha: "2026-10-27",
    entrada: { venta: 900000, costo: 600000, otras: 0, perdidas: 0 },
    esperado: { ganancia: 300000, neta: 300000, impuesto: 49650, atribuible: 49650, marginal: 25 },
  },
  {
    nombre: "Small gain inside the nil band",
    origen: { tipo: "recalculado", detalle: "Net aggregate gain 30 000 is under 36 000: no tax." },
    fecha: "2026-10-27",
    entrada: { venta: 130000, costo: 100000, otras: 0, perdidas: 0 },
    esperado: { impuesto: 0, neta: 30000 },
  },
  {
    nombre: "Gain above P400 000 with a loss to set off",
    origen: { tipo: "recalculado", detalle: "Gain 600 000 − loss 100 000 = 500 000: 74 650 + 27.5% × 100 000 = 102 150." },
    fecha: "2026-10-27",
    entrada: { venta: 1600000, costo: 1000000, otras: 0, perdidas: 100000 },
    esperado: { neta: 500000, impuesto: 102150, marginal: 27.5 },
  },
  {
    nombre: "Second sale in the year",
    origen: { tipo: "recalculado", detalle: "Other gains 60 000: tax 1 200. With 50 000 more, 110 000: 2 400 + 12.5% × 26 000 = 5 650. This sale adds 4 450." },
    fecha: "2026-10-27",
    entrada: { venta: 150000, costo: 100000, otras: 60000, perdidas: 0 },
    esperado: { impuesto: 5650, atribuible: 4450 },
  },
  {
    nombre: "Sale price zero",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { venta: 0, costo: 100, otras: 0, perdidas: 0 },
    esperaError: true,
  },
]);
