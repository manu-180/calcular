import { definirCasos } from "@/motor/calculo";
import itbms from "./itbms";

export default definirCasos(itbms, [
  {
    nombre: "Sumar la tarifa general",
    origen: { tipo: "recalculado", detalle: "100 × 7% = 7. Total 107." },
    fecha: "2026-10-07",
    entrada: { operacion: "agregar", monto: 100, tarifa: "general" },
    esperado: { tasa: 7, base: 100, itbms: 7, total: 107 },
  },
  {
    nombre: "Sacar la tarifa general de un precio final",
    origen: { tipo: "recalculado", detalle: "107 ÷ 1.07 = 100. ITBMS 7." },
    fecha: "2026-10-07",
    entrada: { operacion: "quitar", monto: 107, tarifa: "general" },
    esperado: { base: 100, itbms: 7, total: 107 },
  },
  {
    nombre: "Hospedaje",
    origen: { tipo: "recalculado", detalle: "250 × 10% = 25. Total 275." },
    fecha: "2026-10-07",
    entrada: { operacion: "agregar", monto: 250, tarifa: "hospedaje" },
    esperado: { tasa: 10, itbms: 25, total: 275 },
  },
  {
    nombre: "Sacar la tarifa del tabaco",
    origen: { tipo: "recalculado", detalle: "115 ÷ 1.15 = 100. ITBMS 15." },
    fecha: "2026-10-07",
    entrada: { operacion: "quitar", monto: 115, tarifa: "tabaco" },
    esperado: { tasa: 15, base: 100, itbms: 15 },
  },
]);
