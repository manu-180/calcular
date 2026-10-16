import type { TextosUi } from "../../tipos";
import { entradaDeCasaEn } from "../../comun/locales";
import type { UiAlquilarOComprar } from "../definicion";

export const textosEn: TextosUi<UiAlquilarOComprar> = {
  slug: "rent-vs-buy",
  ui: (_trato, locale) => {
    const entrada = entradaDeCasaEn(locale);
    const deposit = entrada === "deposit";
    return {
      precio: "Home price",
      entrada: `${deposit ? "Deposit" : "Down payment"} (% of price)`,
      gastosCompra: "Buying costs (% of price)",
      gastosCompraAyuda: deposit ? "Legal fees, transfer taxes or stamp duty, and valuation." : "Closing costs: legal fees, transfer taxes, agent fees and appraisal.",
      tasa: "Mortgage rate (% per year)",
      aniosHipoteca: "Mortgage term in years",
      alquiler: "Monthly rent for a similar home",
      aumentoAlquiler: "Yearly rent increase (%)",
      gastosPropietario: "Owner costs per year (% of value)",
      gastosPropietarioAyuda: "Maintenance, property tax and home insurance. 1% to 2% is typical.",
      revalorizacion: "Home price growth per year (%)",
      rendimiento: "Return on an alternative investment (% per year)",
      rendimientoAyuda: `What you would earn by investing the ${entrada} instead of buying.`,
      horizonte: "Years to compare",
      veredicto: "Result",
      patrimonioComprar: "Net worth at the end if you buy",
      patrimonioAlquilar: "Net worth at the end if you rent",
      diferencia: "Difference",
      anioDesde: "Year buying starts to win",
      pagadoAlquilando: "Total rent paid",
      pagadoComprando: "Total mortgage payments and owner costs",
      tabla: "Year by year comparison",
      colAnio: "Year",
      colComprar: "Buying",
      colAlquilar: "Renting",
      colDiferencia: "Difference",
      errorPrecio: "Enter the home price.",
      errorAlquiler: "Enter what renting a similar home would cost.",
      convieneComprar: (anios, diferencia) => `Buying wins: after ${anios} years you would have ${diferencia} more.`,
      convieneAlquilar: (anios, diferencia) => `Renting wins: after ${anios} years you would have ${diferencia} more.`,
    empate: (anios) => `After ${anios} years both options end up the same.`,
    observacionDesde: (anio) => `Buying pulls ahead of renting in year ${anio} and stays ahead.`,
    observacionMetodo:
      `It compares what you would own in each case. If you rent, the ${entrada} and whatever you save each month stay invested. Selling costs are not taken off.`,
    };
  },
};
