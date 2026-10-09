import { definirCasos } from "@/motor/calculo";
import inflacion from "./inflacion";

export default definirCasos(inflacion, [
  {
    nombre: "Bs 10.000 de septiembre 2025 llevados a septiembre 2026",
    origen: {
      tipo: "oficial",
      url: "https://www.bcb.gob.bo/?q=indicadores_inflacion",
      detalle:
        "IPC del INE: septiembre 2026 152,85022278 y septiembre 2025 144,60877074. 10.000 × 152,85022278 / 144,60877074 = 10.569,91. El BCB publica para septiembre 2026: mensual 0,85 %, acumulada 3,880 % y anual 5,70 %.",
    },
    fecha: "2026-10-08",
    entrada: { monto: 10000, desde: "2025-09-10", hasta: "2026-09-30" },
    esperado: {
      montoActualizado: 10569.91,
      mesDesde: "septiembre de 2025",
      mesHasta: "septiembre de 2026",
      variacionPeriodo: 5.6991,
      variacionMensual: 0.8452,
      variacionAnio: 3.8833,
      variacionInteranual: 5.6991,
    },
    tolerancia: 0.0001,
  },
  {
    nombre: "Mes de destino todavía sin IPC: usa el último publicado",
    origen: { tipo: "recalculado", detalle: "El 8/10/2026 el último IPC es el de septiembre 2026. 2.500 × 152,85022278 / 149,06117044 (enero 2026) = 2.563,55." },
    fecha: "2026-10-08",
    entrada: { monto: 2500, desde: "2026-01-20", hasta: "2026-10-08" },
    esperado: { montoActualizado: 2563.55, mesHasta: "septiembre de 2026" },
  },
  {
    nombre: "Mes anterior a la serie cargada",
    origen: { tipo: "recalculado", detalle: "La serie del INE en base 2016 cargada arranca en enero de 2018." },
    fecha: "2026-10-08",
    entrada: { monto: 1000, desde: "2017-12-01", hasta: "2026-01-01" },
    esperaError: true,
  },
  {
    nombre: "Origen posterior al destino",
    origen: { tipo: "recalculado", detalle: "El mes de origen tiene que ser anterior al de destino." },
    fecha: "2026-10-08",
    entrada: { monto: 1000, desde: "2026-06-01", hasta: "2026-03-01" },
    esperaError: true,
  },
]);
