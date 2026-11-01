import type { TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

export const textosSl: TextosUi<UiCostoDeUnAuto> = {
  slug: "stroski-avtomobila",
  ui: () => ({
    precio: "Vrednost avtomobila",
    precioAyuda: "Koliko ste zanj plačali ali koliko je vreden danes, če ga že dlje vozite.",
    depreciacion: "Izguba vrednosti na leto (%)",
    depreciacionAyuda: "Nov avtomobil v prvem letu izgubi 15 do 25 % vrednosti. Rabljen manj.",
    cuota: "Mesečni obrok kredita za avtomobil (neobvezno)",
    cuotaAyuda: "Samo da vidite, koliko denarja vsak mesec odteče z računa. Ne prišteje se dejanskemu strošku.",
    seguro: "Zavarovanje na mesec",
    distanciaKm: "Kilometri na mesec",
    distanciaMi: "Milje na mesec",
    consumoL100: "Poraba (litrov na 100 km)",
    consumoMpg: "Poraba (milj na galono)",
    precioLitro: "Cena goriva na liter",
    precioGalon: "Cena goriva na galono",
    mantenimiento: "Vzdrževanje na mesec",
    mantenimientoAyuda: "Servis, pnevmatike, popravila in pranje, mesečno povprečje.",
    estacionamiento: "Parkiranje na mesec (neobvezno)",
    otros: "Registracija, cestnina in drugi stroški na mesec (neobvezno)",
    otrosAyuda: "Registracija, tehnični pregled, cestnina in kazni, mesečno povprečje.",
    costoMensual: "Dejanski strošek na mesec",
    costoAnual: "Dejanski strošek na leto",
    porKm: "Strošek na kilometer",
    porMilla: "Strošek na miljo",
    combustible: "Gorivo na mesec",
    depreciacionMensual: "Izguba vrednosti na mesec",
    gastoBolsillo: "Koliko vam na mesec odteče z računa",
    errorConsumo: "Vnesite porabo svojega avtomobila, da izračunamo strošek goriva.",
    observacionCuota:
      "Obrok kredita ni del dejanskega stroška, ker del obroka odplačuje sam avtomobil, to pa je že upoštevano kot izguba vrednosti. Obresti na kredit so dodaten strošek.",
  }),
};
