import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

// Vikudagar eru skrifaðir með litlum staf á íslensku. Í merkingum byrja þeir setningu og fá stóran staf.
const stor = (s: string) => s[0].toUpperCase() + s.slice(1);

export const textosIs: TextosUi<UiHorasTrabajadas> = {
  slug: "vinnustundir",
  ui: () => ({
    dias: ["mánudagur", "þriðjudagur", "miðvikudagur", "fimmtudagur", "föstudagur", "laugardagur", "sunnudagur"],
    entrada: (dia) => `${stor(dia)}: byrjun`,
    salida: (dia) => `${stor(dia)}: lok`,
    horarioAyuda: "Skildu þá daga eftir tóma sem þú vannst ekki. Ef þú hættir eftir miðnætti telst það sama vakt.",
    pausa: "Ólaunað hlé á dag (mínútur)",
    pausaAyuda: "Matartími eða hlé sem ekki er greitt. Það er dregið frá hvern dag sem þú vannst.",
    pagoHora: "Tímakaup",
    umbral: "Venjulegur vinnutími á viku (valfrjálst)",
    umbralAyuda: "Stundir umfram þennan fjölda eru greiddar sem yfirvinna. Skildu reitinn eftir tóman ef engin yfirvinna er.",
    recargo: "Yfirvinnuálag (%)",
    recargoAyuda: "Hve miklu meira hver yfirvinnustund gefur. 50% þýðir eitt og hálft tímakaup.",
    horasTotales: "Unnar vinnustundir",
    horasReloj: "Í klukkustundum og mínútum",
    horasNormales: "Venjulegar vinnustundir",
    horasExtra: "Yfirvinnustundir",
    pagoNormal: "Laun fyrir venjulegan vinnutíma",
    pagoExtra: "Yfirvinnugreiðsla",
    pagoTotal: "Laun fyrir vikuna",
    tabla: "Dag fyrir dag",
    colDia: "Dagur",
    colEntrada: "Byrjun",
    colSalida: "Lok",
    colHoras: "Stundir",
    errorFaltaSalida: (dia) => `${stor(dia)}: lokatíma vantar.`,
    errorFaltaEntrada: (dia) => `${stor(dia)}: upphafstíma vantar.`,
    errorIguales: (dia) => `${stor(dia)}: byrjun og lok eru á sama tíma.`,
    errorPausa: (dia) => `${stor(dia)}: hléið er jafnlangt vaktinni eða lengra.`,
    errorSinDias: "Sláðu inn byrjun og lok fyrir að minnsta kosti einn dag.",
    observacionNoche: "Sumar vaktir enda daginn eftir. Þær eru taldar að fullu á þeim degi sem þær byrja.",
    observacionGenerico:
      "Þetta er almennur útreikningur. Hversu mikið þú mátt vinna, reglur um yfirvinnu og álag fyrir kvöld-, nætur- og helgarvinnu fara eftir lögum, kjarasamningi og ráðningarsamningi þínum.",
  }),
};
