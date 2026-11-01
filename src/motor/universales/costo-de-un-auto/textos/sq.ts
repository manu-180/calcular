import type { TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

export const textosSq: TextosUi<UiCostoDeUnAuto> = {
  slug: "kosto-e-makines",
  ui: () => ({
    precio: "Vlera e makinës",
    precioAyuda: "Sa keni paguar për të ose sa vlen sot, nëse e keni prej kohësh.",
    depreciacion: "Vlera e humbur në vit (%)",
    depreciacionAyuda: "Një makinë e re humbet midis 15% dhe 25% në vitin e parë. Një e përdorur, më pak.",
    cuota: "Kësti mujor i kredisë (opsional)",
    cuotaAyuda: "Vetëm për të parë çfarë del nga llogaria çdo muaj. Nuk i shtohet kostos reale.",
    seguro: "Sigurimi në muaj",
    distanciaKm: "Kilometra në muaj",
    distanciaMi: "Milje në muaj",
    consumoL100: "Konsumi (litra për 100 km)",
    consumoMpg: "Konsumi (milje për gallon)",
    precioLitro: "Çmimi i karburantit për litër",
    precioGalon: "Çmimi i karburantit për gallon",
    mantenimiento: "Mirëmbajtja në muaj",
    mantenimientoAyuda: "Servise, goma, riparime dhe larje, mesatarisht në muaj.",
    estacionamiento: "Parkimi në muaj (opsional)",
    otros: "Taksa, pagesa rrugore dhe kosto të tjera në muaj (opsional)",
    otrosAyuda: "Taksa e makinës, kontrolli teknik, vinjeta dhe gjobat, mesatarisht në muaj.",
    costoMensual: "Kostoja reale në muaj",
    costoAnual: "Kostoja reale në vit",
    porKm: "Kosto për kilometër",
    porMilla: "Kosto për milje",
    combustible: "Karburanti në muaj",
    depreciacionMensual: "Vlera e humbur në muaj",
    gastoBolsillo: "Çfarë del nga llogaria çdo muaj",
    errorConsumo: "Vendosni konsumin e makinës që të llogarisim koston e karburantit.",
    observacionCuota:
      "Kësti i kredisë nuk hyn në koston reale, sepse një pjesë e tij paguan makinën, e cila është llogaritur tashmë si vlerë e humbur. Interesi i kredisë është një kosto shtesë.",
  }),
};
