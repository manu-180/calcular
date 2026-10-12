import { definirCasos } from "@/motor/calculo";
import aguinaldoProporcional from "./aguinaldo-proporcional";

export default definirCasos(aguinaldoProporcional, [
  {
    nombre: "Renuncia a fin de julio, ingreso del año anterior",
    origen: {
      tipo: "recalculado",
      url: "https://www.bacn.gov.py/leyes-paraguayas/2608/ley-n-213-establece-el-codigo-del-trabajo",
      detalle: "Se cuenta desde el 1/1/2026 hasta el 31/7: 212 días. 3.000.000 × 212 / 30 = 21.200.000; / 12 = 1.766.666,67, redondeado 1.766.667 (arts. 243 y 244).",
    },
    fecha: "2026-10-12",
    entrada: { salario: 3000000, ingreso: "2025-05-10", egreso: "2026-07-31", extras: 0 },
    esperado: { desde: "2026-01-01", dias: 212, devengado: 21200000, aguinaldo: 1766667 },
  },
  {
    nombre: "Ingreso en marzo con horas extra",
    origen: {
      tipo: "recalculado",
      detalle: "Del 16/3 al 31/12/2026: 291 días. 3.044.000 × 291 / 30 = 29.526.800, más 600.000 de extras = 30.126.800; / 12 = 2.510.566,67, redondeado 2.510.567.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 3044000, ingreso: "2026-03-16", egreso: "2026-12-31", extras: 600000 },
    esperado: { dias: 291, devengado: 30126800, aguinaldo: 2510567 },
  },
  {
    nombre: "Egreso antes del ingreso",
    origen: { tipo: "recalculado", detalle: "Fechas invertidas." },
    fecha: "2026-10-12",
    entrada: { salario: 3000000, ingreso: "2026-05-01", egreso: "2026-04-01", extras: 0 },
    esperaError: true,
  },
]);
