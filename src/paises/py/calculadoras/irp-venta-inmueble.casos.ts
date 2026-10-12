import { definirCasos } from "@/motor/calculo";
import irpVentaInmueble from "./irp-venta-inmueble";

const L6380 = "https://www.bacn.gov.py/leyes-paraguayas/9332/ley-n-6380-de-modernizacion-y-simplificacion-del-sistema-tributario-nacional" as const;

export default definirCasos(irpVentaInmueble, [
  {
    nombre: "Con costo documentado",
    origen: { tipo: "recalculado", url: L6380, detalle: "Art. 59 num. 1: presunta 30 % de 500.000.000 = 150.000.000; real 500.000.000 − 400.000.000 − 10.000.000 = 90.000.000. Menor 90.000.000 × 8 % = 7.200.000." },
    fecha: "2026-10-12",
    entrada: { precio: 500000000, costo: 400000000, gastos: 10000000 },
    esperado: { presunta: 150000000, real: 90000000, rentaNeta: 90000000, impuesto: 7200000 },
  },
  {
    nombre: "Sin costo documentado",
    origen: { tipo: "recalculado", url: L6380, detalle: "Sin escritura de compra solo vale la presunta: 150.000.000 × 8 % = 12.000.000." },
    fecha: "2026-10-12",
    entrada: { precio: 500000000, costo: null, gastos: 0 },
    esperado: { presunta: 150000000, real: null, rentaNeta: 150000000, impuesto: 12000000 },
  },
]);
