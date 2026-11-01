import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosFi: TextosUi<UiFechaDeParto> = {
  slug: "laskettu-aika",
  ui: () => ({
    metodo: "Minkä päivämäärän tiedät?",
    fum: "Viimeisten kuukautisten ensimmäinen päivä",
    concepcion: "Hedelmöityspäivä",
    fecha: "Päivämäärä",
    fechaAyuda: "Jos valitsit viimeiset kuukautiset, syötä vuodon ensimmäinen päivä.",
    ciclo: "Kierron pituus (päivää)",
    cicloAyuda: "Käytetään vain viimeisten kuukautisten kanssa. Jos et tiedä, jätä arvoksi 28.",
    fpp: "Laskettu aika (LA)",
    edadGestacional: "Raskausviikko tänään",
    trimestre: "Raskauskolmannes",
    faltan: "Päiviä jäljellä",
    fechaConcepcion: "Arvioitu hedelmöitys",
    semanasYDias: (s, d) => `${s} ${s === 1 ? "viikko" : "viikkoa"}${d ? ` ja ${d} ${d === 1 ? "päivä" : "päivää"}` : ""}`,
    trimestres: ["Ensimmäinen raskauskolmannes", "Toinen raskauskolmannes", "Kolmas raskauskolmannes"],
    errorFutura: "Päivämäärä ei voi olla tämän päivän jälkeen.",
    errorCiclo: "Kierron pituuden on oltava 20 ja 45 päivän välillä.",
    notaPasada: "Päivämäärästä on kulunut yli 42 viikkoa, joten raskausviikkoa ei näytetä.",
    aviso: "Tämä on arvio. Harva vauva syntyy juuri laskettuna päivänä. Ultraäänitutkimus ja neuvolakäynnit antavat varmimman päivämäärän, eikä laskuri korvaa kätilön, terveydenhoitajan tai lääkärin arviota.",
  }),
};
