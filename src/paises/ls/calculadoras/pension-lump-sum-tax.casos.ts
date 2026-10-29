import { definirCasos } from "@/motor/calculo";
import calculadora from "./pension-lump-sum-tax";

export default definirCasos(calculadora, [
  {
    nombre: "M300 000 lump sum with M60 000 other income",
    origen: {
      tipo: "recalculado",
      detalle:
        "Income Tax Act s. 99(1): standard rate 25% × 300 000 = 75 000. Election: tax on 360 000 = 15 552 + 282 240 × 30% = 100 224, less 12 240 = 87 984. Tax on 60 000 = 12 000, less 12 240 = 0. Extra 87 984. Lower: 75 000.",
    },
    fecha: "2026-10-27",
    entrada: { pago: 300000, transferido: 0, otros: 60000 },
    esperado: { fija: 75000, incluida: 87984, impuesto: 75000, neto: 225000 },
  },
  {
    nombre: "Small lump sum and no other income",
    origen: {
      tipo: "recalculado",
      detalle: "Standard rate 25% × 50 000 = 12 500. Election: 50 000 × 20% = 10 000, under the 12 240 credit, so 0. Lower: 0.",
    },
    fecha: "2026-10-27",
    entrada: { pago: 50000, transferido: 0, otros: 0 },
    esperado: { fija: 12500, incluida: 0, impuesto: 0, conviene: "Including it in your income costs less." },
  },
  {
    nombre: "Part rolled over into an annuity",
    origen: { tipo: "recalculado", detalle: "s. 99(2): 200 000 rolled over is exempt. Taxable 100 000 × 25% = 25 000." },
    fecha: "2026-10-27",
    entrada: { pago: 300000, transferido: 200000, otros: 200000 },
    esperado: { gravable: 100000, exento: 200000, fija: 25000, impuesto: 25000 },
  },
]);
