import { definirCasos } from "@/motor/calculo";
import vacaciones from "./vacaciones";

export default definirCasos(vacaciones, [
  {
    nombre: "Tres años con 15,000 al mes",
    origen: { tipo: "recalculado", detalle: "LFT art. 76: 12, 14, 16 → 16 días. Diario 500; pago 8000; prima 25 % = 2000; exenta 15 × 117.31 = 1759.65." },
    fecha: "2026-10-15",
    entrada: { anios: 3, sueldo: 15000, periodo: "mensual", prima: null },
    esperado: { dias: 16, diasSiguiente: 18, diario: 500, pago: 8000, prima: 2000, exenta: 1759.65, total: 10000 },
  },
  {
    nombre: "Primer año",
    origen: { tipo: "recalculado", detalle: "12 días × 300 = 3600; prima 900, debajo del exento." },
    fecha: "2026-10-15",
    entrada: { anios: 1, sueldo: 300, periodo: "diario", prima: null },
    esperado: { dias: 12, diasSiguiente: 14, pago: 3600, prima: 900, exenta: 900, total: 4500 },
  },
  {
    nombre: "Décimo año: último del bloque de 22 días",
    origen: { tipo: "recalculado", detalle: "Del sexto al décimo año: 22 días; en el undécimo, 24. 22 × 400 = 8800; prima 2200." },
    fecha: "2026-10-15",
    entrada: { anios: 10, sueldo: 400, periodo: "diario", prima: null },
    esperado: { dias: 22, diasSiguiente: 24, pago: 8800, prima: 2200, total: 11000 },
  },
  {
    nombre: "Prima pactada del 50 %",
    origen: { tipo: "recalculado", detalle: "Cinco años: 20 días × 500 = 10000; prima 50 % = 5000." },
    fecha: "2026-10-15",
    entrada: { anios: 5, sueldo: 500, periodo: "diario", prima: 50 },
    esperado: { dias: 20, diasSiguiente: 22, pago: 10000, prima: 5000, total: 15000 },
  },
  {
    nombre: "Prima menor al mínimo de ley",
    origen: { tipo: "recalculado", detalle: "LFT art. 80: la prima no puede ser menor a 25 %." },
    fecha: "2026-10-15",
    entrada: { anios: 2, sueldo: 500, periodo: "diario", prima: 20 },
    esperaError: true,
  },
]);
