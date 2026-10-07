import { definirCasos } from "@/motor/calculo";
import iva from "./iva";

export default definirCasos(iva, [
  {
    nombre: "Sumar IVA básico a $ 1.000",
    origen: { tipo: "recalculado", detalle: "Título 10, art. 34: tasa básica 22 %. 1.000 × 22 % = 220. Total 1.220." },
    fecha: "2026-10-07",
    entrada: { sentido: "agregar", tasa: "basica", monto: 1000 },
    esperado: { tasa: 22, neto: 1000, iva: 220, total: 1220 },
  },
  {
    nombre: "Sacar el IVA básico de $ 1.220",
    origen: { tipo: "recalculado", detalle: "1.220 / 1,22 = 1.000. IVA 220." },
    fecha: "2026-10-07",
    entrada: { sentido: "quitar", tasa: "basica", monto: 1220 },
    esperado: { neto: 1000, iva: 220 },
  },
  {
    nombre: "Sacar el IVA mínimo con redondeo",
    origen: { tipo: "recalculado", detalle: "Tasa mínima 10 %. 999 / 1,1 = 908,1818 → 908,18. IVA 90,82." },
    fecha: "2026-10-07",
    entrada: { sentido: "quitar", tasa: "minima", monto: 999 },
    esperado: { tasa: 10, neto: 908.18, iva: 90.82, total: 999 },
  },
  {
    nombre: "Sumar IVA mínimo",
    origen: { tipo: "recalculado", detalle: "350,50 × 10 % = 35,05. Total 385,55." },
    fecha: "2026-10-07",
    entrada: { sentido: "agregar", tasa: "minima", monto: 350.5 },
    esperado: { iva: 35.05, total: 385.55 },
  },
]);
