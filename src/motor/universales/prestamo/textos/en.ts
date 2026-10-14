import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosEn: TextosUi<UiPrestamo> = {
  slug: "loan",
  ui: () => ({
    monto: "Loan amount",
    tasa: "Annual interest rate (%)",
    tasaAyuda: "The nominal annual rate on the offer (APR). Fees are not included.",
    meses: "Term in months",
    extra: "Extra payment per month (optional)",
    extraAyuda: "What you would add each month to finish sooner. All of it goes to the principal.",
    cuota: "Monthly payment",
    intereses: "Total interest",
    total: "Total paid",
    mesesReales: "Months to pay off with the extra payment",
    ahorro: "Interest you save",
    tabla: "Amortization schedule",
    colMes: "Month",
    colPago: "Payment",
    colInteres: "Interest",
    colCapital: "Principal",
    colSaldo: "Balance",
    errorMonto: "Enter an amount greater than zero.",
    observacionCostos: "The payment does not include insurance, fees or taxes the lender may add. Ask for the total cost before you sign.",
    observacionExtra: (meses, ahorro) => `With the extra payment you finish in ${meses} months and save ${ahorro} in interest.`,
  }),
};
