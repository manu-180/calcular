import { definirCasos } from "@/motor/calculo";
import calculadora from "./rental-yield-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "AED 1.5 million flat let for AED 100,000",
    origen: {
      tipo: "recalculado",
      detalle: "Gross 100,000 / 1,500,000 = 6.67%. Buying costs 60,000 + 4,200 + 250 = 64,450. Net (100,000 - 15,000 - 5,000) / 1,564,450 = 5.11%.",
    },
    fecha: "2026-10-18",
    entrada: { precio: 1500000, renta: 100000, servicios: 15000, otros: 5000, vacio: 0 },
    esperado: { compra: 64450, neto: 80000, inversion: 1564450 },
  },
  {
    nombre: "One month empty",
    origen: { tipo: "recalculado", detalle: "Rent 120,000 x 11/12 = 110,000 - 20,000 = 90,000." },
    fecha: "2026-10-18",
    entrada: { precio: 2000000, renta: 120000, servicios: 15000, otros: 5000, vacio: 1 },
    esperado: { neto: 90000 },
  },
]);
