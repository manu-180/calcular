import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosIs: TextosUi<UiHipoteca> = {
  slug: "husnaedislan",
  ui: () => ({
    precio: "Verð eignarinnar",
    entradaPorcentaje: "Útborgun (% af verði)",
    entradaMonto: "Útborgun sem upphæð (valfrjálst)",
    entradaMontoAyuda: "Ef þú slærð hana inn er hún notuð í staðinn fyrir prósentuna.",
    tasa: "Ársvextir (%)",
    anios: "Lánstími í árum",
    gastos: "Húsnæðiskostnaður á mánuði (valfrjálst)",
    gastosAyuda: "Hússjóður, rekstrarkostnaður, heimilistrygging eða fasteignagjöld sem þú greiðir til viðbótar við lánið.",
    cuota: "Mánaðarleg greiðsla af láni",
    cuotaTotal: "Mánaðarleg greiðsla með húsnæðiskostnaði",
    entrada: "Útborgun",
    prestado: "Lánsupphæð",
    intereses: "Vextir samtals",
    total: "Greiðslur af láni samtals",
    tabla: "Ár fyrir ár",
    colAnio: "Ár",
    colIntereses: "Greiddir vextir",
    colCapital: "Afborgun",
    colSaldo: "Eftirstöðvar í árslok",
    errorPrecio: "Sláðu inn verð eignarinnar.",
    errorEntrada: "Útborgunin nær yfir allt verðið, svo það er ekkert lán til að reikna. Lækkaðu útborgunina.",
    observacionPrestado: (porcentaje) => `Þú færð ${porcentaje}% af verði eignarinnar að láni. Því hærra sem hlutfallið er, því meiri kröfur gerir bankinn yfirleitt.`,
    observacionCostos: "Kostnaður við kaupin (þinglýsing, lántökugjald, önnur gjöld og verðmat) er ekki með. Gerðu ráð fyrir honum til viðbótar við útborgunina.",
  }),
};
