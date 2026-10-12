import { definirCasos } from "@/motor/calculo";
import desahucio from "./desahucio";

export default definirCasos(desahucio, [
  {
    nombre: "Renuncia con 4 años y medio",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 184 y 185 del Código del Trabajo. Aviso el 1/10/2026: salida 16/10/2026 (15 días), liquidación hasta el 16/10/2026. Del 1/4/2022 al 16/10/2026: 4 años completos. 25 % × 900 = 225 por año × 4 = 900.",
    },
    fecha: "2026-10-01",
    entrada: { inicio: "2022-04-01", aviso: "2026-10-01", remuneracion: 900 },
    esperado: { anios: 4, porAnio: 225, bonificacion: 900, salida: "2026-10-16", pago: "2026-10-16" },
  },
  {
    nombre: "El año se completa con los quince días del aviso",
    origen: {
      tipo: "recalculado",
      detalle: "Ingreso 10/10/2025, aviso 1/10/2026, salida 16/10/2026: del 10/10/2025 al 16/10/2026 hay 1 año. 25 % × 482 = 120,50.",
    },
    fecha: "2026-10-01",
    entrada: { inicio: "2025-10-10", aviso: "2026-10-01", remuneracion: 482 },
    esperado: { anios: 1, porAnio: 120.5, bonificacion: 120.5 },
  },
  {
    nombre: "Menos de un año: sin bonificación",
    origen: { tipo: "recalculado", detalle: "Del 1/3/2026 al 16/10/2026 no hay año completo: bonificación 0." },
    fecha: "2026-10-01",
    entrada: { inicio: "2026-03-01", aviso: "2026-10-01", remuneracion: 700 },
    esperado: { anios: 0, bonificacion: 0 },
  },
  {
    nombre: "Aviso anterior al ingreso",
    origen: { tipo: "recalculado", detalle: "Entrada imposible: tiene que dar error." },
    fecha: "2026-10-01",
    entrada: { inicio: "2026-05-01", aviso: "2026-04-30", remuneracion: 700 },
    esperaError: true,
  },
]);
