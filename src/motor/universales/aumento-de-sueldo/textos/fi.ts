import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosFi: TextosUi<UiAumentoDeSueldo> = {
  slug: "palkankorotus",
  ui: () => ({
    sueldo: "Nykyinen kuukausipalkka",
    sueldoAyuda: "Ennen tai jälkeen verojen, kumpi vain. Tulos lasketaan samalla tavalla.",
    aumentoPorcentaje: "Palkankorotus (%)",
    aumentoMonto: "Palkankorotus summana (valinnainen)",
    aumentoMontoAyuda: "Jos korotus on kiinteä summa, syötä se tähän. Sitä käytetään prosentin sijaan.",
    inflacion: "Inflaatio jakson aikana (%, valinnainen)",
    inflacionAyuda: "Inflaatio edellisen palkankorotuksesi jälkeen, jotta näet, riittääkö palkkasi nyt enempään vai vähempään kuin ennen.",
    sueldosAnio: "Palkkoja vuodessa",
    sueldosAnioAyuda: "12, jos saat kuukausipalkkaa. Enemmän, jos saat joka vuosi myös lomarahan tai ylimääräisen kuukausipalkan.",
    nuevo: "Uusi kuukausipalkka",
    diferenciaMensual: "Ero kuukaudessa",
    diferenciaAnual: "Ero vuodessa",
    porcentaje: "Korotus prosentteina",
    real: "Reaalinen palkankorotus (inflaation jälkeen)",
    realAyuda: "Kuinka paljon enemmän uudella palkallasi saa kuin vanhalla.",
    errorSueldo: "Syötä nykyinen palkkasi.",
    errorSinAumento: "Syötä palkankorotus prosentteina tai summana.",
    observacionGana: (puntos) => `Korotus on inflaatiota suurempi. Palkallasi saa ${puntos} % enemmän kuin ennen.`,
    observacionPierde: (puntos) => `Korotus ei riitä kattamaan inflaatiota. Palkallasi saa ${puntos} % vähemmän kuin ennen.`,
    observacionIgual: "Korotus on yhtä suuri kuin inflaatio. Palkallasi saa saman verran kuin ennen.",
  }),
};
