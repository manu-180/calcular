import { definirCasos } from "@/motor/calculo";
import irpAlquiler from "./irp-alquiler";

const L6380 = "https://www.bacn.gov.py/leyes-paraguayas/9332/ley-n-6380-de-modernizacion-y-simplificacion-del-sistema-tributario-nacional" as const;

export default definirCasos(irpAlquiler, [
  {
    nombre: "Pocos gastos: conviene la presunta",
    origen: { tipo: "recalculado", url: L6380, detalle: "Art. 59 num. 2: presunta 50 % de 36.000.000 = 18.000.000; real 36.000.000 − 4.000.000 = 32.000.000. Menor: 18.000.000 × 8 % (art. 60) = 1.440.000." },
    fecha: "2026-10-12",
    entrada: { alquiler: 36000000, gastos: 4000000 },
    esperado: { presunta: 18000000, real: 32000000, rentaNeta: 18000000, impuesto: 1440000 },
  },
  {
    nombre: "Muchos gastos: conviene la real",
    origen: { tipo: "recalculado", url: L6380, detalle: "Real 36.000.000 − 25.000.000 = 11.000.000, menor que la presunta de 18.000.000. IRP 880.000." },
    fecha: "2026-10-12",
    entrada: { alquiler: 36000000, gastos: 25000000 },
    esperado: { rentaNeta: 11000000, impuesto: 880000 },
  },
]);
