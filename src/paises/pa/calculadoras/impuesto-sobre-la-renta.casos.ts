import { definirCasos } from "@/motor/calculo";
import impuestoSobreLaRenta from "./impuesto-sobre-la-renta";

export default definirCasos(impuestoSobreLaRenta, [
  {
    nombre: "Renta de B/. 30,000",
    origen: { tipo: "recalculado", detalle: "Art. 700: (30,000 − 11,000) × 15% = 2,850. Tasa efectiva 9.5%. Por mes 237.50." },
    fecha: "2026-10-07",
    entrada: { rentaGravable: 30000 },
    esperado: { impuesto: 2850, tasaEfectiva: 9.5, mensual: 237.5 },
  },
  {
    nombre: "Justo en el límite exento",
    origen: { tipo: "recalculado", detalle: "Hasta 11,000 la tarifa es 0%." },
    fecha: "2026-10-07",
    entrada: { rentaGravable: 11000 },
    esperado: { impuesto: 0, tasaEfectiva: 0, mensual: 0 },
  },
  {
    nombre: "Cambio de tramo en B/. 50,000",
    origen: { tipo: "recalculado", detalle: "(50,000 − 11,000) × 15% = 5,850, la misma cuota fija del tramo siguiente." },
    fecha: "2026-10-07",
    entrada: { rentaGravable: 50000 },
    esperado: { impuesto: 5850 },
  },
  {
    nombre: "Renta de B/. 60,000",
    origen: { tipo: "recalculado", detalle: "5,850 + (60,000 − 50,000) × 25% = 8,350. Tasa efectiva 13.92%. Por mes 695.83." },
    fecha: "2026-10-07",
    entrada: { rentaGravable: 60000 },
    esperado: { impuesto: 8350, tasaEfectiva: 13.92, mensual: 695.83 },
  },
]);
