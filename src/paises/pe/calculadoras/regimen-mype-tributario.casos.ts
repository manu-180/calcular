import { definirCasos } from "@/motor/calculo";
import rmt from "./regimen-mype-tributario";

export default definirCasos(rmt, [
  {
    nombre: "Mes de S/ 50,000 con utilidad anual de S/ 120,000",
    origen: {
      tipo: "recalculado",
      detalle:
        "DL 1269, arts. 5 y 6: pago a cuenta 1 % de 50,000 = 500. Impuesto anual con UIT de 5,500: 15 UIT = 82,500 al 10 % = 8,250; exceso 37,500 al 29.5 % = 11,062.50; total 19,312.50.",
    },
    fecha: "2026-10-12",
    entrada: { ingresosMes: 50000, acumulado: 600000, rentaNeta: 120000 },
    esperado: { tasaPagoCuenta: 1, pagoCuenta: 500, impuestoAnual: 19312.5, limitePagoCuenta: 1650000 },
  },
  {
    nombre: "Ingresos acumulados por encima de 300 UIT",
    origen: { tipo: "recalculado", detalle: "Acumulado 1,700,000 > 1,650,000 (300 UIT): pago a cuenta con 1.5 % (art. 85 LIR) = 1,500 sobre 100,000." },
    fecha: "2026-10-12",
    entrada: { ingresosMes: 100000, acumulado: 1700000, rentaNeta: null },
    esperado: { tasaPagoCuenta: 1.5, pagoCuenta: 1500, impuestoAnual: null },
  },
  {
    nombre: "Utilidad dentro del primer tramo",
    origen: { tipo: "recalculado", detalle: "Renta neta 60,000 < 82,500: 10 % = 6,000." },
    fecha: "2026-10-12",
    entrada: { ingresosMes: 20000, acumulado: null, rentaNeta: 60000 },
    esperado: { pagoCuenta: 200, impuestoAnual: 6000 },
  },
]);
