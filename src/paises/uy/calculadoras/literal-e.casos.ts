import { definirCasos } from "@/motor/calculo";
import literalE from "./literal-e";

export default definirCasos(literalE, [
  {
    nombre: "Empresa con más de dos años que factura $ 1.200.000",
    origen: {
      tipo: "oficial",
      url: "https://www.impo.com.uy/bases/decretos/310-2025",
      detalle: "Decreto 310/025: $ 5.910 por mes en 2026. Límite: 305.000 UI × 6,4237 (UI del 1/1/2026) = 1.959.228,50.",
    },
    fecha: "2026-10-12",
    entrada: { ingresos: 1200000, etapa: "3", cfe: false },
    esperado: { topePesos: 1959228.5, dentro: "Sí", pagoBase: 5910, pagoMensual: 5910, pagoAnual: 70920 },
  },
  {
    nombre: "Primer año de actividad",
    origen: { tipo: "recalculado", url: "https://www.impo.com.uy/bases/decretos/220-1998/106", detalle: "Decreto 220/998, art. 106: 25 % los primeros 12 meses. 5.910 × 25 % = 1.477,50." },
    fecha: "2026-10-12",
    entrada: { ingresos: 600000, etapa: "1", cfe: false },
    esperado: { pagoMensual: 1477.5 },
  },
  {
    nombre: "Con e-factura: tope del 3,3 % de lo facturado",
    origen: { tipo: "recalculado", detalle: "1.200.000 / 12 = 100.000 por mes; 3,3 % = 3.300, menos que 5.910." },
    fecha: "2026-10-12",
    entrada: { ingresos: 1200000, etapa: "3", cfe: true },
    esperado: { pagoBase: 5910, pagoMensual: 3300 },
  },
  {
    nombre: "Pasa el límite",
    origen: { tipo: "recalculado", detalle: "2.500.000 pasa 1.959.228,50: fuera del literal E." },
    fecha: "2026-10-12",
    entrada: { ingresos: 2500000, etapa: "3", cfe: false },
    esperado: { dentro: "No", pagoMensual: null },
  },
]);
