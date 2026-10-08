import { definirCasos } from "@/motor/calculo";
import inflacion from "./inflacion";

export default definirCasos(inflacion, [
  {
    nombre: "Un millón de agosto de 2025 llevado a agosto de 2026",
    origen: {
      tipo: "recalculado",
      detalle:
        "IPC agosto 2025 = 150,99, julio 2026 = 159,79 y agosto 2026 = 160,42 (DANE). 1.000.000 × 160,42 / 150,99 = 1.062.454. Anual: 6,2454 % (el DANE publica 6,24 %). Mensual: 160,42 / 159,79 − 1 = 0,3943 % (DANE: 0,39 %).",
    },
    fecha: "2026-09-10",
    entrada: { monto: 1000000, desde: "2025-08-01", hasta: "2026-08-20" },
    esperado: { montoActualizado: 1062454, acumulada: 6.2454, interanual: 6.2454, mensual: 0.3943, indiceInicial: 150.99, indiceFinal: 160.42 },
    tolerancia: 0.0001,
  },
  {
    nombre: "Reajuste de arriendo 2026 con el IPC del año 2025",
    origen: {
      tipo: "recalculado",
      detalle:
        "Ley 820 de 2003, art. 20: el reajuste no puede pasar el IPC del año calendario anterior. IPC diciembre 2024 = 144,88 y diciembre 2025 = 152,27: 5,1008 %. Canon de 1.500.000 × 152,27 / 144,88 = 1.576.512.",
    },
    fecha: "2026-02-15",
    entrada: { monto: 1500000, desde: "2024-12-01", hasta: "2025-12-31" },
    esperado: { montoActualizado: 1576512, acumulada: 5.1008 },
    tolerancia: 0.0001,
  },
  {
    nombre: "Mes final todavía no publicado",
    origen: { tipo: "recalculado", detalle: "Cada punto mensual lleva fecha del día 1, así que al 10/09/2026 el último IPC que se usa es el de septiembre de 2026. Pedir hasta noviembre lleva el cálculo hasta septiembre; de septiembre a septiembre la variación es 0." },
    fecha: "2026-09-10",
    entrada: { monto: 100, desde: "2026-09-01", hasta: "2026-11-30" },
    esperado: { mesFinal: "septiembre de 2026", acumulada: 0 },
  },
  {
    nombre: "Fecha inicial anterior al año 2000",
    origen: { tipo: "recalculado", detalle: "La serie cargada empieza en enero de 2000." },
    fecha: "2026-09-10",
    entrada: { monto: 100, desde: "1998-05-01", hasta: "2026-01-01" },
    esperaError: true,
  },
]);
