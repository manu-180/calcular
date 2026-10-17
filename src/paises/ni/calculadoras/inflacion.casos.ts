import { definirCasos } from "@/motor/calculo";
import inflacion from "./inflacion";

const INIDE = "https://www.inide.gob.ni/docs/ipc/ipc_2026/ipc_jul26/Cuadros_Estadisticas_IPC_julio_2026.xls";

export default definirCasos(inflacion, [
  {
    nombre: "Mil córdobas de julio 2025 llevados a julio 2026",
    origen: { tipo: "oficial", url: INIDE, detalle: "INIDE, IPC nacional: julio 2025 = 313.6184, junio 2026 = 326.3909, julio 2026 = 326.1628. Interanual publicada 4.00 %, mensual −0.07 %. 1000 × 326.1628 / 313.6184 = 1040.00." },
    fecha: "2026-10-08",
    entrada: { monto: 1000, desde: "2025-07-01", hasta: "2026-07-31" },
    esperado: { montoActualizado: 1040, variacionAcumulada: 4, variacionInteranual: 4, variacionMensual: -0.07, mesDestino: "julio de 2026" },
  },
  {
    nombre: "Acumulada del año a julio 2026",
    origen: { tipo: "oficial", url: INIDE, detalle: "INIDE: inflación acumulada a julio 2026 = 2.10 % (326.1628 / 319.4528). C$500 × 1.021005 = C$510.50." },
    fecha: "2026-10-08",
    entrada: { monto: 500, desde: "2025-12-01", hasta: "2026-07-01" },
    esperado: { montoActualizado: 510.5, variacionAcumulada: 2.1 },
  },
  {
    nombre: "Un mes sin IPC publicado usa el último disponible",
    origen: { tipo: "recalculado", detalle: "Al 8/10/2026 el último IPC del INIDE es julio. Junio a julio: 1000 × 326.1628 / 326.3909 = 999.30." },
    fecha: "2026-10-08",
    // El último dato va fijo: con la serie real el caso se rompía al entrar el mes siguiente y frenaba la publicación del país.
    valores: { "ni.ipc": { fecha: "2026-07-01", valor: 326.1628 } },
    entrada: { monto: 1000, desde: "2026-06-01", hasta: "2026-10-08" },
    esperado: { montoActualizado: 999.3, mesDestino: "julio de 2026" },
  },
  {
    nombre: "Un mes anterior a enero 2011 da error",
    origen: { tipo: "recalculado", detalle: "El cuadro del INIDE no trae los meses de 2008 a 2010; la serie cargada empieza en enero 2011." },
    fecha: "2026-10-08",
    entrada: { monto: 1000, desde: "2010-12-01", hasta: "2026-07-01" },
    esperaError: true,
  },
]);
