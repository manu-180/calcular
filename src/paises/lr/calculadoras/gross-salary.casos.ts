import { definirCasos } from "@/motor/calculo";
import calculadora from "./gross-salary";

export default definirCasos(calculadora, [
  {
    nombre: "Net L$34,358.33 comes from L$40,000 gross",
    origen: {
      tipo: "recalculado",
      detalle: "Reverse of the take-home pay case: 40,000 − 4% (1,600) − PIT 4,041.67 = 34,358.33.",
    },
    fecha: "2026-10-27",
    entrada: { neto: 34358.33 },
    esperado: { bruto: 40000, nasscorp: 1600, pit: 4041.67 },
    tolerancia: 0.02,
  },
  {
    nombre: "Net L$4,800 below the tax-free band",
    origen: { tipo: "recalculado", detalle: "No PIT under L$70,000 a year: 4,800 ÷ 0.96 = 5,000." },
    fecha: "2026-10-27",
    entrada: { neto: 4800 },
    esperado: { bruto: 5000, pit: 0 },
    tolerancia: 0.02,
  },
  {
    nombre: "Net L$81,045 in the top band",
    origen: { tipo: "recalculado", detalle: "Gross 102,000: NASSCORP 4,080, PIT 16,875, net 81,045." },
    fecha: "2026-10-27",
    entrada: { neto: 81045 },
    esperado: { bruto: 102000, pit: 16875 },
    tolerancia: 0.02,
  },
  {
    nombre: "No amount",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-27",
    entrada: { neto: 0 },
    esperaError: true,
  },
]);
