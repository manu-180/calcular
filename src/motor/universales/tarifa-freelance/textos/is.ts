import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosIs: TextosUi<UiTarifaFreelance> = {
  slug: "verktakataxti",
  ui: () => ({
    ingreso: "Það sem þú vilt hafa eftir á ári",
    ingresoAyuda: "Eftir skatt og kostnað. Þetta eru launin þín sem verktaki.",
    gastos: "Rekstrarkostnaður á ári",
    gastosAyuda: "Búnaður, hugbúnaður, netið, námskeið, bókhald, tryggingar og lífeyrissparnaður.",
    impuestos: "Áætlaðir skattar og gjöld (%)",
    impuestosAyuda: "Það sem fer í skatta og launatengd gjöld af því sem þú rukkar, að frádregnum kostnaði. Ef þú ert óviss skaltu spyrja bókara. 25% er ágætur upphafspunktur.",
    diasLibres: "Frídagar á ári",
    diasLibresAyuda: "Sumarfrí, helgidagar og veikindadagar. Enginn borgar fyrir þá, svo tímagjaldið þarf að dekka þá.",
    diasSemana: "Vinnudagar á viku",
    horasSemana: "Útseldar vinnustundir á viku",
    horasSemanaAyuda: "Aðeins stundir sem þú rukkar fyrir. Öflun viðskiptavina, umsýsla og endurmenntun eru ekki útseldar. Algengt er 20 til 30 af 40.",
    tarifaHora: "Tímagjald",
    tarifaDia: "Daggjald",
    facturacionMensual: "Nauðsynleg velta á mánuði",
    facturacionAnual: "Nauðsynleg velta á ári",
    horasAnio: "Útseldar vinnustundir á ári",
    errorIngreso: "Sláðu inn hve mikið þú vilt þéna á ári.",
    errorImpuestos: "Skatthlutfallið verður að vera undir 100%.",
    errorDias: "Með svona marga frídaga eru engir vinnudagar eftir á árinu.",
    errorHoras: "Sláðu inn hve margar stundir á viku þú getur rukkað fyrir.",
    observacionFacturables: "Ef þú rukkar minna en þetta þénarðu minna en þú gerðir ráð fyrir eða þarft að vinna fleiri stundir.",
  }),
};
