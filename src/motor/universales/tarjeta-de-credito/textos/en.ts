import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosEn: TextosUi<UiTarjetaDeCredito> = {
  slug: "credit-card-payoff",
  ui: () => ({
    saldo: "Card balance",
    tasa: "Annual interest rate (APR, %)",
    tasaAyuda: "The purchase APR. You can find it on your statement.",
    modo: "How will you pay?",
    modoFijo: "A fixed amount each month",
    modoMinimo: "The minimum payment",
    pagoFijo: "Fixed monthly payment",
    minimoPorcentaje: "Minimum payment (% of balance)",
    minimoPorcentajeAyuda: "What the card issuer asks for each month. If you are not sure, 5% is common.",
    minimoPiso: "Minimum payment never below",
    meses: "Months to pay it off",
    intereses: "Interest you pay",
    total: "Total paid",
    primerPago: "First minimum payment",
    tabla: "Month by month plan",
    colMes: "Month",
    colPago: "Payment",
    colInteres: "Interest",
    colCapital: "Principal",
    colSaldo: "Balance",
    errorSaldo: "Enter the balance you owe on the card.",
    errorFaltaPago: "Enter how much you will pay each month.",
    errorNoCubre: (interes) => `With that payment the balance never goes down: the first month's interest alone is ${interes}. Raise the payment.`,
    errorMuyLargo: "With that payment it would take more than 50 years to pay off. Raise the payment.",
    observacionAnios: (anios, meses) => {
      const a = anios === "1" ? "1 year" : `${anios} years`;
      const m = meses === "0" ? "" : meses === "1" ? " and 1 month" : ` and ${meses} months`;
      return `That is ${a}${m}.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `If you always pay ${pago}, the same as the first minimum, you are done in ${meses} months and save ${ahorro} in interest.`,
    observacionNoGastar: "This assumes you make no new purchases on the card while you pay it off.",
  }),
};
