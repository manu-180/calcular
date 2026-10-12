import { definirCasos } from "@/motor/calculo";
import impuestoSobreAlquileres from "./impuesto-sobre-alquileres";

export default definirCasos(impuestoSobreAlquileres, [
  {
    nombre: "Alquiler de ₡400.000 al mes",
    origen: {
      tipo: "recalculado",
      detalle: "Ley 7092, art. 29: deducción del 15 %, 60.000. Base 340.000. Art. 31 ter: 15 % = 51.000 (12,75 % del alquiler). Año: 612.000.",
    },
    fecha: "2026-10-12",
    entrada: { alquiler: 400000 },
    esperado: { deduccion: 60000, base: 340000, impuesto: 51000, tasaEfectiva: 12.75, anual: 612000 },
  },
  {
    nombre: "Local de ₡1.250.000",
    origen: { tipo: "recalculado", detalle: "1.250.000 − 187.500 = 1.062.500; × 15 % = 159.375." },
    fecha: "2026-10-12",
    entrada: { alquiler: 1250000 },
    esperado: { impuesto: 159375, neto: 1090625 },
  },
]);
