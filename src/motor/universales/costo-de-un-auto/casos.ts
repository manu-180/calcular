import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "Métrico: 1.000 km por mes a 8 L/100 km",
    detalle:
      "Combustible 1000 × 8 ÷ 100 × 1,5 = 120. Pérdida de valor 20000 × 15 % ÷ 12 = 250. " +
      "Total 120 + 250 + 100 de seguro + 50 de mantenimiento = 520 por mes, 6240 por año, 0,52 por km.",
    fecha: "2026-10-13",
    contexto: { unidades: "metrico" },
    entrada: {
      precio: 20000,
      depreciacion: 15,
      cuota: null,
      seguro: 100,
      distancia: 1000,
      consumo: 8,
      precioCombustible: 1.5,
      mantenimiento: 50,
      estacionamiento: null,
      otros: null,
    },
    esperado: { costoMensual: 520, costoAnual: 6240, porDistancia: 0.52, combustible: 120, depreciacionMensual: 250, gastoBolsillo: null },
  },
  {
    nombre: "Imperial: 1.000 millas por mes a 25 mpg, con cuota",
    detalle:
      "Combustible 1000 ÷ 25 × 4 = 160. Pérdida 24000 × 10 % ÷ 12 = 200. Seguro 150, mantenimiento 40, estacionamiento 50. " +
      "Costo real 600 por mes, 7200 por año, 0,60 por milla. De la cuenta salen 400 de gastos más 450 de cuota = 850.",
    fecha: "2026-10-13",
    contexto: { unidades: "imperial" },
    entrada: {
      precio: 24000,
      depreciacion: 10,
      cuota: 450,
      seguro: 150,
      distancia: 1000,
      consumo: 25,
      precioCombustible: 4,
      mantenimiento: 40,
      estacionamiento: 50,
      otros: null,
    },
    esperado: { costoMensual: 600, costoAnual: 7200, porDistancia: 0.6, combustible: 160, depreciacionMensual: 200, gastoBolsillo: 850 },
  },
  {
    nombre: "Auto parado: sin distancia no hay costo por km",
    detalle: "Con 0 km solo quedan seguro y pérdida de valor: 100 + 10000 × 12 % ÷ 12 = 200. El costo por km no se muestra.",
    fecha: "2026-10-13",
    contexto: { unidades: "metrico" },
    entrada: {
      precio: 10000,
      depreciacion: 12,
      cuota: null,
      seguro: 100,
      distancia: 0,
      consumo: 0,
      precioCombustible: 1.5,
      mantenimiento: 0,
      estacionamiento: null,
      otros: null,
    },
    esperado: { costoMensual: 200, porDistancia: null, combustible: 0 },
  },
  {
    nombre: "Consumo cero con kilómetros es un error",
    detalle: "Si recorre distancia, el consumo tiene que ser mayor que cero.",
    fecha: "2026-10-13",
    entrada: {
      precio: 20000,
      depreciacion: 15,
      cuota: null,
      seguro: 100,
      distancia: 1000,
      consumo: 0,
      precioCombustible: 1.5,
      mantenimiento: 50,
      estacionamiento: null,
      otros: null,
    },
    esperaError: true,
  },
];
