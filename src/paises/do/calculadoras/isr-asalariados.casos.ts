import { definirCasos } from "@/motor/calculo";
import isrAsalariados from "./isr-asalariados";

const TABLA_DGII = "https://dgii.gov.do/publicacionesOficiales/tablaRetenciones/Retenciones/Retenciones%202023.pdf";

export default definirCasos(isrAsalariados, [
  {
    nombre: "Tabla DGII: RD$34,700 retiene 2.25",
    origen: { tipo: "oficial", url: TABLA_DGII, detalle: "Tabla de retención mensual para asalariados de la DGII, misma escala que rige en 2026: salario 34,700.00, retención 2.25." },
    fecha: "2026-10-07",
    entrada: { salario: 34700, tipoMonto: "sin-tss" },
    esperado: { base: 34700, tasa: 15, isrMensual: 2.25 },
  },
  {
    nombre: "Tabla DGII: RD$60,000 retiene 4,195.85",
    origen: { tipo: "oficial", url: TABLA_DGII, detalle: "Tabla de retención mensual de la DGII: salario 60,000.00, retención 4,195.85." },
    fecha: "2026-10-07",
    entrada: { salario: 60000, tipoMonto: "sin-tss" },
    esperado: { baseAnual: 720000, tasa: 20, isrMensual: 4195.85 },
  },
  {
    nombre: "Tabla DGII: RD$80,000 retiene 8,582.94",
    origen: { tipo: "oficial", url: TABLA_DGII, detalle: "Tabla de retención mensual de la DGII: salario 80,000.00, retención 8,582.94." },
    fecha: "2026-10-07",
    entrada: { salario: 80000, tipoMonto: "sin-tss" },
    esperado: { tasa: 25, isrMensual: 8582.94 },
  },
  {
    nombre: "Justo en el monto exento",
    origen: { tipo: "recalculado", detalle: "34,685 × 12 = 416,220, el límite del tramo exento: ISR 0." },
    fecha: "2026-10-07",
    entrada: { salario: 34685, tipoMonto: "sin-tss" },
    esperado: { exentoMensual: 34685, tasa: 0, isrMensual: 0 },
  },
  {
    nombre: "Desde el bruto: RD$60,000",
    origen: { tipo: "recalculado", detalle: "60,000 − SFS 1,824 − AFP 1,722 = 56,454. ISR anual 41,839.80; mensual 3,486.65." },
    fecha: "2026-10-07",
    entrada: { salario: 60000, tipoMonto: "bruto" },
    esperado: { sfs: 1824, afp: 1722, base: 56454, isrAnual: 41839.8, isrMensual: 3486.65 },
  },
]);
