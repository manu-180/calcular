import { conVariantes } from "../../comun/locales";
import { segunTrato, type TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

const base: TextosUi<UiPrestamo> = {
  slug: "prestamo",
  ui: (trato) => ({
    monto: "Monto del préstamo",
    tasa: "Tasa de interés anual (%)",
    tasaAyuda: segunTrato(trato, {
      tu: "La tasa nominal anual de la oferta. Si solo tienes la efectiva, usa la calculadora de tasa efectiva para pasarla a nominal.",
      usted: "La tasa nominal anual de la oferta. Si solo tiene la efectiva, use la calculadora de tasa efectiva para pasarla a nominal.",
      vos: "La tasa nominal anual de la oferta. Si solo tenés la efectiva, usá la calculadora de tasa efectiva para pasarla a nominal.",
    }),
    meses: "Plazo en meses",
    extra: "Pago extra por mes (opcional)",
    extraAyuda: segunTrato(trato, {
      tu: "Lo que agregarías cada mes para terminar antes. Va todo a bajar la deuda.",
      usted: "Lo que agregaría cada mes para terminar antes. Va todo a bajar la deuda.",
      vos: "Lo que agregarías cada mes para terminar antes. Va todo a bajar la deuda.",
    }),
    cuota: "Cuota mensual",
    intereses: "Total de intereses",
    total: "Total a pagar",
    mesesReales: "Meses hasta saldarlo con el pago extra",
    ahorro: segunTrato(trato, { tu: "Intereses que te ahorras", usted: "Intereses que se ahorra", vos: "Intereses que te ahorrás" }),
    tabla: "Tabla de amortización",
    colMes: "Mes",
    colPago: "Pago",
    colInteres: "Interés",
    colCapital: "Capital",
    colSaldo: "Saldo",
    errorMonto: segunTrato(trato, {
      tu: "Escribe un monto mayor que cero.",
      usted: "Escriba un monto mayor que cero.",
      vos: "Escribí un monto mayor que cero.",
    }),
    observacionCostos: segunTrato(trato, {
      tu: "La cuota no incluye seguros, comisiones ni impuestos que la entidad pueda sumar. Pide el costo total antes de firmar.",
      usted: "La cuota no incluye seguros, comisiones ni impuestos que la entidad pueda sumar. Pida el costo total antes de firmar.",
      vos: "La cuota no incluye seguros, comisiones ni impuestos que la entidad pueda sumar. Pedí el costo total antes de firmar.",
    }),
    observacionExtra: (meses, ahorro) =>
      segunTrato(trato, {
        tu: `Con el pago extra terminas en ${meses} meses y te ahorras ${ahorro} de intereses.`,
        usted: `Con el pago extra termina en ${meses} meses y se ahorra ${ahorro} de intereses.`,
        vos: `Con el pago extra terminás en ${meses} meses y te ahorrás ${ahorro} de intereses.`,
      }),
  }),
};

const espana = (): Partial<UiPrestamo> => ({
  monto: "Importe del préstamo",
  tasa: "Tipo de interés anual (TIN, %)",
  tasaAyuda: "El tipo nominal anual (TIN) de la oferta. Si solo tienes la TAE, pásala a TIN con la calculadora de TAE.",
  extra: "Pago extra al mes (opcional)",
  extraAyuda: "Lo que añadirías cada mes para terminar antes. Va todo a amortizar la deuda.",
  errorMonto: "Escribe un importe mayor que cero.",
  observacionCostos:
    "La cuota no incluye seguros, comisiones ni impuestos que la entidad pueda añadir. Pide la TAE y el coste total antes de firmar.",
});

export const textosEs = conVariantes(base, { "es-ES": espana });
