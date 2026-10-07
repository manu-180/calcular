import { definirCasos } from "@/motor/calculo";
import liquidacion from "./liquidacion";

export default definirCasos(liquidacion, [
  {
    nombre: "Renuncia a mitad de año con salario sobre el tope del auxilio",
    origen: {
      tipo: "recalculado",
      detalle:
        "4.000.000 > 2 × 1.750.905, sin auxilio. Cesantías 1/1 a 30/6/2026 = 180 días: 4.000.000 × 180 / 360 = 2.000.000. Intereses 2.000.000 × 12 % × 180 / 360 = 120.000. Prima 180 días = 2.000.000. Vacaciones 1/2/2025 a 30/6/2026 = 510 días: 4.000.000 × 510 / 720 = 2.833.333,33. Total 6.953.333.",
    },
    fecha: "2026-10-15",
    entrada: { salario: 4000000, fechaIngreso: "2025-02-01", fechaRetiro: "2026-06-30", vacacionesDesde: null, motivo: "renuncia", auxilio: true },
    esperado: { base: 4000000, diasCesantias: 180, cesantias: 2000000, intereses: 120000, prima: 2000000, diasVacaciones: 510, vacaciones: 2833333, indemnizacion: 0, total: 6953333 },
  },
  {
    nombre: "Despido sin justa causa con salario mínimo y auxilio",
    origen: {
      tipo: "recalculado",
      detalle:
        "Base 1.750.905 + 249.095 = 2.000.000. Cesantías 1/1 a 20/9/2026 = 260 días: 1.444.444. Intereses 1.444.444 × 12 % × 260 / 360 = 125.185. Prima 1/7 a 20/9 = 80 días: 444.444. Vacaciones 2/3 a 20/9 = 199 días: 1.750.905 × 199 / 720 = 483.930,69. Indemnización (CST art. 64): 920 días, 30 + 20 × 560 / 360 = 61,11 días × 58.363,5 = 3.566.658. Total 6.064.662.",
    },
    fecha: "2026-10-15",
    entrada: { salario: 1750905, fechaIngreso: "2024-03-01", fechaRetiro: "2026-09-20", vacacionesDesde: "2026-03-02", motivo: "despido", auxilio: true },
    esperado: { base: 2000000, cesantias: 1444444, intereses: 125185, diasPrima: 80, prima: 444444, vacaciones: 483931, indemnizacion: 3566658, total: 6064662 },
  },
  {
    nombre: "Retiro el último día de febrero (cuenta como día 30)",
    origen: {
      tipo: "recalculado",
      detalle: "1/1 a 28/2/2026 = 60 días comerciales. 3.000.000 sin auxilio: cesantías 500.000, intereses 10.000, prima 500.000, vacaciones 3.000.000 × 60 / 720 = 250.000. Total 1.260.000.",
    },
    fecha: "2026-10-15",
    entrada: { salario: 3000000, fechaIngreso: "2026-01-01", fechaRetiro: "2026-02-28", vacacionesDesde: null, motivo: "renuncia", auxilio: false },
    esperado: { diasCesantias: 60, cesantias: 500000, intereses: 10000, prima: 500000, vacaciones: 250000, total: 1260000 },
  },
  {
    nombre: "La fecha de retiro no puede ser anterior al ingreso",
    origen: { tipo: "recalculado", detalle: "La función rechaza un retiro antes del ingreso." },
    fecha: "2026-10-15",
    entrada: { salario: 2000000, fechaIngreso: "2026-05-01", fechaRetiro: "2026-04-01", vacacionesDesde: null, motivo: "renuncia", auxilio: true },
    esperaError: true,
  },
]);
