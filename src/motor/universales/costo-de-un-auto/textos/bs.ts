import type { TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

export const textosBs: TextosUi<UiCostoDeUnAuto> = {
  slug: "troskovi-automobila",
  ui: () => ({
    precio: "Vrijednost automobila",
    precioAyuda: "Koliko je plaćen ili koliko vrijedi danas ako ga već duže vozite.",
    depreciacion: "Gubitak vrijednosti godišnje (%)",
    depreciacionAyuda: "Novi automobil u prvoj godini izgubi 15 do 25 % vrijednosti. Rabljeni manje.",
    cuota: "Mjesečna rata kredita za automobil (nije obavezno)",
    cuotaAyuda: "Samo da vidite koliko vam novca svaki mjesec ode s računa. Ne dodaje se stvarnom trošku.",
    seguro: "Osiguranje mjesečno",
    distanciaKm: "Kilometara mjesečno",
    distanciaMi: "Milja mjesečno",
    consumoL100: "Potrošnja (litara na 100 km)",
    consumoMpg: "Potrošnja (milja po galonu)",
    precioLitro: "Cijena goriva po litri",
    precioGalon: "Cijena goriva po galonu",
    mantenimiento: "Održavanje mjesečno",
    mantenimientoAyuda: "Servis, gume, popravci i pranje, prosječno mjesečno.",
    estacionamiento: "Parkiranje mjesečno (nije obavezno)",
    otros: "Registracija, putarina i ostali troškovi mjesečno (nije obavezno)",
    otrosAyuda: "Registracija, tehnički pregled, putarina i kazne, prosječno mjesečno.",
    costoMensual: "Stvarni trošak mjesečno",
    costoAnual: "Stvarni trošak godišnje",
    porKm: "Trošak po kilometru",
    porMilla: "Trošak po milji",
    combustible: "Gorivo mjesečno",
    depreciacionMensual: "Gubitak vrijednosti mjesečno",
    gastoBolsillo: "Koliko vam mjesečno ode s računa",
    errorConsumo: "Unesite potrošnju svog automobila kako bismo izračunali trošak goriva.",
    observacionCuota:
      "Rata kredita nije u stvarnom trošku jer se njenim dijelom otplaćuje sam automobil, a to je već uračunato kao gubitak vrijednosti. Kamata na kredit dodatni je trošak.",
  }),
};
