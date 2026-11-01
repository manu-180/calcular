import { pluralIs } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosIs: TextosUi<UiTarjetaDeCredito> = {
  slug: "kreditkort",
  ui: () => ({
    saldo: "Skuld á kortinu",
    tasa: "Ársvextir (nafnvextir, %)",
    tasaAyuda: "Vextirnir á kaupum með kortinu. Þeir standa á reikningnum eða í samningnum.",
    modo: "Hvernig viltu borga?",
    modoFijo: "Föst upphæð í hverjum mánuði",
    modoMinimo: "Lágmarksgreiðsla",
    pagoFijo: "Föst upphæð á mánuði",
    minimoPorcentaje: "Lágmarksgreiðsla (% af skuldinni)",
    minimoPorcentajeAyuda: "Það sem kortafyrirtækið krefst í hverjum mánuði. Ef þú ert óviss er 5% algengt.",
    minimoPiso: "Lágmarksgreiðsla aldrei undir",
    meses: "Mánuðir þar til skuldin er greidd",
    intereses: "Vextir sem þú borgar",
    total: "Samtals greitt",
    primerPago: "Fyrsta lágmarksgreiðsla",
    tabla: "Áætlun mánuð fyrir mánuð",
    colMes: "Mánuður",
    colPago: "Greiðsla",
    colInteres: "Vextir",
    colCapital: "Afborgun",
    colSaldo: "Eftirstöðvar",
    errorSaldo: "Sláðu inn hve mikið þú skuldar á kortinu.",
    errorFaltaPago: "Sláðu inn hve mikið þú borgar í hverjum mánuði.",
    errorNoCubre: (interes) => `Með þessari greiðslu lækkar skuldin aldrei. Vextirnir einir eru ${interes} fyrsta mánuðinn. Hækkaðu greiðsluna.`,
    errorMuyLargo: "Með þessari greiðslu tæki meira en 50 ár að greiða upp skuldina. Hækkaðu greiðsluna.",
    observacionAnios: (anios, meses) => {
      const a = pluralIs(anios, "ár", "ár");
      const m = meses === "0" ? "" : ` og ${pluralIs(meses, "mánuð", "mánuði")}`;
      return `Það gerir ${a}${m}.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `Ef þú borgar alltaf ${pago}, jafn mikið og fyrstu lágmarksgreiðsluna, er skuldin greidd eftir ${pluralIs(meses, "mánuð", "mánuði")} og þú sparar ${ahorro} í vöxtum.`,
    observacionNoGastar: "Útreikningurinn gerir ráð fyrir að þú kaupir ekki meira með kortinu á meðan þú greiðir niður skuldina.",
  }),
};
