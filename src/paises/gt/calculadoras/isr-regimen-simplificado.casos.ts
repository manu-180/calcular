import { definirCasos } from "@/motor/calculo";
import isrRegimenSimplificado from "./isr-regimen-simplificado";

export default definirCasos(isrRegimenSimplificado, [
  {
    nombre: "Factura de Q11,200 con IVA",
    origen: { tipo: "recalculado", detalle: "Sin IVA 11200 / 1.12 = 10000; IVA 1200. ISR 5 % de 10000 = 500 (Decreto 10-2012 art. 44). Recibe 11200 − 500 = 10700." },
    fecha: "2026-10-12",
    entrada: { monto: 11200, incluyeIva: true },
    esperado: { base: 10000, iva: 1200, isr: 500, recibe: 10700, minimo: 2500 },
  },
  {
    nombre: "Q50,000 sin IVA: segundo tramo",
    origen: { tipo: "recalculado", detalle: "1500 + 7 % de (50000 − 30000) = 2900. IVA 12 % = 6000." },
    fecha: "2026-10-12",
    entrada: { monto: 50000, incluyeIva: false },
    esperado: { iva: 6000, isr: 2900 },
  },
  {
    nombre: "Justo en el límite del primer tramo",
    origen: { tipo: "recalculado", detalle: "5 % de 30000 = 1500." },
    fecha: "2026-10-12",
    entrada: { monto: 30000, incluyeIva: false },
    esperado: { isr: 1500 },
  },
]);
