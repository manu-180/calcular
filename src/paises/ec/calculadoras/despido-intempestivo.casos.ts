import { definirCasos } from "@/motor/calculo";
import despido from "./despido-intempestivo";

export default definirCasos(despido, [
  {
    nombre: "5 años, 6 meses y 16 días: la fracción cuenta como año",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 188 y 185 del Código del Trabajo. Del 15/3/2021 al 30/9/2026. Más de 3 años: 5 años + fracción = 6 meses × 1.000 = 6.000. Desahucio 25 % × 1.000 × 5 años completos = 1.250. Total 7.250.",
    },
    fecha: "2026-10-07",
    entrada: { inicio: "2021-03-15", salida: "2026-09-30", remuneracion: 1000 },
    esperado: { meses: 6, indemnizacion: 6000, desahucio: 1250, total: 7250 },
  },
  {
    nombre: "Exactamente 3 años: tres meses",
    origen: { tipo: "recalculado", detalle: "Del 1/10/2023 al 30/9/2026 son 3 años justos: 3 meses × 1.000 = 3.000. Desahucio 250 × 3 = 750. Total 3.750." },
    fecha: "2026-10-07",
    entrada: { inicio: "2023-10-01", salida: "2026-09-30", remuneracion: 1000 },
    esperado: { meses: 3, indemnizacion: 3000, desahucio: 750, total: 3750 },
  },
  {
    nombre: "Seis meses de trabajo: mínimo de tres meses y sin desahucio",
    origen: { tipo: "recalculado", detalle: "Hasta tres años: 3 meses × 482 = 1.446. Sin años completos, desahucio 0." },
    fecha: "2026-10-07",
    entrada: { inicio: "2026-04-01", salida: "2026-09-30", remuneracion: 482 },
    esperado: { meses: 3, indemnizacion: 1446, desahucio: 0, total: 1446 },
  },
  {
    nombre: "31 años: tope de 25 meses",
    origen: { tipo: "recalculado", detalle: "Del 1/1/1995 al 30/9/2026: tope de 25 meses × 2.000 = 50.000. Desahucio 500 × 31 = 15.500. Total 65.500." },
    fecha: "2026-10-07",
    entrada: { inicio: "1995-01-01", salida: "2026-09-30", remuneracion: 2000 },
    esperado: { meses: 25, indemnizacion: 50000, desahucio: 15500, total: 65500 },
  },
  {
    nombre: "Despido anterior al ingreso",
    origen: { tipo: "recalculado", detalle: "Entrada imposible: tiene que dar error." },
    fecha: "2026-10-07",
    entrada: { inicio: "2026-05-01", salida: "2026-04-30", remuneracion: 800 },
    esperaError: true,
  },
]);
