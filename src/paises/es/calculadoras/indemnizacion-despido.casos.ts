import { definirCasos } from "@/motor/calculo";
import indemnizacion from "./indemnizacion-despido";

const ET = "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430";

export default definirCasos(indemnizacion, [
  {
    nombre: "Improcedente, contrato de 2020, 25.000 euros",
    origen: { tipo: "recalculado", url: ET, detalle: "Del 15/03/2020 al 14/10/2026: 79 meses (el empezado cuenta). 33 × 79 / 12 = 217,25 días × 25.000 / 365 = 14.880,14." },
    fecha: "2026-10-14",
    entrada: { alta: "2020-03-15", baja: "2026-10-14", bruto: 25000, tipo: "improcedente" },
    esperado: { dias: 217.25, salarioDiario: 68.49, indemnizacion: 14880.14, antiguedad: 6.58 },
  },
  {
    nombre: "Objetivo, mismo contrato",
    origen: { tipo: "recalculado", url: ET, detalle: "20 × 79 / 12 = 131,67 días × 68,4932 = 9.018,26." },
    fecha: "2026-10-14",
    entrada: { alta: "2020-03-15", baja: "2026-10-14", bruto: 25000, tipo: "objetivo" },
    esperado: { dias: 131.67, indemnizacion: 9018.26 },
  },
  {
    nombre: "Improcedente con contrato de 2005: tope de 720 días",
    origen: {
      tipo: "recalculado",
      url: ET,
      detalle: "81 meses antes del 12/02/2012 (303,75 días a 45) y 177 después (486,75 días a 33): 790,50 días. Como antes de 2012 no pasa de 720 días, el tope es 720 × 30.000 / 365 = 59.178,08.",
    },
    fecha: "2026-10-14",
    entrada: { alta: "2005-06-01", baja: "2026-10-14", bruto: 30000, tipo: "improcedente" },
    esperado: { mesesAntes2012: 81, mesesDesde2012: 177, dias: 790.5, indemnizacion: 59178.08 },
  },
  {
    nombre: "Improcedente con contrato de 1990: el tramo anterior a 2012 fija el tope",
    origen: { tipo: "recalculado", url: ET, detalle: "266 meses antes de 2012: 997,50 días, más de 720. Tope 997,50 × 30.000 / 365 = 81.986,30 (menos que 42 mensualidades, 105.000)." },
    fecha: "2026-10-14",
    entrada: { alta: "1990-01-01", baja: "2026-10-14", bruto: 30000, tipo: "improcedente" },
    esperado: { mesesAntes2012: 266, indemnizacion: 81986.3 },
  },
  {
    nombre: "Despido anterior al alta",
    origen: { tipo: "recalculado", detalle: "Entrada imposible." },
    fecha: "2026-10-14",
    entrada: { alta: "2026-10-14", baja: "2026-01-01", bruto: 30000, tipo: "objetivo" },
    esperaError: true,
  },
]);
