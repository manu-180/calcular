import { definirCasos } from "@/motor/calculo";
import prestacionesLaborales from "./prestaciones-laborales";

export default definirCasos(prestacionesLaborales, [
  {
    nombre: "Despido sin preaviso con cinco años justos",
    origen: {
      tipo: "recalculado",
      detalle: "CT art. 116 e: más de dos años, 2 meses de preaviso (60 días). 20000 / 30 × 60 = 40000. Art. 120 c: un mes por año, 5 × 20000 = 100000. Total 140000.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 20000, fechaIngreso: "2021-10-01", fechaSalida: "2026-09-30", motivo: "despido", preavisoDado: false, microempresa: false },
    esperado: { tiempo: "5 años", diasPreaviso: 60, preaviso: 40000, mesesCesantia: 5, cesantia: 100000, total: 140000 },
  },
  {
    nombre: "Despido con 3 años, 6 meses y 15 días",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 120 c: 3 meses de salario más la fracción proporcional (6 meses y 15 días = 195 / 360). 24000 × (3 + 195/360) = 85000. Preaviso de 60 días: 800 × 60 = 48000.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 24000, fechaIngreso: "2023-01-01", fechaSalida: "2026-07-15", motivo: "despido", preavisoDado: false, microempresa: false },
    esperado: { tiempo: "3 años, 6 meses, 15 días", diasPreaviso: 60, preaviso: 48000, cesantia: 85000, total: 133000 },
  },
  {
    nombre: "Despido a los ocho meses",
    origen: { tipo: "recalculado", detalle: "Art. 116 c: de seis meses a un año, dos semanas (14 días): 500 × 14 = 7000. Art. 120 b: 20 días: 500 × 20 = 10000." },
    fecha: "2026-10-07",
    entrada: { salario: 15000, fechaIngreso: "2026-01-01", fechaSalida: "2026-08-31", motivo: "despido", preavisoDado: false, microempresa: false },
    esperado: { diasPreaviso: 14, preaviso: 7000, cesantia: 10000, total: 17000 },
  },
  {
    nombre: "Despido con tres meses justos",
    origen: { tipo: "recalculado", detalle: "Art. 116 b: de tres a seis meses, una semana (7 días): 300 × 7 = 2100. Art. 120 a: no menos de tres meses, 10 días: 300 × 10 = 3000." },
    fecha: "2026-10-07",
    entrada: { salario: 9000, fechaIngreso: "2026-01-01", fechaSalida: "2026-03-31", motivo: "despido", preavisoDado: false, microempresa: false },
    esperado: { tiempo: "3 meses", diasPreaviso: 7, preaviso: 2100, cesantia: 3000, total: 5100 },
  },
  {
    nombre: "Despido a los dos meses: solo preaviso de 24 horas",
    origen: { tipo: "recalculado", detalle: "Art. 116 a: menos de tres meses, 24 horas (1 día): 300. Sin cesantía (art. 120 a pide tres meses)." },
    fecha: "2026-10-07",
    entrada: { salario: 9000, fechaIngreso: "2026-07-01", fechaSalida: "2026-08-31", motivo: "despido", preavisoDado: false, microempresa: false },
    esperado: { diasPreaviso: 1, preaviso: 300, mesesCesantia: null, cesantia: 0, total: 300 },
  },
  {
    nombre: "Treinta años y medio: la cesantía se topa en 25 meses",
    origen: { tipo: "recalculado", detalle: "Decreto 150-2008, art. 120 d: tope de 25 meses. 25 × 18000 = 450000. Preaviso 60 días: 600 × 60 = 36000." },
    fecha: "2026-10-07",
    entrada: { salario: 18000, fechaIngreso: "1996-01-01", fechaSalida: "2026-06-30", motivo: "despido", preavisoDado: false, microempresa: false },
    esperado: { mesesCesantia: 25, cesantia: 450000, preaviso: 36000, total: 486000 },
  },
  {
    nombre: "El mismo caso en una microempresa: tope de 15 meses",
    origen: { tipo: "recalculado", detalle: "Decreto 150-2008, art. 120-A: hasta 10 empleados, 15 meses. 15 × 18000 = 270000. Con preaviso trabajado no se suma." },
    fecha: "2026-10-07",
    entrada: { salario: 18000, fechaIngreso: "1996-01-01", fechaSalida: "2026-06-30", motivo: "despido", preavisoDado: true, microempresa: true },
    esperado: { mesesCesantia: 15, cesantia: 270000, preaviso: 0, total: 270000 },
  },
  {
    nombre: "Renuncia con 20 años: 35 % de la cesantía",
    origen: { tipo: "recalculado", detalle: "Decreto 150-2008, art. 120 g: 15 años o más y renuncia, 35 % de lo que da el literal c. 0.35 × 20 × 12000 = 84000." },
    fecha: "2026-10-07",
    entrada: { salario: 12000, fechaIngreso: "2006-07-01", fechaSalida: "2026-06-30", motivo: "renuncia", preavisoDado: false, microempresa: false },
    esperado: { diasPreaviso: 0, preaviso: 0, cesantia: 84000, total: 84000 },
  },
  {
    nombre: "Renuncia con 10 años: no hay cesantía",
    origen: { tipo: "recalculado", detalle: "Art. 120 g exige 15 años de trabajo continuo para cobrar al renunciar." },
    fecha: "2026-10-07",
    entrada: { salario: 12000, fechaIngreso: "2016-07-01", fechaSalida: "2026-06-30", motivo: "renuncia", preavisoDado: false, microempresa: false },
    esperado: { cesantia: 0, total: 0 },
  },
  {
    nombre: "Fecha de salida anterior al ingreso",
    origen: { tipo: "recalculado", detalle: "Entrada imposible." },
    fecha: "2026-10-07",
    entrada: { salario: 12000, fechaIngreso: "2026-07-01", fechaSalida: "2026-06-30", motivo: "despido", preavisoDado: false, microempresa: false },
    esperaError: true,
  },
]);
