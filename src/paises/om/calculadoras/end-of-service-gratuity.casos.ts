import { definirCasos } from "@/motor/calculo";
import calculadora from "./end-of-service-gratuity";

export default definirCasos(calculadora, [
  {
    nombre: "Cinco años exactos",
    origen: { tipo: "recalculado", detalle: "1/1/2021 a 1/1/2026 = 1.826 días; 1.826 / 365 = 5,00274 años × 400 = 2.001,096." },
    fecha: "2026-10-26",
    entrada: { basico: 400, inicio: "2021-01-01", fin: "2026-01-01", motivo: "normal", sinGoce: 0 },
    esperado: { dias: 1826, gratificacion: 2001.096, porAnio: 400 },
  },
  {
    nombre: "Fracción de año con licencia sin goce",
    origen: { tipo: "recalculado", detalle: "1/1/2025 a 1/1/2026 = 365 días, menos 73 sin goce = 292; 292/365 = 0,8 × 500 = 400." },
    fecha: "2026-10-26",
    entrada: { basico: 500, inicio: "2025-01-01", fin: "2026-01-01", motivo: "normal", sinGoce: 73 },
    esperado: { dias: 292, gratificacion: 400 },
  },
  {
    nombre: "Despido del artículo 40",
    origen: { tipo: "recalculado", detalle: "Sin gratificación." },
    fecha: "2026-10-26",
    entrada: { basico: 400, inicio: "2021-01-01", fin: "2026-01-01", motivo: "article-40", sinGoce: 0 },
    esperado: { gratificacion: 0 },
  },
  {
    nombre: "Fechas invertidas",
    origen: { tipo: "recalculado", detalle: "Fin antes del inicio." },
    fecha: "2026-10-26",
    entrada: { basico: 400, inicio: "2026-01-01", fin: "2025-01-01", motivo: "normal", sinGoce: 0 },
    esperaError: true,
  },
]);
