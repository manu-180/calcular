import type { CasoUniversal } from "../tipos";

export const casos: readonly CasoUniversal[] = [
  {
    nombre: "Sin tasas: comprar gana por lo pagado de alquiler",
    detalle:
      "Vivienda 100000, entrada 20 % (20000), hipoteca al 0 % a 10 años: 80000 ÷ 120 = 666,67 por mes. Alquiler 500 fijo. " +
      "Quien alquila invierte 20000 más 166,67 por mes al 0 %: 20000 + 20000 = 40000. Quien compra termina con la vivienda paga: 100000. " +
      "Diferencia 60000 (lo pagado de alquiler). Año 1: comprar 20000 + 8000 = 28000 contra alquilar 22000, así que gana desde el año 1.",
    fecha: "2026-10-13",
    entrada: {
      precio: 100000,
      entrada: 20,
      gastosCompra: 0,
      tasa: 0,
      aniosHipoteca: 10,
      alquiler: 500,
      aumentoAlquiler: 0,
      gastosPropietario: 0,
      revalorizacion: 0,
      rendimiento: 0,
      horizonte: 10,
    },
    esperado: { patrimonioComprar: 100000, patrimonioAlquilar: 40000, diferencia: 60000, anioDesde: 1, pagadoAlquilando: 60000, pagadoComprando: 80000 },
  },
  {
    nombre: "Compra al contado contra alquiler barato con rendimiento del 6 %",
    detalle:
      "Vivienda 100000 pagada entera, gastos del dueño 2 % anual = 166,67 por mes; alquiler 300. Un año. " +
      "Quien alquila invierte 100000 al 6 %: 106000. Quien compra invierte 133,33 por mes: tasa mensual g = 1,06^(1/12) − 1 = 0,0048676, " +
      "valor futuro = 133,33 × 0,06 ÷ g = 133,33 × 12,32653 = 1643,54. Comprar 101643,54 contra 106000: alquilar gana por 4356,46.",
    fecha: "2026-10-13",
    entrada: {
      precio: 100000,
      entrada: 100,
      gastosCompra: 0,
      tasa: 7,
      aniosHipoteca: 25,
      alquiler: 300,
      aumentoAlquiler: 0,
      gastosPropietario: 2,
      revalorizacion: 0,
      rendimiento: 6,
      horizonte: 1,
    },
    esperado: { patrimonioComprar: 101643.54, patrimonioAlquilar: 106000, diferencia: 4356.46, anioDesde: null, pagadoAlquilando: 3600, pagadoComprando: 2000 },
  },
  {
    nombre: "Sin alquiler para comparar es un error",
    detalle: "Con alquiler 0 la comparación no tiene sentido: pide el alquiler de una vivienda parecida.",
    fecha: "2026-10-13",
    entrada: {
      precio: 100000,
      entrada: 20,
      gastosCompra: 4,
      tasa: 7,
      aniosHipoteca: 25,
      alquiler: 0,
      aumentoAlquiler: 3,
      gastosPropietario: 1.5,
      revalorizacion: 3,
      rendimiento: 5,
      horizonte: 10,
    },
    esperaError: true,
  },
];
