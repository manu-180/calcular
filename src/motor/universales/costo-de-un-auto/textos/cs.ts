import type { TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

export const textosCs: TextosUi<UiCostoDeUnAuto> = {
  slug: "naklady-na-auto",
  ui: () => ({
    precio: "Hodnota auta",
    precioAyuda: "Kolik jste za něj zaplatili, nebo kolik má hodnotu dnes, pokud s ním jezdíte už delší dobu.",
    depreciacion: "Ztráta hodnoty za rok (%)",
    depreciacionAyuda: "Nové auto ztratí v prvním roce 15 až 25 % hodnoty. Ojeté méně.",
    cuota: "Měsíční splátka úvěru na auto (nepovinné)",
    cuotaAyuda: "Jen pro přehled, kolik peněz vám každý měsíc odejde z účtu. Ke skutečným nákladům se nepřičítá.",
    seguro: "Pojištění za měsíc",
    distanciaKm: "Kilometrů za měsíc",
    distanciaMi: "Mil za měsíc",
    consumoL100: "Spotřeba (litrů na 100 km)",
    consumoMpg: "Spotřeba (mil na galon)",
    precioLitro: "Cena paliva za litr",
    precioGalon: "Cena paliva za galon",
    mantenimiento: "Údržba za měsíc",
    mantenimientoAyuda: "Servis, pneumatiky, opravy a mytí, v průměru za měsíc.",
    estacionamiento: "Parkování za měsíc (nepovinné)",
    otros: "Poplatky, dálniční známka a další výdaje za měsíc (nepovinné)",
    otrosAyuda: "Technická kontrola, dálniční známka, mýtné a pokuty, v průměru za měsíc.",
    costoMensual: "Skutečné náklady za měsíc",
    costoAnual: "Skutečné náklady za rok",
    porKm: "Náklady na jeden kilometr",
    porMilla: "Náklady na jednu míli",
    combustible: "Palivo za měsíc",
    depreciacionMensual: "Ztráta hodnoty za měsíc",
    gastoBolsillo: "Kolik vám měsíčně odejde z účtu",
    errorConsumo: "Zadejte spotřebu svého auta, abychom mohli spočítat náklady na palivo.",
    observacionCuota:
      "Splátka úvěru není ve skutečných nákladech, protože její část splácí samotné auto, a to už je započtené jako ztráta hodnoty. Úroky z úvěru jsou výdaj navíc.",
  }),
};
