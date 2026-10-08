import { definirCasos } from "@/motor/calculo";
import iva from "./iva";

export default definirCasos(iva, [
  {
    nombre: "Agregar IVA a $10.000",
    origen: { tipo: "recalculado", detalle: "19 % de 10.000 = 1.900. Total 11.900." },
    fecha: "2026-10-07",
    entrada: { sentido: "agregar", monto: 10000 },
    esperado: { neto: 10000, iva: 1900, total: 11900 },
  },
  {
    nombre: "Sacar el IVA de $11.900",
    origen: { tipo: "recalculado", detalle: "11.900 / 1,19 = 10.000. IVA 1.900." },
    fecha: "2026-10-07",
    entrada: { sentido: "quitar", monto: 11900 },
    esperado: { neto: 10000, iva: 1900 },
  },
  {
    nombre: "Redondeo al sacar el IVA",
    origen: { tipo: "recalculado", detalle: "1.000 / 1,19 = 840,34 → 840. IVA 160." },
    fecha: "2026-10-07",
    entrada: { sentido: "quitar", monto: 1000 },
    esperado: { neto: 840, iva: 160, total: 1000 },
  },
  {
    nombre: "Redondeo al agregar el IVA",
    origen: { tipo: "recalculado", detalle: "19 % de 999 = 189,81 → 190. Total 1.189." },
    fecha: "2026-10-07",
    entrada: { sentido: "agregar", monto: 999 },
    esperado: { iva: 190, total: 1189 },
  },
]);
