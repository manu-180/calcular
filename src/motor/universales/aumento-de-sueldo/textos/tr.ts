import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosTr: TextosUi<UiAumentoDeSueldo> = {
  slug: "maas-zammi-hesaplama",
  ui: () => ({
    sueldo: "Şu anki aylık maaş",
    sueldoAyuda: "Brüt ya da net, hangisini isterseniz. Sonuç aynı esasa göre çıkar.",
    aumentoPorcentaje: "Zam oranı (%)",
    aumentoMonto: "Zam tutarı (isteğe bağlı)",
    aumentoMontoAyuda: "Zammınız sabit bir tutarsa buraya girin. Oran yerine bu kullanılır.",
    inflacion: "Dönemin enflasyonu (%, isteğe bağlı)",
    inflacionAyuda: "Son zammınızdan bu yana geçen enflasyon; maaşınızın eskisinden fazla mı az mı aldığını görmek için.",
    sueldosAnio: "Yılda alınan maaş sayısı",
    sueldosAnioAyuda: "Aylık maaşta 12. Her yıl ek olarak bir ya da iki maaş tutarında ikramiye alıyorsanız 13 ya da 14.",
    nuevo: "Yeni aylık maaş",
    diferenciaMensual: "Aylık fark",
    diferenciaAnual: "Yıllık fark",
    porcentaje: "Yüzde olarak zam",
    real: "Reel zam (enflasyondan arındırılmış)",
    realAyuda: "Yeni maaşınızın eski maaşınıza göre ne kadar fazla şey satın alabildiği.",
    errorSueldo: "Şu anki maaşınızı girin.",
    errorSinAumento: "Zammı oran ya da tutar olarak girin.",
    observacionGana: (puntos) => `Enflasyonun üzerinde zam aldınız: maaşınız eskisine göre %${puntos} daha fazla şey satın alıyor.`,
    observacionPierde: (puntos) => `Zammınız enflasyonun altında kaldı: maaşınız eskisine göre %${puntos} daha az şey satın alıyor.`,
    observacionIgual: "Zammınız enflasyonla aynı: maaşınız eskisi kadar şey satın alıyor.",
  }),
};
