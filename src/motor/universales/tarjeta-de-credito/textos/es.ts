import { segunTrato, type TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosEs: TextosUi<UiTarjetaDeCredito> = {
  slug: "pagar-tarjeta-de-credito",
  ui: (trato) => ({
    saldo: "Saldo de la tarjeta",
    tasa: "Tasa de interés anual (%)",
    tasaAyuda: segunTrato(trato, {
      tu: "La tasa nominal anual de financiación. La encuentras en el resumen o estado de cuenta.",
      usted: "La tasa nominal anual de financiación. La encuentra en el resumen o estado de cuenta.",
      vos: "La tasa nominal anual de financiación. La encontrás en el resumen o estado de cuenta.",
    }),
    modo: segunTrato(trato, { tu: "¿Cómo vas a pagar?", usted: "¿Cómo va a pagar?", vos: "¿Cómo vas a pagar?" }),
    modoFijo: "Un monto fijo por mes",
    modoMinimo: "El pago mínimo",
    pagoFijo: "Pago fijo por mes",
    minimoPorcentaje: "Pago mínimo (% del saldo)",
    minimoPorcentajeAyuda: segunTrato(trato, {
      tu: "Lo que pide el banco cada mes. Si no lo sabes, 5 % es un valor común.",
      usted: "Lo que pide el banco cada mes. Si no lo sabe, 5 % es un valor común.",
      vos: "Lo que pide el banco cada mes. Si no lo sabés, 5 % es un valor común.",
    }),
    minimoPiso: "Pago mínimo nunca menor a",
    meses: "Meses para saldarla",
    intereses: "Intereses que se pagan",
    total: "Total pagado",
    primerPago: "Primer pago mínimo",
    tabla: "Plan de pagos mes a mes",
    colMes: "Mes",
    colPago: "Pago",
    colInteres: "Interés",
    colCapital: "Baja la deuda",
    colSaldo: "Saldo",
    errorSaldo: segunTrato(trato, {
      tu: "Escribe el saldo que debes en la tarjeta.",
      usted: "Escriba el saldo que debe en la tarjeta.",
      vos: "Escribí el saldo que debés en la tarjeta.",
    }),
    errorFaltaPago: segunTrato(trato, {
      tu: "Escribe cuánto vas a pagar por mes.",
      usted: "Escriba cuánto va a pagar por mes.",
      vos: "Escribí cuánto vas a pagar por mes.",
    }),
    errorNoCubre: (interes) =>
      segunTrato(trato, {
        tu: `Con ese pago la deuda no baja nunca: solo el interés del primer mes es ${interes}. Sube el pago.`,
        usted: `Con ese pago la deuda no baja nunca: solo el interés del primer mes es ${interes}. Suba el pago.`,
        vos: `Con ese pago la deuda no baja nunca: solo el interés del primer mes es ${interes}. Subí el pago.`,
      }),
    errorMuyLargo: segunTrato(trato, {
      tu: "Con ese pago tardarías más de 50 años en saldarla. Sube el pago.",
      usted: "Con ese pago tardaría más de 50 años en saldarla. Suba el pago.",
      vos: "Con ese pago tardarías más de 50 años en saldarla. Subí el pago.",
    }),
    observacionAnios: (anios, meses) => {
      const a = anios === "1" ? "1 año" : `${anios} años`;
      const m = meses === "0" ? "" : meses === "1" ? " y 1 mes" : ` y ${meses} meses`;
      return `Son ${a}${m}.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      segunTrato(trato, {
        tu: `Si pagas siempre ${pago}, como el primer mínimo, la saldas en ${meses} meses y te ahorras ${ahorro} de intereses.`,
        usted: `Si paga siempre ${pago}, como el primer mínimo, la salda en ${meses} meses y se ahorra ${ahorro} de intereses.`,
        vos: `Si pagás siempre ${pago}, como el primer mínimo, la saldás en ${meses} meses y te ahorrás ${ahorro} de intereses.`,
      }),
    observacionNoGastar: segunTrato(trato, {
      tu: "El cálculo supone que no haces compras nuevas con la tarjeta mientras la pagas.",
      usted: "El cálculo supone que no hace compras nuevas con la tarjeta mientras la paga.",
      vos: "El cálculo supone que no hacés compras nuevas con la tarjeta mientras la pagás.",
    }),
  }),
};
