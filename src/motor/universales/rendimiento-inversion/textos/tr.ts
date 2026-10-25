import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosTr: TextosUi<UiRendimientoInversion> = {
  slug: "yatirim-getirisi-hesaplama",
  ui: () => ({
    inicial: "Yatırılan tutar",
    final: "Son değer",
    finalAyuda: "Yatırımın bugünkü değeri ya da sattığınızda elinize geçen tutar.",
    cobrado: "Bu sürede elde edilen gelir (isteğe bağlı)",
    cobradoAyuda: "Tahsil ettiğiniz ve yeniden yatırmadığınız temettü, faiz ya da kira geliri.",
    anios: "Yatırım süresi (yıl)",
    aniosAyuda: "Yılın bir kısmı için ondalık girebilirsiniz; örneğin bir buçuk yıl için 1,5.",
    ganancia: "Kazanç",
    roi: "Toplam getiri (ROI)",
    cagr: "Yıllık getiri (CAGR)",
    cagrAyuda: "Her yıl bileşik olarak tekrarlandığında aynı sonucu veren yıllık getiri.",
    errorInicial: "Başlangıçta ne kadar yatırdığınızı girin.",
    observacionCorto: "Bir yıldan kısa sürelerde yıllık getiri, kısa bir sonucu bütün yıl tekrarlanacakmış gibi büyütür. Dikkatle yorumlayın.",
    observacionInflacion: "Alım gücü kazanıp kazanmadığınızı görmek için yıllık getiriyi aynı dönemin enflasyonuyla karşılaştırın.",
  }),
};
