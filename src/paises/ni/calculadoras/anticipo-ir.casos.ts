import { definirCasos } from "@/motor/calculo";
import anticipoIr from "./anticipo-ir";

export default definirCasos(anticipoIr, [
  {
    nombre: "Ventas de C$300,000 con C$1,500 de retenciones",
    origen: { tipo: "recalculado", detalle: "LCT art. 61 y 63 (Ley 987): 1 % para los demás contribuyentes. 300000 × 1 % = 3000; menos 1500 = 1500." },
    fecha: "2026-10-12",
    entrada: { ingresos: 300000, contribuyente: "demas", retenciones: 1500 },
    esperado: { tasa: 1, anticipo: 3000, aPagar: 1500 },
  },
  {
    nombre: "Gran contribuyente",
    origen: { tipo: "recalculado", detalle: "Art. 61: 3 % para los grandes contribuyentes. 2000000 × 3 % = 60000." },
    fecha: "2026-10-12",
    entrada: { ingresos: 2000000, contribuyente: "grandes", retenciones: null },
    esperado: { tasa: 3, anticipo: 60000, aPagar: 60000 },
  },
  {
    nombre: "Retenciones mayores que el anticipo",
    origen: { tipo: "recalculado", detalle: "100000 × 1 % = 1000; retenciones 2000: no se paga en el mes." },
    fecha: "2026-10-12",
    entrada: { ingresos: 100000, contribuyente: "demas", retenciones: 2000 },
    esperado: { anticipo: 1000, aPagar: 0 },
  },
]);
