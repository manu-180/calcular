import { definirCasos } from "@/motor/calculo";
import inflacion from "./inflacion";

export default definirCasos(inflacion, [
  {
    nombre: "Mil soles de agosto de 2025 llevados a agosto de 2026",
    origen: {
      tipo: "recalculado",
      url: "https://estadisticas.bcrp.gob.pe/estadisticas/series/api/PN38705PM/json/2025-1/2026-12",
      detalle:
        "IPC Lima Metropolitana (dic. 2021 = 100): agosto 2025 = 115,586828, julio 2026 = 120,635759, agosto 2026 = 120,716351. 1000 × 120,716351 / 115,586828 = 1044,38. Anual 4,4378 % (BCRP PN01273PM: 4,44 %). Mensual 0,0668 %.",
    },
    fecha: "2026-09-10",
    entrada: { monto: 1000, desde: "2025-08-01", hasta: "2026-08-31" },
    esperado: { montoActualizado: 1044.38, acumulada: 4.4378, interanual: 4.4378, mensual: 0.0668 },
    tolerancia: 0.0001,
  },
  {
    nombre: "Acumulada de enero a agosto de 2026",
    origen: {
      tipo: "recalculado",
      detalle: "Diciembre 2025 = 115,894705 y agosto 2026 = 120,716351: 4,1604 %, igual a la variación acumulada que publica el BCRP (PN01272PM: 4,16 %).",
    },
    fecha: "2026-09-10",
    entrada: { monto: 2500, desde: "2025-12-15", hasta: "2026-08-15" },
    esperado: { acumulada: 4.1604, montoActualizado: 2604.01 },
    tolerancia: 0.0001,
  },
  {
    nombre: "Fecha inicial posterior al último índice",
    origen: { tipo: "recalculado", detalle: "Al 10/09/2026 el último IPC es septiembre de 2026; octubre todavía no existe." },
    fecha: "2026-09-10",
    entrada: { monto: 1000, desde: "2026-10-01", hasta: "2026-12-01" },
    esperaError: true,
  },
]);
