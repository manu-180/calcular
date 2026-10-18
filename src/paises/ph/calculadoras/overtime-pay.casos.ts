import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-pay";

export default definirCasos(calculadora, [
  {
    nombre: "Two hours on an ordinary day at ₱755",
    origen: { tipo: "recalculado", detalle: "Hourly 755 / 8 = 94.375. Overtime 94.375 × 1.25 = 117.96875 × 2 = 235.94." },
    fecha: "2026-10-16",
    entrada: { diario: 755, dia: "ordinary", horas: 2, nocturnas: 0 },
    esperado: { total: 235.94, horaExtra: 117.97, recargo: 25, jornada: 755 },
  },
  {
    nombre: "Three hours on a rest day, one at night",
    origen: {
      tipo: "recalculado",
      detalle: "Rest day hourly 100 × 1.30 = 130; overtime 130 × 1.30 = 169 × 3 = 507. Night differential 169 × 10% × 1 = 16.90. Total 523.90.",
    },
    fecha: "2026-10-16",
    entrada: { diario: 800, dia: "rest-day", horas: 3, nocturnas: 1 },
    esperado: { extra: 507, nocturno: 16.9, total: 523.9, recargo: 30, jornada: 1040 },
  },
  {
    nombre: "Two hours on a regular holiday that is also a rest day",
    origen: {
      tipo: "recalculado",
      detalle: "Omnibus Rules, Rule IV sec. 5: holiday-rest day rate 200% + 30% = 260%. Hourly 100 × 2.6 = 260; overtime 260 × 1.30 = 338 × 2 = 676.",
    },
    fecha: "2026-10-16",
    entrada: { diario: 800, dia: "regular-holiday-rest-day", horas: 2, nocturnas: 0 },
    esperado: { total: 676, jornada: 2080 },
  },
  {
    nombre: "Night hours above overtime hours",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-16",
    entrada: { diario: 800, dia: "ordinary", horas: 1, nocturnas: 2 },
    esperaError: true,
  },
]);
