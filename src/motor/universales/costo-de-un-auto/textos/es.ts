import { conVariantes } from "../../comun/locales";
import { segunTrato, type TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

const base: TextosUi<UiCostoDeUnAuto> = {
  slug: "costo-de-tener-auto",
  ui: (trato) => ({
    precio: "Valor del auto",
    precioAyuda: segunTrato(trato, {
      tu: "Lo que pagaste o lo que vale hoy si ya lo tienes hace tiempo.",
      usted: "Lo que pagó o lo que vale hoy si ya lo tiene hace tiempo.",
      vos: "Lo que pagaste o lo que vale hoy si ya lo tenés hace tiempo.",
    }),
    depreciacion: "Pérdida de valor por año (%)",
    depreciacionAyuda: "Un auto nuevo pierde entre 15 % y 25 % el primer año. Uno usado, menos.",
    cuota: "Cuota del préstamo por mes (opcional)",
    cuotaAyuda: "Solo para ver cuánto sale de la cuenta cada mes. No se suma al costo real.",
    seguro: "Seguro por mes",
    distanciaKm: "Kilómetros por mes",
    distanciaMi: "Millas por mes",
    consumoL100: "Consumo (litros cada 100 km)",
    consumoMpg: "Rendimiento (millas por galón)",
    precioLitro: "Precio del combustible por litro",
    precioGalon: "Precio del combustible por galón",
    mantenimiento: "Mantenimiento por mes",
    mantenimientoAyuda: "Revisiones, cambios de aceite, neumáticos, reparaciones y lavado, en promedio por mes.",
    estacionamiento: "Estacionamiento o garaje por mes (opcional)",
    otros: "Impuestos, peajes y otros por mes (opcional)",
    otrosAyuda: "El impuesto anual del auto, la revisión técnica obligatoria, peajes y multas, en promedio por mes.",
    costoMensual: "Costo real por mes",
    costoAnual: "Costo real por año",
    porKm: "Costo por kilómetro",
    porMilla: "Costo por milla",
    combustible: "Combustible por mes",
    depreciacionMensual: "Pérdida de valor por mes",
    gastoBolsillo: "Lo que sale de la cuenta cada mes",
    errorConsumo: segunTrato(trato, {
      tu: "Escribe el consumo del auto para calcular el combustible.",
      usted: "Escriba el consumo del auto para calcular el combustible.",
      vos: "Escribí el consumo del auto para calcular el combustible.",
    }),
    observacionCuota:
      "La cuota no entra en el costo real porque una parte paga el auto, que ya está contado en la pérdida de valor. Los intereses del préstamo sí son un costo extra.",
  }),
};

const espana = (): Partial<UiCostoDeUnAuto> => ({
  precio: "Valor del coche",
  depreciacionAyuda: "Un coche nuevo pierde entre un 15 % y un 25 % el primer año. Uno de segunda mano, menos.",
  cuota: "Cuota mensual del préstamo (opcional)",
  cuotaAyuda: "Solo para ver cuánto sale de la cuenta cada mes. No se suma al coste real.",
  seguro: "Seguro al mes",
  distanciaKm: "Kilómetros al mes",
  distanciaMi: "Millas al mes",
  mantenimiento: "Mantenimiento al mes",
  mantenimientoAyuda: "Revisiones, cambios de aceite, neumáticos, reparaciones y lavados, de media al mes.",
  estacionamiento: "Aparcamiento o garaje al mes (opcional)",
  otros: "Impuestos, peajes y otros al mes (opcional)",
  otrosAyuda: "El impuesto de circulación, la ITV, los peajes y las multas, de media al mes.",
  costoMensual: "Coste real al mes",
  costoAnual: "Coste real al año",
  porKm: "Coste por kilómetro",
  porMilla: "Coste por milla",
  combustible: "Combustible al mes",
  depreciacionMensual: "Pérdida de valor al mes",
  errorConsumo: "Escribe el consumo del coche para calcular el combustible.",
  observacionCuota:
    "La cuota no entra en el coste real porque una parte paga el coche, que ya está contado en la pérdida de valor. Los intereses del préstamo sí son un coste extra.",
});

export const textosEs = conVariantes(base, { "es-ES": espana });
