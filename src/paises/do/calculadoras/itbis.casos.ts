import { definirCasos } from "@/motor/calculo";
import itbis from "./itbis";

export default definirCasos(itbis, [
  {
    nombre: "Agregar ITBIS a RD$1,000",
    origen: { tipo: "recalculado", detalle: "1,000 × 18 % = 180. Total 1,180." },
    fecha: "2026-10-07",
    entrada: { sentido: "agregar", monto: 1000 },
    esperado: { neto: 1000, itbis: 180, total: 1180 },
  },
  {
    nombre: "Sacar el ITBIS de RD$1,180",
    origen: { tipo: "recalculado", detalle: "1,180 ÷ 1.18 = 1,000. ITBIS 180." },
    fecha: "2026-10-07",
    entrada: { sentido: "quitar", monto: 1180 },
    esperado: { neto: 1000, itbis: 180, total: 1180 },
  },
  {
    nombre: "Redondeo a centavos",
    origen: { tipo: "recalculado", detalle: "99.99 × 18 % = 17.9982, redondeado 18.00. Total 117.99." },
    fecha: "2026-10-07",
    entrada: { sentido: "agregar", monto: 99.99 },
    esperado: { itbis: 18, total: 117.99 },
  },
]);
