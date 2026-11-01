import type { TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

export const textosSk: TextosUi<UiCostoDeUnAuto> = {
  slug: "naklady-na-auto",
  ui: () => ({
    precio: "Hodnota auta",
    precioAyuda: "Koľko ste zaň zaplatili alebo akú má hodnotu dnes, ak ním jazdíte už dlhší čas.",
    depreciacion: "Strata hodnoty za rok (%)",
    depreciacionAyuda: "Nové auto stratí v prvom roku 15 až 25 % hodnoty. Jazdené menej.",
    cuota: "Mesačná splátka úveru na auto (nepovinné)",
    cuotaAyuda: "Len pre prehľad, koľko peňazí vám každý mesiac odíde z účtu. K skutočným nákladom sa nepripočítava.",
    seguro: "Poistenie za mesiac",
    distanciaKm: "Kilometre za mesiac",
    distanciaMi: "Míle za mesiac",
    consumoL100: "Spotreba (litre na 100 km)",
    consumoMpg: "Spotreba (míle na galón)",
    precioLitro: "Cena paliva za liter",
    precioGalon: "Cena paliva za galón",
    mantenimiento: "Údržba za mesiac",
    mantenimientoAyuda: "Servis, pneumatiky, opravy a umývanie, v priemere za mesiac.",
    estacionamiento: "Parkovanie za mesiac (nepovinné)",
    otros: "Poplatky, diaľničná známka a ďalšie výdavky za mesiac (nepovinné)",
    otrosAyuda: "Technická kontrola, diaľničná známka, mýto a pokuty, v priemere za mesiac.",
    costoMensual: "Skutočné náklady za mesiac",
    costoAnual: "Skutočné náklady za rok",
    porKm: "Náklady na jeden kilometer",
    porMilla: "Náklady na jednu míľu",
    combustible: "Palivo za mesiac",
    depreciacionMensual: "Strata hodnoty za mesiac",
    gastoBolsillo: "Koľko vám mesačne odíde z účtu",
    errorConsumo: "Zadajte spotrebu svojho auta, aby sme mohli vypočítať náklady na palivo.",
    observacionCuota:
      "Splátka úveru nie je v skutočných nákladoch, pretože jej časť spláca samotné auto, a to je už započítané ako strata hodnoty. Úroky z úveru sú výdavok navyše.",
  }),
};
