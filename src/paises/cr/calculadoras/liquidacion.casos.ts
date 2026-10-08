import { definirCasos } from "@/motor/calculo";
import liquidacion from "./liquidacion";

export default definirCasos(liquidacion, [
  {
    nombre: "Despido sin preaviso después de cinco años y siete meses",
    origen: {
      tipo: "recalculado",
      detalle:
        "Salario diario 600.000 / 30 = 20.000. Preaviso (art. 28) 30 días = 600.000. Cesantía (art. 29) 6 años × 21,5 = 129 días = 2.580.000. Vacaciones 10 días = 200.000. Aguinaldo del 1/12/2025 al 30/9/2026 = 10 meses: 600.000 × 10 / 12 = 500.000. Total 3.880.000.",
    },
    fecha: "2026-10-07",
    entrada: {
      salario: 600000,
      fechaIngreso: "2021-03-01",
      fechaSalida: "2026-09-30",
      motivo: "despido",
      preavisoDado: false,
      vacaciones: 10,
      salariosAguinaldo: null,
    },
    esperado: { diasPreaviso: 30, preaviso: 600000, diasCesantia: 129, cesantia: 2580000, vacaciones: 200000, aguinaldo: 500000, total: 3880000 },
  },
  {
    nombre: "Renuncia: solo vacaciones y aguinaldo",
    origen: {
      tipo: "recalculado",
      detalle: "Sin preaviso ni cesantía. Vacaciones 4 × 15.000 = 60.000. Aguinaldo con los salarios reales: 1.600.000 / 12 = 133.333,33. Total 193.333,33.",
    },
    fecha: "2026-10-07",
    entrada: {
      salario: 450000,
      fechaIngreso: "2025-06-16",
      fechaSalida: "2026-03-15",
      motivo: "renuncia",
      preavisoDado: false,
      vacaciones: 4,
      salariosAguinaldo: 1600000,
    },
    esperado: { preaviso: 0, cesantia: 0, vacaciones: 60000, aguinaldo: 133333.33, total: 193333.33 },
  },
  {
    nombre: "Despido con preaviso dado a los ocho meses",
    origen: {
      tipo: "recalculado",
      detalle: "Preaviso dado: 0. Cesantía 14 días × 15.000 = 210.000. Aguinaldo del 1/1 al 31/8/2026 = 8 meses: 450.000 × 8 / 12 = 300.000. Total 510.000.",
    },
    fecha: "2026-10-07",
    entrada: {
      salario: 450000,
      fechaIngreso: "2026-01-01",
      fechaSalida: "2026-08-31",
      motivo: "despido",
      preavisoDado: true,
      vacaciones: 0,
      salariosAguinaldo: null,
    },
    esperado: { preaviso: 0, diasCesantia: 14, cesantia: 210000, aguinaldo: 300000, total: 510000 },
  },
  {
    nombre: "Despido con justa causa",
    origen: { tipo: "recalculado", detalle: "Sin preaviso ni cesantía. Vacaciones 6 × 20.000 = 120.000. Aguinaldo 2.400.000 / 12 = 200.000. Total 320.000." },
    fecha: "2026-10-07",
    entrada: {
      salario: 600000,
      fechaIngreso: "2020-02-01",
      fechaSalida: "2026-03-31",
      motivo: "justa-causa",
      preavisoDado: false,
      vacaciones: 6,
      salariosAguinaldo: 2400000,
    },
    esperado: { preaviso: 0, cesantia: 0, total: 320000 },
  },
  {
    nombre: "Salida antes del ingreso",
    origen: { tipo: "recalculado", detalle: "La función rechaza una salida anterior al ingreso." },
    fecha: "2026-10-07",
    entrada: {
      salario: 600000,
      fechaIngreso: "2026-05-01",
      fechaSalida: "2026-04-01",
      motivo: "despido",
      preavisoDado: false,
      vacaciones: 0,
      salariosAguinaldo: null,
    },
    esperaError: true,
  },
]);
