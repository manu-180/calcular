import { definirCasos } from "@/motor/calculo";
import liquidacion from "./liquidacion";

export default definirCasos(liquidacion, [
  {
    nombre: "Despido intempestivo con 5 años, 6 meses y 16 días",
    origen: {
      tipo: "recalculado",
      detalle:
        "Art. 185 y 188 del Código del Trabajo. Del 15/3/2021 al 30/9/2026. Desahucio 25 % × 1.000 × 5 años = 1.250. Despido: más de 3 años y la fracción cuenta como año, 6 × 1.000 = 6.000. Vacaciones: sexto año, 16 días × (6 + 16/30) / 12 = 8,7111 días × 1.000/30 = 290,37. Total 7.540,37.",
    },
    fecha: "2026-10-07",
    entrada: { inicio: "2021-03-15", salida: "2026-09-30", remuneracion: 1000, motivo: "despido", region: "sierra", decimos: true, pendientes: 0 },
    esperado: { desahucio: 1250, mesesDespido: 6, despido: 6000, decimoTercero: 0, vacaciones: 290.37, total: 7540.37 },
  },
  {
    nombre: "Renuncia con desahucio, Costa, décimos acumulados",
    origen: {
      tipo: "recalculado",
      detalle:
        "Del 1/1/2024 al 30/6/2026: 2 años y 6 meses. Desahucio 150 × 2 = 300. Décimo tercero del 1/12/2025 al 30/6/2026, 7 meses: 600 × 7 / 12 = 350. Décimo cuarto Costa del 1/3/2026 al 30/6/2026, 4 meses: 482 × 4 / 12 = 160,67. Vacaciones 15 × 6/12 = 7,5 días + 3 pendientes, × 20 = 210. Total 1.020,67.",
    },
    fecha: "2026-07-01",
    entrada: { inicio: "2024-01-01", salida: "2026-06-30", remuneracion: 600, motivo: "renuncia", region: "costa", decimos: false, pendientes: 3 },
    esperado: { desahucio: 300, despido: 0, decimoTercero: 350, decimoCuarto: 160.67, vacaciones: 210, total: 1020.67 },
  },
  {
    nombre: "Despido con 2 años y 3 meses: tres meses de indemnización",
    origen: {
      tipo: "recalculado",
      detalle: "Hasta tres años: 3 meses × 800 = 2.400. Desahucio 200 × 2 = 400. Vacaciones 15 × 3/12 = 3,75 días × 26,667 = 100. Total 2.900.",
    },
    fecha: "2026-10-07",
    entrada: { inicio: "2024-07-01", salida: "2026-09-30", remuneracion: 800, motivo: "despido", region: "sierra", decimos: true, pendientes: 0 },
    esperado: { mesesDespido: 3, despido: 2400, desahucio: 400, vacaciones: 100, total: 2900 },
  },
  {
    nombre: "Exactamente 3 años: todavía tres meses",
    origen: { tipo: "recalculado", detalle: "Del 1/10/2023 al 30/9/2026 son 3 años justos: 3 meses × 1.000 = 3.000. Desahucio 250 × 3 = 750." },
    fecha: "2026-10-07",
    entrada: { inicio: "2023-10-01", salida: "2026-09-30", remuneracion: 1000, motivo: "despido", region: "sierra", decimos: true, pendientes: 0 },
    esperado: { mesesDespido: 3, despido: 3000, desahucio: 750, vacaciones: 0, total: 3750 },
  },
  {
    nombre: "3 años y un día: la fracción cuenta como año",
    origen: { tipo: "recalculado", detalle: "Del 1/10/2023 al 1/10/2026: más de 3 años, la fracción cuenta como año completo: 4 meses × 1.000 = 4.000." },
    fecha: "2026-10-07",
    entrada: { inicio: "2023-10-01", salida: "2026-10-01", remuneracion: 1000, motivo: "despido", region: "sierra", decimos: true, pendientes: 0 },
    esperado: { mesesDespido: 4, despido: 4000 },
  },
  {
    nombre: "Despido con 31 años: tope de 25 meses",
    origen: {
      tipo: "recalculado",
      detalle: "Del 1/1/1995 al 30/9/2026: 31 años y 9 meses, tope de 25 meses × 2.000 = 50.000. Desahucio 500 × 31 = 15.500. Vacaciones: año 32, 15 + 15 = 30 días × 9/12 = 22,5 días × 66,667 = 1.500. Total 67.000.",
    },
    fecha: "2026-10-07",
    entrada: { inicio: "1995-01-01", salida: "2026-09-30", remuneracion: 2000, motivo: "despido", region: "sierra", decimos: true, pendientes: 0 },
    esperado: { mesesDespido: 25, despido: 50000, desahucio: 15500, vacaciones: 1500, total: 67000 },
  },
  {
    nombre: "Visto bueno: sin desahucio ni despido",
    origen: { tipo: "recalculado", detalle: "Sin bonificación ni indemnización. Solo vacaciones: 15 × 3/12 × 26,667 = 100." },
    fecha: "2026-10-07",
    entrada: { inicio: "2024-07-01", salida: "2026-09-30", remuneracion: 800, motivo: "visto-bueno", region: "sierra", decimos: true, pendientes: 0 },
    esperado: { desahucio: 0, despido: 0, total: 100 },
  },
  {
    nombre: "Salida anterior al ingreso",
    origen: { tipo: "recalculado", detalle: "Entrada imposible: tiene que dar error." },
    fecha: "2026-10-07",
    entrada: { inicio: "2026-05-01", salida: "2026-04-30", remuneracion: 800, motivo: "despido", region: "sierra", decimos: true, pendientes: 0 },
    esperaError: true,
  },
]);
