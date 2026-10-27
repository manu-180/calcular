import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "2024 to 2025",
    origen: { tipo: "oficial", url: "https://legislation.mt/eli/ln/2026/36/eng", detalle: "L.N. 36 of 2026: index 1035.93 for 2025, an increase of 2.36 per cent from 2024 (1012.05)." },
    fecha: "2026-10-26",
    entrada: { monto: 1000, desde: 2024, hasta: 2025 },
    esperado: { variacion: 2.36, ajustado: 1023.6, inicial: 1012.05, final: 1035.93 },
  },
  {
    nombre: "€1,000 from 2015 to 2025",
    origen: { tipo: "recalculado", detalle: "Cap. 158, art. 13(3): 1000 × 1035.93 / 832.95 = 1,243.69; increase 24.37%." },
    fecha: "2026-10-26",
    entrada: { monto: 1000, desde: 2015, hasta: 2025 },
    esperado: { ajustado: 1243.69, variacion: 24.37 },
  },
  {
    nombre: "Going back in time",
    origen: { tipo: "recalculado", detalle: "500 × 100 / 1035.93 = 48.27." },
    fecha: "2026-10-26",
    entrada: { monto: 500, desde: 2025, hasta: 1946 },
    esperado: { ajustado: 48.27 },
  },
  { nombre: "Year without an index", origen: { tipo: "recalculado", detalle: "2026 has no index yet." }, fecha: "2026-10-26", entrada: { monto: 100, desde: 2020, hasta: 2026 }, esperaError: true },
]);
