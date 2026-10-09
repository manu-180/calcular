import { definirCasos } from "@/motor/calculo";
import inflacion from "./inflacion";

export default definirCasos(inflacion, [
  {
    nombre: "500 mil pesos de agosto de 2025 llevados a agosto de 2026",
    origen: {
      tipo: "recalculado",
      url: "https://www.sii.cl/valores_y_fechas/utm/utm2026.htm",
      detalle:
        "IPC (base 2023 = 100) agosto 2025 = 108,66, julio 2026 = 112,45, agosto 2026 = 113,15, diciembre 2025 = 109,26 (SII). 500.000 × 113,15 / 108,66 = 520.661. Anual 4,1322 % (INE: 4,1 %). Mensual 0,6225 % (INE: 0,6 %).",
    },
    fecha: "2026-09-15",
    entrada: { monto: 500000, desde: "2025-08-01", hasta: "2026-08-31" },
    esperado: { montoActualizado: 520661, acumulada: 4.1322, interanual: 4.1322, mensual: 0.6225, indiceInicial: 108.66, indiceFinal: 113.15 },
    tolerancia: 0.0001,
  },
  {
    nombre: "Variación acumulada del año a agosto de 2026",
    origen: { tipo: "recalculado", detalle: "Diciembre 2025 = 109,26 y agosto 2026 = 113,15: 113,15 / 109,26 − 1 = 3,5603 % (el SII publica 3,6 % acumulado 2026)." },
    fecha: "2026-09-15",
    entrada: { monto: 100000, desde: "2025-12-01", hasta: "2026-08-01" },
    esperado: { acumulada: 3.5603, montoActualizado: 103560 },
    tolerancia: 0.0001,
  },
  {
    nombre: "Mes anterior a la base 2023 que publica el SII",
    origen: { tipo: "recalculado", detalle: "La serie cargada empieza en enero de 2024: diciembre de 2023 da error." },
    fecha: "2026-09-15",
    entrada: { monto: 100000, desde: "2023-12-01", hasta: "2026-08-01" },
    esperaError: true,
  },
]);
