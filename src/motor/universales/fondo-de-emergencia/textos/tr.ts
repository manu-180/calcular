import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosTr: TextosUi<UiFondoDeEmergencia> = {
  slug: "acil-durum-fonu-hesaplama",
  ui: () => ({
    gastos: "Aylık zorunlu giderler",
    gastosAyuda: "Ödemeyi bırakamayacağınız giderler: kira, mutfak, faturalar, ulaşım, sağlık ve kredi taksitleri.",
    meses: "Karşılanacak ay sayısı",
    mesesAyuda: "Geliriniz düzenliyse 3 ile 6 ay. Geliriniz değişkense ya da hanede tek gelir varsa daha fazla.",
    actual: "Şu an ayırdığınız birikim (isteğe bağlı)",
    aporte: "Her ay biriktirebileceğiniz tutar (isteğe bağlı)",
    meta: "Önerilen acil durum fonu",
    falta: "Biriktirmeniz gereken kalan tutar",
    mesesParaLlegar: "Fonu tamamlamak için gereken ay",
    cobertura: "Birikiminizin bugün karşıladığı ay",
    errorGastos: "Bir aylık zorunlu giderlerinizi girin.",
    yaCubierto: "Fonunuz tamam. Bundan sonra biriktirdiklerinizi başka hedeflere ayırabilirsiniz.",
    sinAporte: "Her ay ne kadar biriktirebileceğinizi girin, fonun ne kadar sürede tamamlanacağını gösterelim.",
    observacionDonde: "Fonu, aynı gün çekebileceğiniz ve değerini koruyan ayrı bir hesapta tutun: örneğin bir vadesiz birikim hesabında ya da para piyasası fonunda.",
  }),
};
