import { formaIs } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosIs: TextosUi<UiPrestamo> = {
  slug: "lanareiknivel",
  ui: () => ({
    monto: "Lánsupphæð",
    tasa: "Ársvextir (%)",
    tasaAyuda: "Nafnvextir á ári samkvæmt tilboðinu. Gjöld eru ekki með.",
    meses: "Lánstími í mánuðum",
    extra: "Aukagreiðsla á mánuði (valfrjálst)",
    extraAyuda: "Það sem þú vilt greiða aukalega í hverjum mánuði til að klára lánið fyrr. Það fer allt í að lækka skuldina.",
    cuota: "Mánaðarleg greiðsla",
    intereses: "Vextir samtals",
    total: "Samtals að greiða",
    mesesReales: "Mánuðir þar til lánið er greitt með aukagreiðslu",
    ahorro: "Vextir sem þú sparar",
    tabla: "Greiðsluáætlun",
    colMes: "Mánuður",
    colPago: "Greiðsla",
    colInteres: "Vextir",
    colCapital: "Afborgun",
    colSaldo: "Eftirstöðvar",
    errorMonto: "Sláðu inn upphæð sem er hærri en núll.",
    observacionCostos: "Í mánaðarlegri greiðslu er ekki reiknað með tryggingum, gjöldum eða sköttum sem lánveitandinn getur bætt við. Spurðu um heildarkostnaðinn áður en þú skrifar undir.",
    observacionExtra: (meses, ahorro) => `Með aukagreiðslunni er lánið greitt eftir ${meses} ${formaIs(meses, "mánuð", "mánuði")} og þú sparar ${ahorro} í vexti.`,
  }),
};
