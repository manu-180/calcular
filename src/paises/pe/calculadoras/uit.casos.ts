import { definirCasos } from "@/motor/calculo";
import uit from "./uit";

export default definirCasos(uit, [
  {
    nombre: "Una UIT en 2026",
    origen: { tipo: "oficial", url: "https://busquedas.elperuano.pe/dispositivo/NL/2469116-1", detalle: "DS 301-2025-EF: la UIT 2026 es S/ 5,500." },
    fecha: "2026-10-07",
    entrada: { direccion: "uit-a-soles", cantidad: 1 },
    esperado: { soles: 5500, uit: 5500 },
  },
  {
    nombre: "Siete UIT (la deducción de renta de trabajo)",
    origen: { tipo: "recalculado", detalle: "7 × 5,500 = 38,500." },
    fecha: "2026-10-07",
    entrada: { direccion: "uit-a-soles", cantidad: 7 },
    esperado: { soles: 38500 },
  },
  {
    nombre: "Soles a UIT",
    origen: { tipo: "recalculado", detalle: "48,125 / 5,500 = 8.75 UIT." },
    fecha: "2026-10-07",
    entrada: { direccion: "soles-a-uit", cantidad: 48125 },
    esperado: { uits: 8.75, soles: 48125 },
  },
  {
    nombre: "Media UIT",
    origen: { tipo: "recalculado", detalle: "0.5 × 5,500 = 2,750." },
    fecha: "2026-12-31",
    entrada: { direccion: "uit-a-soles", cantidad: 0.5 },
    esperado: { soles: 2750 },
  },
]);
