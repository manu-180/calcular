import { definirCasos } from "@/motor/calculo";
import renuncia from "./renuncia";

export default definirCasos(renuncia, [
  {
    nombre: "Dos años y ocho meses, renuncia sin preaviso",
    origen: {
      tipo: "recalculado",
      detalle:
        "Del 1/3/2024 al 31/10/2026: 2 años y 8 meses. Diario 600.000 / 30 = 20.000. Vacaciones 5 × 20.000 = 100.000. Aguinaldo: 11 meses desde el 1/12/2025, 600.000 × 11 / 12 = 550.000. Total 650.000. Preaviso de un mes (art. 28): 600.000 que el patrono puede cobrar.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 600000, fechaIngreso: "2024-03-01", fechaSalida: "2026-10-31", preavisoDado: false, vacaciones: 5, salariosAguinaldo: null },
    esperado: { vacaciones: 100000, aguinaldo: 550000, total: 650000, diasPreaviso: 30, montoPreaviso: 600000 },
  },
  {
    nombre: "Menos de tres meses: sin preaviso",
    origen: {
      tipo: "recalculado",
      detalle: "Del 1/8/2026 al 30/9/2026: 2 meses. No hay preaviso (art. 28). Diario 15.000; vacaciones 2 × 15.000 = 30.000. Aguinaldo 450.000 × 2 / 12 = 75.000. Total 105.000.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 450000, fechaIngreso: "2026-08-01", fechaSalida: "2026-09-30", preavisoDado: false, vacaciones: 2, salariosAguinaldo: null },
    esperado: { diasPreaviso: 0, montoPreaviso: 0, vacaciones: 30000, aguinaldo: 75000, total: 105000 },
  },
  {
    nombre: "Con preaviso dado y salarios reales",
    origen: { tipo: "recalculado", detalle: "Seis meses y medio: preaviso de 15 días, dado. Aguinaldo con 3.900.000 de salarios: 325.000. Sin vacaciones pendientes." },
    fecha: "2026-10-12",
    entrada: { salario: 600000, fechaIngreso: "2026-03-01", fechaSalida: "2026-09-15", preavisoDado: true, vacaciones: 0, salariosAguinaldo: 3900000 },
    esperado: { diasPreaviso: 15, montoPreaviso: 0, aguinaldo: 325000, total: 325000 },
  },
  {
    nombre: "Fecha de salida anterior al ingreso",
    origen: { tipo: "recalculado", detalle: "La salida no puede ser antes del ingreso." },
    fecha: "2026-10-12",
    entrada: { salario: 600000, fechaIngreso: "2026-05-01", fechaSalida: "2026-04-01", preavisoDado: true, vacaciones: 0, salariosAguinaldo: null },
    esperaError: true,
  },
]);
