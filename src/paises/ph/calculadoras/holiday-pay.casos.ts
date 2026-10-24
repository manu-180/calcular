import { definirCasos } from "@/motor/calculo";
import calculadora from "./holiday-pay";

export default definirCasos(calculadora, [
  {
    nombre: "Worked regular holiday at ₱755",
    origen: { tipo: "recalculado", detalle: "Omnibus Rules, Rule IV sec. 4: 200% × 755 = 1,510." },
    fecha: "2026-10-16",
    entrada: { diario: 755, dia: "regular-holiday", trabajo: true },
    esperado: { pago: 1510, tasa: 200, extra: 755 },
  },
  {
    nombre: "Worked regular holiday on rest day",
    origen: { tipo: "recalculado", detalle: "200% plus 30% of it = 260% × 755 = 1,963." },
    fecha: "2026-10-16",
    entrada: { diario: 755, dia: "regular-holiday-rest-day", trabajo: true },
    esperado: { pago: 1963, tasa: 260 },
  },
  {
    nombre: "Worked special day and special day on rest day",
    origen: { tipo: "recalculado", detalle: "Rule I sec. 7(c): 130% × 755 = 981.50." },
    fecha: "2026-10-16",
    entrada: { diario: 755, dia: "special", trabajo: true },
    esperado: { pago: 981.5, tasa: 130 },
  },
  {
    nombre: "Special day on rest day",
    origen: { tipo: "recalculado", detalle: "150% × 755 = 1,132.50." },
    fecha: "2026-10-16",
    entrada: { diario: 755, dia: "special-rest-day", trabajo: true },
    esperado: { pago: 1132.5, tasa: 150 },
  },
  {
    nombre: "Unworked regular holiday",
    origen: { tipo: "recalculado", detalle: "Regular daily wage: 755." },
    fecha: "2026-10-16",
    entrada: { diario: 755, dia: "regular-holiday", trabajo: false },
    esperado: { pago: 755, extra: 0 },
  },
  {
    nombre: "Unworked special day",
    origen: { tipo: "recalculado", detalle: "No pay rule read in the primary source: result left empty." },
    fecha: "2026-10-16",
    entrada: { diario: 755, dia: "special", trabajo: false },
    esperado: { pago: null },
  },
]);
