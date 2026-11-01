import type { TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

export const textosSr: TextosUi<UiCostoDeUnAuto> = {
  slug: "troskovi-automobila",
  ui: () => ({
    precio: "Vrednost automobila",
    precioAyuda: "Koliko je plaćen, ili koliko vredi danas ako ga vozite već duže vreme.",
    depreciacion: "Gubitak vrednosti godišnje (%)",
    depreciacionAyuda: "Nov automobil u prvoj godini izgubi 15 do 25% vrednosti. Polovan manje.",
    cuota: "Mesečna rata kredita za automobil (nije obavezno)",
    cuotaAyuda: "Samo da vidite koliko novca vam svakog meseca ode sa računa. Ne dodaje se stvarnom trošku.",
    seguro: "Osiguranje mesečno",
    distanciaKm: "Kilometara mesečno",
    distanciaMi: "Milja mesečno",
    consumoL100: "Potrošnja (litara na 100 km)",
    consumoMpg: "Potrošnja (milja po galonu)",
    precioLitro: "Cena goriva po litru",
    precioGalon: "Cena goriva po galonu",
    mantenimiento: "Održavanje mesečno",
    mantenimientoAyuda: "Servis, gume, popravke i pranje, u proseku mesečno.",
    estacionamiento: "Parking mesečno (nije obavezno)",
    otros: "Registracija, putarina i ostali troškovi mesečno (nije obavezno)",
    otrosAyuda: "Registracija, tehnički pregled, putarina i kazne, u proseku mesečno.",
    costoMensual: "Stvarni trošak mesečno",
    costoAnual: "Stvarni trošak godišnje",
    porKm: "Trošak po kilometru",
    porMilla: "Trošak po milji",
    combustible: "Gorivo mesečno",
    depreciacionMensual: "Gubitak vrednosti mesečno",
    gastoBolsillo: "Koliko vam mesečno ode sa računa",
    errorConsumo: "Unesite potrošnju svog automobila da bismo izračunali trošak goriva.",
    observacionCuota:
      "Rata kredita nije u stvarnom trošku, jer se njenim delom otplaćuje sam automobil, a to je već uračunato kao gubitak vrednosti. Kamata na kredit je dodatni trošak.",
  }),
};
