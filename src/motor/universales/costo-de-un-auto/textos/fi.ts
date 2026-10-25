import type { TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

export const textosFi: TextosUi<UiCostoDeUnAuto> = {
  slug: "auton-kulut",
  ui: () => ({
    precio: "Auton arvo",
    precioAyuda: "Hinta, jonka maksoit, tai auton arvo nyt, jos olet omistanut sen jo jonkin aikaa.",
    depreciacion: "Arvon alenema vuodessa (%)",
    depreciacionAyuda: "Uusi auto menettää ensimmäisenä vuonna 15 % tai jopa 25 % arvostaan. Käytetty menettää vähemmän.",
    cuota: "Autolainan kuukausierä (valinnainen)",
    cuotaAyuda: "Vain sen näyttämiseksi, paljonko tililtä lähtee kuukaudessa. Sitä ei lisätä todellisiin kuluihin.",
    seguro: "Vakuutus kuukaudessa",
    distanciaKm: "Kilometrejä kuukaudessa",
    distanciaMi: "Maileja kuukaudessa",
    consumoL100: "Polttoaineen kulutus (litraa / 100 km)",
    consumoMpg: "Polttoaineen kulutus (mailia gallonalla)",
    precioLitro: "Polttoaineen litrahinta",
    precioGalon: "Polttoaineen gallonahinta",
    mantenimiento: "Huolto kuukaudessa",
    mantenimientoAyuda: "Huollot, renkaat, korjaukset ja pesut, keskimäärin kuukautta kohden.",
    estacionamiento: "Pysäköinti kuukaudessa (valinnainen)",
    otros: "Verot, maksut ja muut kulut kuukaudessa (valinnainen)",
    otrosAyuda: "Ajoneuvovero, katsastus, tiemaksut ja sakot, keskimäärin kuukautta kohden.",
    costoMensual: "Todelliset kulut kuukaudessa",
    costoAnual: "Todelliset kulut vuodessa",
    porKm: "Kulut per kilometri",
    porMilla: "Kulut per maili",
    combustible: "Polttoaine kuukaudessa",
    depreciacionMensual: "Arvon alenema kuukaudessa",
    gastoBolsillo: "Tililtä lähtevä summa kuukaudessa",
    errorConsumo: "Syötä auton polttoaineen kulutus, jotta polttoainekulut voidaan laskea.",
    observacionCuota:
      "Lainan lyhennystä ei lasketa todellisiin kuluihin, koska osa siitä maksaa itse autoa, ja se näkyy jo arvon alenemassa. Lainan korko on lisäkulu tämän päälle.",
  }),
};
