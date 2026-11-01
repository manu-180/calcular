import type { TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

export const textosLt: TextosUi<UiCostoDeUnAuto> = {
  slug: "automobilio-islaikymo-kastai",
  ui: () => ({
    precio: "Automobilio vertė",
    precioAyuda: "Kiek už jį sumokėjote arba kiek jis vertas šiandien, jei juo važinėjate jau seniai.",
    depreciacion: "Vertės sumažėjimas per metus (%)",
    depreciacionAyuda: "Naujas automobilis per pirmuosius metus netenka nuo 15 iki 25 % vertės. Naudotas mažiau.",
    cuota: "Mėnesinė automobilio paskolos įmoka (neprivaloma)",
    cuotaAyuda: "Tik apžvalgai, kiek pinigų kas mėnesį išeina iš sąskaitos. Prie tikrųjų kaštų nepridedama.",
    seguro: "Draudimas per mėnesį",
    distanciaKm: "Kilometrai per mėnesį",
    distanciaMi: "Mylios per mėnesį",
    consumoL100: "Sąnaudos (litrai 100 km)",
    consumoMpg: "Sąnaudos (mylios galonui)",
    precioLitro: "Kuro litro kaina",
    precioGalon: "Kuro galono kaina",
    mantenimiento: "Priežiūra per mėnesį",
    mantenimientoAyuda: "Servisas, padangos, remontas ir plovimas, vidutiniškai per mėnesį.",
    estacionamiento: "Stovėjimas per mėnesį (neprivaloma)",
    otros: "Mokesčiai, vinjetė ir kitos išlaidos per mėnesį (neprivaloma)",
    otrosAyuda: "Techninė apžiūra, vinjetė, kelių mokesčiai ir baudos, vidutiniškai per mėnesį.",
    costoMensual: "Tikrieji kaštai per mėnesį",
    costoAnual: "Tikrieji kaštai per metus",
    porKm: "Kaštai vienam kilometrui",
    porMilla: "Kaštai vienai mylei",
    combustible: "Kuras per mėnesį",
    depreciacionMensual: "Vertės sumažėjimas per mėnesį",
    gastoBolsillo: "Kiek kas mėnesį išeina iš sąskaitos",
    errorConsumo: "Įveskite automobilio sąnaudas, kad galėtume apskaičiuoti kuro išlaidas.",
    observacionCuota:
      "Paskolos įmoka neįskaičiuota į tikruosius kaštus, nes jos dalis apmoka patį automobilį, o tai jau įskaičiuota kaip vertės sumažėjimas. Paskolos palūkanos yra papildoma išlaida.",
  }),
};
