import { definirCasos } from "@/motor/calculo";
import iva from "./iva";

export default definirCasos(iva, [
  {
    nombre: "Sumar el 13 % a ₡10.000",
    origen: { tipo: "recalculado", detalle: "Ley 6826, art. 10: 10.000 × 13 % = 1.300. Total 11.300." },
    fecha: "2026-10-07",
    entrada: { operacion: "agregar", monto: 10000, tarifa: "general" },
    esperado: { tasa: 13, base: 10000, iva: 1300, total: 11300 },
  },
  {
    nombre: "Sacar el IVA de ₡11.300",
    origen: { tipo: "recalculado", detalle: "11.300 / 1,13 = 10.000. IVA 1.300." },
    fecha: "2026-10-07",
    entrada: { operacion: "quitar", monto: 11300, tarifa: "general" },
    esperado: { base: 10000, iva: 1300, total: 11300 },
  },
  {
    nombre: "Canasta básica al 1 %",
    origen: { tipo: "recalculado", detalle: "Ley 6826, art. 11, inciso 3: 5.000 × 1 % = 50. Total 5.050." },
    fecha: "2026-10-07",
    entrada: { operacion: "agregar", monto: 5000, tarifa: "reducida-1" },
    esperado: { tasa: 1, iva: 50, total: 5050 },
  },
]);
