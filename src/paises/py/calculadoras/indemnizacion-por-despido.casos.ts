import { definirCasos } from "@/motor/calculo";
import indemnizacionPorDespido from "./indemnizacion-por-despido";

export default definirCasos(indemnizacionPorDespido, [
  {
    nombre: "7 años y 8 meses, sin preaviso",
    origen: {
      tipo: "recalculado",
      url: "https://www.dnit.gov.py/web/portal-institucional/w/m-ley-n-496-94",
      detalle: "Salario diario 3.000.000 / 30 = 100.000. Art. 91 (Ley 496): 7 años + fracción de 8 meses = 8 años × 15 = 120 días = 12.000.000. Art. 87: más de 5 y hasta 10 años, 60 días = 6.000.000.",
    },
    fecha: "2026-07-01",
    entrada: { salario: 3000000, ingreso: "2018-11-01", egreso: "2026-06-30", preavisoTrabajado: false },
    esperado: { anios: 8, indemnizacion: 12000000, diasPreaviso: 60, preaviso: 6000000, total: 18000000, indemnizacionDoble: null },
  },
  {
    nombre: "Seis meses justos: sin indemnización",
    origen: { tipo: "recalculado", detalle: "Del 1/1 al 30/6/2026 son seis meses exactos: la fracción no es superior a seis meses y no hay años indemnizables. Preaviso de 30 días = 3.000.000." },
    fecha: "2026-07-01",
    entrada: { salario: 3000000, ingreso: "2026-01-01", egreso: "2026-06-30", preavisoTrabajado: false },
    esperado: { anios: 0, indemnizacion: 0, diasPreaviso: 30, preaviso: 3000000, total: 3000000 },
  },
  {
    nombre: "Seis meses y un día: un año indemnizable",
    origen: { tipo: "recalculado", detalle: "Un día más que el caso anterior: la fracción pasa de seis meses y cuenta como un año. 15 × 100.000 = 1.500.000, más 30 días de preaviso." },
    fecha: "2026-07-02",
    entrada: { salario: 3000000, ingreso: "2026-01-01", egreso: "2026-07-01", preavisoTrabajado: false },
    esperado: { anios: 1, indemnizacion: 1500000, diasPreaviso: 30, total: 4500000 },
  },
  {
    nombre: "Un año exacto con preaviso trabajado",
    origen: { tipo: "recalculado", detalle: "Del 1/8/2025 al 31/7/2026 es un año exacto: preaviso de 30 días (hasta un año). Como se trabajó, no se paga. Indemnización 15 × 100.000." },
    fecha: "2026-08-01",
    entrada: { salario: 3000000, ingreso: "2025-08-01", egreso: "2026-07-31", preavisoTrabajado: true },
    esperado: { anios: 1, indemnizacion: 1500000, diasPreaviso: 30, preaviso: 0, total: 1500000 },
  },
  {
    nombre: "Un año y un día: preaviso de 45 días",
    origen: { tipo: "recalculado", detalle: "Art. 87 b): más de un año. 45 × 100.000 = 4.500.000. La fracción de un día no suma año indemnizable." },
    fecha: "2026-08-02",
    entrada: { salario: 3000000, ingreso: "2025-08-01", egreso: "2026-08-01", preavisoTrabajado: false },
    esperado: { anios: 1, diasPreaviso: 45, preaviso: 4500000 },
  },
  {
    nombre: "Más de diez años: estabilidad",
    origen: { tipo: "recalculado", detalle: "11 años y 14 días: 11 años × 15 × 200.000 = 33.000.000. Preaviso de 90 días = 18.000.000. Doble por estabilidad (art. 97): 66.000.000." },
    fecha: "2026-07-16",
    entrada: { salario: 6000000, ingreso: "2015-07-01", egreso: "2026-07-14", preavisoTrabajado: false },
    esperado: { anios: 11, indemnizacion: 33000000, diasPreaviso: 90, preaviso: 18000000, indemnizacionDoble: 66000000 },
  },
  {
    nombre: "Egreso antes del ingreso",
    origen: { tipo: "recalculado", detalle: "Fechas invertidas." },
    fecha: "2026-10-07",
    entrada: { salario: 3000000, ingreso: "2026-05-01", egreso: "2026-04-01", preavisoTrabajado: false },
    esperaError: true,
  },
]);
