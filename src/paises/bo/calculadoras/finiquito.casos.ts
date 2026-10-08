import { definirCasos } from "@/motor/calculo";
import finiquito from "./finiquito";

const GUIA = "https://www.mintrabajo.gob.bo/wp-content/uploads/2025/10/Libro-No-73-Guia-de-derechos-laborales-MTEPS-2024.pdf" as const;

export default definirCasos(finiquito, [
  {
    nombre: "Ejercicio de beneficios sociales del Ministerio de Trabajo",
    origen: {
      tipo: "recalculado",
      url: GUIA,
      detalle:
        "Ejercicio de la Guía del MTEPS con las fechas corridas tres años (ingreso 21/07, retiro intempestivo 15/09, 2 años 1 mes 25 días, SPI 3.000). Desahucio 9.000; indemnización 6.000 + 250 + 208,33 = 6.458,33; aguinaldo 2.000 + 125 = 2.125; vacaciones de dos gestiones 3.000; fracción 15/12 × 1 + 15/360 × 25 = 2,2917 días = 229,17. Total 20.812,50 (la guía trunca 208,3 y 104,1 y llega a 20.812,4).",
    },
    fecha: "2026-09-20",
    entrada: { motivo: "despido", sueldo: 3000, ingreso: "2024-07-21", retiro: "2026-09-15", vacacionesPendientes: 30, quinquenios: 0 },
    esperado: {
      antiguedad: "2 años, 1 mes y 25 días",
      indemnizacion: 6458.33,
      desahucio: 9000,
      aguinaldo: 2125,
      vacacionesGestiones: 3000,
      diasFraccion: 2.29,
      vacacionFraccion: 229.17,
      total: 20812.5,
    },
  },
  {
    nombre: "Renuncia con 91 días: ya hay indemnización",
    origen: { tipo: "recalculado", detalle: "Del 1/7 al 29/9 son 91 días (más de 90). Tiempo 2 meses 28 días: 3.600 / 12 × 2 + 3.600 / 360 × 28 = 880. Sin desahucio por ser renuncia. Aguinaldo: 2 meses 29 días en la gestión, no llega a 3." },
    fecha: "2026-10-01",
    entrada: { motivo: "renuncia", sueldo: 3600, ingreso: "2026-07-01", retiro: "2026-09-29", vacacionesPendientes: 0, quinquenios: 0 },
    esperado: { indemnizacion: 880, desahucio: 0, aguinaldo: 0, vacacionFraccion: 0, total: 880 },
  },
  {
    nombre: "Despido con 90 días justos: todavía no hay indemnización",
    origen: { tipo: "recalculado", detalle: "Del 1/7 al 28/9 son 90 días: hace falta más de 90 para la indemnización y el desahucio." },
    fecha: "2026-10-01",
    entrada: { motivo: "despido", sueldo: 3600, ingreso: "2026-07-01", retiro: "2026-09-28", vacacionesPendientes: 0, quinquenios: 0 },
    esperado: { indemnizacion: 0, desahucio: 0, total: 0 },
  },
  {
    nombre: "Despido sin causa con un quinquenio ya cobrado",
    origen: {
      tipo: "recalculado",
      detalle:
        "7 años 3 meses 29 días; el quinquenio cobrado descuenta 5 años. Indemnización 6.000 × 2 + 500 × 3 + 16,667 × 29 = 13.983,33. Desahucio 18.000. Aguinaldo enero a junio 3.000. Fracción del 8.º año (20 días): 20/12 × 3 + 20/360 × 29 = 6,6111 días = 1.322,22. Total 36.305,55.",
    },
    fecha: "2026-07-05",
    entrada: { motivo: "despido", sueldo: 6000, ingreso: "2019-03-01", retiro: "2026-06-30", vacacionesPendientes: 0, quinquenios: 1 },
    esperado: { antiguedad: "7 años, 3 meses y 29 días", indemnizacion: 13983.33, desahucio: 18000, aguinaldo: 3000, diasFraccion: 6.61, vacacionFraccion: 1322.22, total: 36305.55 },
  },
  {
    nombre: "Despido con causa del artículo 16",
    origen: { tipo: "recalculado", url: GUIA, detalle: "Sin indemnización ni desahucio (L.G.T. art. 16). Quedan el aguinaldo (3.000) y la vacación por fracción (1.322,22)." },
    fecha: "2026-07-05",
    entrada: { motivo: "despido-justificado", sueldo: 6000, ingreso: "2019-03-01", retiro: "2026-06-30", vacacionesPendientes: 0, quinquenios: 1 },
    esperado: { indemnizacion: 0, desahucio: 0, aguinaldo: 3000, vacacionFraccion: 1322.22, total: 4322.22 },
  },
  {
    nombre: "Más quinquenios que años trabajados",
    origen: { tipo: "recalculado", detalle: "Dos quinquenios son 10 años y solo trabajó 7." },
    fecha: "2026-07-05",
    entrada: { motivo: "renuncia", sueldo: 6000, ingreso: "2019-03-01", retiro: "2026-06-30", vacacionesPendientes: 0, quinquenios: 2 },
    esperaError: true,
  },
]);
