import { segunTrato, type TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

export const textosEs: TextosUi<UiCostoDeUnAuto> = {
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
