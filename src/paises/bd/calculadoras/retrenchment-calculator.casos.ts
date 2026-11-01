import { definirCasos } from "@/motor/calculo";
import calculadora from "./retrenchment-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Despido por excedente sin preaviso",
    origen: { tipo: "recalculado", detalle: "Art. 20(2): 30 días por año = 25,000 × 5 = 1,25,000; sin el mes de preaviso, un mes de salario = 25,000. Total 1,50,000." },
    fecha: "2026-10-24",
    entrada: { motivo: "retrenchment", salario: 25000, anios: 5, aviso: false, mensual: null, gratuity: null },
    esperado: { compensacion: 125000, pagoAviso: 25000, total: 150000, diasPorAnio: 30 },
  },
  {
    nombre: "Despido tras lay-off",
    origen: { tipo: "recalculado", detalle: "Art. 20(3): 1,25,000 más 15 días de salario (12,500), sin preaviso exigido. Total 1,37,500." },
    fecha: "2026-10-24",
    entrada: { motivo: "layoff", salario: 25000, anios: 5, aviso: false, mensual: null, gratuity: null },
    esperado: { compensacion: 125000, extra: 12500, pagoAviso: 0, total: 137500 },
  },
  {
    nombre: "Discharge sin un año completo",
    origen: { tipo: "recalculado", detalle: "Art. 22(2) exige al menos un año continuo: 0." },
    fecha: "2026-10-24",
    entrada: { motivo: "discharge", salario: 20000, anios: 0, aviso: true, mensual: null, gratuity: null },
    esperado: { total: 0 },
  },
  {
    nombre: "Terminación simple de un mensualizado sin preaviso",
    origen: { tipo: "recalculado", detalle: "Art. 26: 30 días por año = 30,000 × 4 = 1,20,000; preaviso de 120 días no dado = 1,20,000. Total 2,40,000." },
    fecha: "2026-10-24",
    entrada: { motivo: "termination", salario: 30000, anios: 4, aviso: false, mensual: true, gratuity: null },
    esperado: { compensacion: 120000, pagoAviso: 120000, total: 240000 },
  },
  {
    nombre: "Terminación con gratuity mayor",
    origen: { tipo: "recalculado", detalle: "18,000 × 3 = 54,000 contra gratuity 60,000: se paga la mayor." },
    fecha: "2026-10-24",
    entrada: { motivo: "termination", salario: 18000, anios: 3, aviso: true, mensual: false, gratuity: 60000 },
    esperado: { compensacion: 54000, total: 60000 },
  },
]);
