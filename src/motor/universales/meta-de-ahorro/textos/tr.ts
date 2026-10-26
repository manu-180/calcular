import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosTr: TextosUi<UiMetaDeAhorro> = {
  slug: "birikim-hesaplama",
  ui: () => ({
    meta: "Ne kadar biriktirmek istiyorsunuz?",
    actual: "Şu ana kadar biriktirdiğiniz (isteğe bağlı)",
    meses: "Hedefe ulaşma süresi (ay)",
    rendimiento: "Birikimin yıllık getirisi (%, isteğe bağlı)",
    rendimientoAyuda: "Para faiz getiren bir hesapta ya da yatırımda duruyorsa. Hiç getiri yoksa boş bırakın.",
    aporteMensual: "Her ay biriktirmeniz gereken",
    aporteSemanal: "Haftalık karşılığı",
    totalAportado: "Toplam yatıracağınız",
    intereses: "Kazanılan faiz",
    errorMeta: "Ne kadar biriktirmek istediğinizi girin.",
    yaLlegas: "Elinizdeki birikim, başka bir şey eklemeden bu sürede hedefe ulaşıyor.",
  }),
};
