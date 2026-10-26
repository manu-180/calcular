import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosTr: TextosUi<UiPropina> = {
  slug: "bahsis-hesaplama",
  ui: () => ({
    cuenta: "Hesap tutarı",
    porcentaje: "Bahşiş (%)",
    porcentajeAyuda: "Bahşiş alışkanlığı ülkeden ülkeye ve mekândan mekâna değişir. Size uygun geleni seçin.",
    personas: "Ödeyecek kişi sayısı",
    redondear: "Kişi başı payı yukarı yuvarla",
    redondearAyuda: "Herkes küsuratsız bir tutar öder. Aradaki fark bahşişe eklenir.",
    propina: "Bahşiş",
    total: "Bahşiş dâhil toplam",
    porPersona: "Kişi başı ödeme",
    propinaEfectiva: "Yuvarlama sonrası bahşiş",
    errorPersonas: "En az bir kişinin ödemesi gerekir.",
    observacionRedondeo: (efectiva) => `Yukarı yuvarlamadan sonra bahşiş, hesabın yüzde ${efectiva} kadarı olur.`,
  }),
};
