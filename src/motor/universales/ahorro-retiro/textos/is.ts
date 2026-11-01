import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosIs: TextosUi<UiAhorroRetiro> = {
  slug: "eftirlaunasparnadur",
  ui: () => ({
    edadActual: "Aldur þinn í dag",
    edadRetiro: "Aldur þegar þú vilt fara á eftirlaun",
    actual: "Það sem þú hefur þegar sparað",
    aporte: "Mánaðarlegur sparnaður",
    rendimiento: "Raunávöxtun á ári (%)",
    rendimientoAyuda: "Það sem sparnaðurinn gefur umfram verðbólgu. 2% til 5% er varfærin forsenda til langs tíma.",
    aniosRenta: "Fjöldi ára sem sparnaðurinn á að endast",
    aniosRentaAyuda: "Hve mörg ár þú vilt taka út af sparnaðinum.",
    capital: "Sparnaður við starfslok",
    renta: "Mánaðarleg úttekt af sparnaði",
    aportado: "Lagt fyrir samtals",
    intereses: "Ávöxtun samtals",
    tabla: "Þróun eftir aldri",
    colEdad: "Aldur",
    colAportado: "Lagt fyrir til þessa",
    colSaldo: "Sparnaður",
    errorEdades: "Aldur við starfslok verður að vera hærri en aldur þinn í dag.",
    errorSinAhorro: "Sláðu inn núverandi sparnað eða mánaðarlegan sparnað.",
    observacionDineroDeHoy: "Upphæðirnar eru á verðlagi dagsins, því að ávöxtunin er þegar reiknuð eftir verðbólgu.",
    observacionPublica: "Hér er aðeins reiknað með þínum eigin sparnaði. Lífeyrir frá ríki eða lífeyrissjóði er ekki talinn með.",
  }),
};
