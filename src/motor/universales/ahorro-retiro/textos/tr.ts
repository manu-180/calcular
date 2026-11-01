import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosTr: TextosUi<UiAhorroRetiro> = {
  slug: "emeklilik-birikimi-hesaplama",
  ui: () => ({
    edadActual: "Bugünkü yaşınız",
    edadRetiro: "Emekli olmak istediğiniz yaş",
    actual: "Şu ana kadar biriktirdiğiniz",
    aporte: "Aylık katkı",
    rendimiento: "Yıllık reel getiri (%)",
    rendimientoAyuda: "Yatırımın enflasyonun üzerinde kazandırdığı. Uzun vadede %2 ile %5 arası temkinli bir varsayımdır.",
    aniosRenta: "Emeklilikte karşılanacak yıl sayısı",
    aniosRentaAyuda: "Bu birikimi kaç yıl boyunca kullanmak istediğiniz.",
    capital: "Emeklilikteki birikiminiz",
    renta: "Bu birikimin sağlayacağı aylık gelir",
    aportado: "Toplam katkı",
    intereses: "Toplam büyüme",
    tabla: "Yaşa göre büyüme",
    colEdad: "Yaş",
    colAportado: "O güne kadarki katkı",
    colSaldo: "Birikim",
    errorEdades: "Emeklilik yaşı bugünkü yaşınızdan büyük olmalıdır.",
    errorSinAhorro: "Mevcut birikiminizi ya da aylık katkınızı girin.",
    observacionDineroDeHoy: "Getiriden enflasyon zaten düşüldüğü için tutarlar bugünkü parayla gösterilir.",
    observacionPublica: "Bu yalnızca kendi birikiminizdir. Alabileceğiniz devlet emekli aylığı ya da sosyal güvenlik ödemeleri dâhil değildir.",
  }),
};
