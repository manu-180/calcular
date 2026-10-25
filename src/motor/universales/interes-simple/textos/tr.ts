import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosTr: TextosUi<UiInteresSimple> = {
  slug: "basit-faiz-hesaplama",
  ui: () => ({
    capital: "Anapara",
    tasa: "Yıllık faiz oranı (%)",
    tiempo: "Süre",
    unidad: "Süre birimi",
    dias: "Gün",
    meses: "Ay",
    anios: "Yıl",
    base: "Yıldaki gün sayısı (gün olarak verilen süreler için)",
    baseAyuda: "Bazı bankalar yılı 360 gün sayar. Emin değilseniz 365 olarak bırakın.",
    base365: "365 gün",
    base360: "360 gün (banka yılı)",
    interes: "Faiz",
    montoFinal: "Anapara ve faiz toplamı",
    tasaPeriodo: "Dönemin faiz oranı",
    errorCapital: "Sıfırdan büyük bir anapara girin.",
  }),
};
