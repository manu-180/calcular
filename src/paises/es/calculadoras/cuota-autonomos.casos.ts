import { definirCasos } from "@/motor/calculo";
import cuotaAutonomos from "./cuota-autonomos";

const ORDEN = "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-7296";

export default definirCasos(cuotaAutonomos, [
  {
    nombre: "24.000 euros de rendimiento, persona física",
    origen: {
      tipo: "recalculado",
      url: ORDEN,
      detalle: "24.000 − 7 % = 22.320; 1.860 al mes: tramo 5 general (base mínima 1.209,15). Tipo 28,30 + 1,30 + 0,90 + 0,10 + 0,90 = 31,50 %. Cuota 380,88.",
    },
    fecha: "2026-10-14",
    entrada: { rendimiento: 24000, tipoAutonomo: "general", base: null },
    esperado: { rendimientoMensual: 1860, tramo: "Tramo 5 de la tabla general", baseMinima: 1209.15, tipoTotal: 31.5, cuota: 380.88, cuotaAnual: 4570.56, cuotaMaxima: 639.45 },
  },
  {
    nombre: "9.000 euros: tabla reducida",
    origen: { tipo: "recalculado", url: ORDEN, detalle: "9.000 − 7 % = 8.370; 697,50 al mes: tramo 2 reducido (base mínima 718,95). Cuota 226,47." },
    fecha: "2026-10-14",
    entrada: { rendimiento: 9000, tipoAutonomo: "general", base: null },
    esperado: { tramo: "Tramo 2 de la tabla reducida", cuota: 226.47 },
  },
  {
    nombre: "Autónomo societario con 90.000 euros",
    origen: { tipo: "recalculado", url: ORDEN, detalle: "90.000 − 3 % = 87.300; 7.275 al mes: tramo 12 (base mínima 1.928,10, máxima 5.101,20). Cuota mínima 607,35 y máxima 1.606,88." },
    fecha: "2026-10-14",
    entrada: { rendimiento: 90000, tipoAutonomo: "societario", base: null },
    esperado: { tramo: "Tramo 12 de la tabla general", cuota: 607.35, cuotaMaxima: 1606.88 },
  },
  {
    nombre: "Base elegida dentro del tramo",
    origen: { tipo: "recalculado", detalle: "Tramo 5 con base de 1.500: 1.500 × 31,50 % = 472,50." },
    fecha: "2026-10-14",
    entrada: { rendimiento: 24000, tipoAutonomo: "general", base: 1500 },
    esperado: { base: 1500, cuota: 472.5 },
  },
  {
    nombre: "Base por encima de la máxima del tramo",
    origen: { tipo: "recalculado", detalle: "En el tramo 5 la base máxima es 2.030." },
    fecha: "2026-10-14",
    entrada: { rendimiento: 24000, tipoAutonomo: "general", base: 3000 },
    esperaError: true,
  },
]);
