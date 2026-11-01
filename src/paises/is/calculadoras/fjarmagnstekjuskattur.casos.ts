import { definirCasos } from "@/motor/calculo";
import calc from "./fjarmagnstekjuskattur";

export default definirCasos(calc, [
  {
    nombre: "Einstaklingur með 500.000 kr. í vexti",
    origen: { tipo: "recalculado", detalle: "(500.000 - 300.000) x 22% = 44.000." },
    fecha: "2026-06-15",
    entrada: { vextir: 500000, adrar: 0, hjon: false },
    esperado: { stofn: 200000, skattur: 44000, eftir: 456000 },
  },
  {
    nombre: "Hjón með aðrar tekjur",
    origen: { tipo: "recalculado", detalle: "(700.000 - 600.000) + 100.000 = 200.000; x 22% = 44.000." },
    fecha: "2026-06-15",
    entrada: { vextir: 700000, adrar: 100000, hjon: true },
    esperado: { stofn: 200000, skattur: 44000 },
  },
  {
    nombre: "Undir frítekjumarki",
    origen: { tipo: "recalculado", detalle: "250.000 er undir 300.000." },
    fecha: "2026-06-15",
    entrada: { vextir: 250000, adrar: 0, hjon: false },
    esperado: { skattur: 0 },
  },
]);
