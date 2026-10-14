import { definirCasos } from "@/motor/calculo";
import ipc from "./ipc";

export default definirCasos(ipc, [
  {
    nombre: "Variación anual de agosto de 2026",
    origen: {
      tipo: "oficial",
      url: "https://servicios.ine.es/wstempus/js/ES/DATOS_TABLA/76125?nult=3",
      detalle: "El INE publica para agosto de 2026 una variación anual del 4,3 % y mensual del 0,7 % (104,638 frente a 100,345 y 103,899).",
    },
    fecha: "2026-10-14",
    entrada: { monto: 1000, desde: "2025-08-01", hasta: "2026-08-31" },
    esperado: { montoActualizado: 1042.78, indiceInicial: 100.345, indiceFinal: 104.638 },
    tolerancia: 0.01,
  },
  {
    nombre: "Actualizar 1.000 euros de enero de 2020",
    origen: { tipo: "recalculado", detalle: "104,638 / 82,032 = 1,27558. 1.000 × 1,27558 = 1.275,58." },
    fecha: "2026-10-14",
    entrada: { monto: 1000, desde: "2020-01-15", hasta: "2026-08-01" },
    esperado: { montoActualizado: 1275.58, mesInicial: "enero de 2020", mesFinal: "agosto de 2026" },
  },
  {
    nombre: "Mes final todavía sin publicar",
    origen: { tipo: "recalculado", detalle: "Con fecha de octubre de 2026 el último índice es el de agosto: el cálculo llega hasta agosto." },
    fecha: "2026-10-14",
    entrada: { monto: 1000, desde: "2025-01-01", hasta: "2026-10-14" },
    esperado: { montoActualizado: 1061.46, mesFinal: "agosto de 2026" },
  },
  {
    nombre: "Mes inicial sin publicar",
    origen: { tipo: "recalculado", detalle: "No hay IPC de diciembre de 2026 a esa fecha." },
    fecha: "2026-10-14",
    entrada: { monto: 1000, desde: "2026-12-01", hasta: "2026-12-31" },
    esperaError: true,
  },
]);
