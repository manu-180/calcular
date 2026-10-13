import { definirCasos } from "@/motor/calculo";
import inflacion from "./inflacion";

const BCR = "https://estadisticas.bcr.gob.sv/serie/indice-de-precios-al-consumidor-ipc";

export default definirCasos(inflacion, [
  {
    nombre: "Cien dólares de septiembre 2025 llevados a septiembre 2026",
    origen: { tipo: "recalculado", detalle: "IPC BCR: septiembre 2025 = 130.89, septiembre 2026 = 135.60, agosto 2026 = 134.99. 100 × 135.60 / 130.89 = 103.598 → 103.60. Mensual: 135.60 / 134.99 − 1 = 0.45 %." },
    fecha: "2026-10-08",
    entrada: { monto: 100, desde: "2025-09-01", hasta: "2026-09-15" },
    esperado: { montoActualizado: 103.6, variacionAcumulada: 3.6, variacionInteranual: 3.6, variacionMensual: 0.45, mesOrigen: "septiembre de 2025", mesDestino: "septiembre de 2026" },
  },
  {
    nombre: "Desde la base del índice (diciembre 2009 = 100)",
    origen: { tipo: "oficial", url: BCR, detalle: "El IPC de agosto 2026 es 134.99 con base diciembre 2009 = 100: $200 de diciembre 2009 equivalen a 200 × 1.3499 = $269.98." },
    fecha: "2026-10-08",
    entrada: { monto: 200, desde: "2009-12-20", hasta: "2026-08-31" },
    esperado: { montoActualizado: 269.98, variacionAcumulada: 34.99, indiceOrigen: 100, indiceDestino: 134.99 },
  },
  {
    nombre: "Un mes sin IPC publicado usa el último disponible",
    origen: { tipo: "recalculado", detalle: "Al 8/10/2026 el último IPC es el de septiembre (135.60). 100 × 135.60 / 134.99 = 100.45." },
    fecha: "2026-10-08",
    // El último dato va fijo: con la serie real el caso se rompía al entrar el mes siguiente y frenaba la publicación del país.
    valores: { "sv.ipc": { fecha: "2026-09-01", valor: 135.6 } },
    entrada: { monto: 100, desde: "2026-08-01", hasta: "2026-10-08" },
    esperado: { montoActualizado: 100.45, mesDestino: "septiembre de 2026" },
  },
  {
    nombre: "Un mes anterior al inicio de la serie da error",
    origen: { tipo: "recalculado", detalle: "La serie del BCR empieza en diciembre 2009." },
    fecha: "2026-10-08",
    entrada: { monto: 100, desde: "2009-11-30", hasta: "2026-09-01" },
    esperaError: true,
  },
]);
