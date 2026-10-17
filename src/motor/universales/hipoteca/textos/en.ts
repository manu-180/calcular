import type { TextosUi } from "../../tipos";
import { entradaDeCasaEn } from "../../comun/locales";
import type { UiHipoteca } from "../definicion";

const CUOTAS_COMUNIDAD: Readonly<Record<string, string>> = {
  "en-US": "HOA fees",
  "en-AU": "strata fees",
  "en-CA": "condo fees",
};

export const textosEn: TextosUi<UiHipoteca> = {
  slug: "mortgage",
  ui: (_trato, locale) => {
    const entrada = entradaDeCasaEn(locale);
    const Entrada = entrada === "deposit" ? "Deposit" : "Down payment";
    const costos =
      entrada === "deposit"
        ? "Buying costs (legal fees, taxes, valuation) are not included. Budget for them on top of the deposit."
        : "Closing costs (fees, taxes, appraisal) are not included. Budget for them on top of the down payment.";
    return {
      precio: "Home price",
      entradaPorcentaje: `${Entrada} (% of price)`,
      entradaMonto: `${Entrada} amount (optional)`,
      entradaMontoAyuda: "If you enter it, it is used instead of the percentage.",
      tasa: "Annual interest rate (%)",
      anios: "Term in years",
      gastos: "Monthly housing costs (optional)",
      gastosAyuda: `Property tax, home insurance or ${CUOTAS_COMUNIDAD[locale] ?? "service charges"} you pay along with the mortgage.`,
      cuota: "Monthly mortgage payment",
      cuotaTotal: "Monthly payment with costs",
      entrada: Entrada,
      prestado: "Loan amount",
      intereses: "Total interest",
      total: "Total of mortgage payments",
      tabla: "Year by year",
      colAnio: "Year",
      colIntereses: "Interest paid",
      colCapital: "Principal paid",
      colSaldo: "Balance at year end",
      errorPrecio: "Enter the home price.",
      errorEntrada: `The ${entrada} covers the full price, so there is no mortgage to work out. Lower the ${entrada}.`,
      observacionPrestado: (porcentaje) => `You borrow ${porcentaje}% of the home's value. The higher that share, the more lenders usually ask of you.`,
      observacionCostos: costos,
    };
  },
};
