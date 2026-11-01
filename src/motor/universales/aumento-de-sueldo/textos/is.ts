import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosIs: TextosUi<UiAumentoDeSueldo> = {
  slug: "launahaekkun",
  ui: () => ({
    sueldo: "Núverandi mánaðarlaun",
    sueldoAyuda: "Fyrir eða eftir skatt, eins og þú vilt. Niðurstaðan er reiknuð á sama hátt.",
    aumentoPorcentaje: "Launahækkun (%)",
    aumentoMonto: "Launahækkun sem upphæð (valfrjálst)",
    aumentoMontoAyuda: "Ef hækkunin er föst upphæð skaltu slá hana inn hér. Hún er þá notuð í staðinn fyrir prósentuna.",
    inflacion: "Verðbólga á tímabilinu (%, valfrjálst)",
    inflacionAyuda: "Verðbólgan frá síðustu launahækkun, til að sjá hvort launin duga fyrir meira eða minna en áður.",
    sueldosAnio: "Fjöldi launagreiðslna á ári",
    sueldosAnioAyuda: "12 ef þú færð mánaðarlaun. Fleiri ef þú færð líka aukagreiðslu á hverju ári.",
    nuevo: "Ný mánaðarlaun",
    diferenciaMensual: "Munur á mánuði",
    diferenciaAnual: "Munur á ári",
    porcentaje: "Launahækkun í prósentum",
    real: "Raunhækkun launa (eftir verðbólgu)",
    realAyuda: "Hve miklu meira nýju launin duga fyrir miðað við þau gömlu.",
    errorSueldo: "Sláðu inn núverandi laun þín.",
    errorSinAumento: "Sláðu inn launahækkunina í prósentum eða sem upphæð.",
    observacionGana: (puntos) => `Launin hækka umfram verðbólgu. Kaupmátturinn eykst um ${puntos}%.`,
    observacionPierde: (puntos) => `Hækkunin nær ekki verðbólgunni. Kaupmátturinn minnkar um ${puntos}%.`,
    observacionIgual: "Hækkunin er jafnmikil og verðbólgan. Kaupmátturinn er óbreyttur.",
  }),
};
