import { definirCasos } from "@/motor/calculo";
import calculadora from "./dewa-bill-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Home using 2,500 kWh and 30 cubic metres",
    origen: {
      tipo: "recalculado",
      detalle:
        "DEWA slab tariff: electricity 2,000 x 0.23 + 500 x 0.28 = 600; water 27 x 7.70 + 3 x 8.80 = 234.30; fuel surcharge 2,500 x 0.06 + 30 x 1.10 = 183; meters 5 + 5. Subtotal 1,027.30, VAT 5% 51.37, total 1,078.67.",
    },
    fecha: "2026-10-19",
    entrada: { tipo: "residential", kwh: 2500, agua: 30, medidorLuz: "electricity-1", medidorAgua: "water-1" },
    esperado: { luz: 600, agua: 234.3, combustible: 183, cargos: 10, total: 1078.67 },
    tolerancia: 0.011,
  },
  {
    nombre: "Industrial account above 10,000 kWh",
    origen: { tipo: "recalculado", detalle: "10,000 x 0.23 + 2,000 x 0.38 = 3,060." },
    fecha: "2026-10-19",
    entrada: { tipo: "industrial", kwh: 12000, agua: 0, medidorLuz: "electricity-3", medidorAgua: "water-2" },
    esperado: { luz: 3060, agua: 0 },
  },
  {
    nombre: "Nothing used is not valid",
    origen: { tipo: "recalculado", detalle: "0 kWh and 0 m3." },
    fecha: "2026-10-19",
    entrada: { tipo: "residential", kwh: 0, agua: 0, medidorLuz: "electricity-1", medidorAgua: "water-1" },
    esperaError: true,
  },
]);
