import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

export const textosTr: TextosUi<UiHorasTrabajadas> = {
  slug: "calisma-saati-hesaplama",
  ui: () => ({
    dias: ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"],
    entrada: (dia) => `${dia}: giriş`,
    salida: (dia) => `${dia}: çıkış`,
    horarioAyuda: "Çalışmadığınız günleri boş bırakın. Gece yarısından sonra çıkarsanız aynı vardiya sayılır.",
    pausa: "Günlük ücretsiz mola (dakika)",
    pausaAyuda: "Ücret ödenmeyen öğle ya da dinlenme arası. Çalıştığınız her günden düşülür.",
    pagoHora: "Saatlik ücret",
    umbral: "Haftalık normal çalışma saati (isteğe bağlı)",
    umbralAyuda: "Bu sayının üzerindeki saatler fazla mesai ücretiyle ödenir. Fazla mesai yoksa boş bırakın.",
    recargo: "Fazla mesai zammı (%)",
    recargoAyuda: "Her fazla mesai saatinin ne kadar fazla ödendiği. %50, saatlik ücretin bir buçuk katı demektir.",
    horasTotales: "Çalışılan saat",
    horasReloj: "Saat ve dakika olarak",
    horasNormales: "Normal saatler",
    horasExtra: "Fazla mesai saatleri",
    pagoNormal: "Normal saatlerin ücreti",
    pagoExtra: "Fazla mesai ücreti",
    pagoTotal: "Haftanın toplam ücreti",
    tabla: "Gün gün",
    colDia: "Gün",
    colEntrada: "Giriş",
    colSalida: "Çıkış",
    colHoras: "Saat",
    errorFaltaSalida: (dia) => `Çıkış saati eksik: ${dia}.`,
    errorFaltaEntrada: (dia) => `Giriş saati eksik: ${dia}.`,
    errorIguales: (dia) => `Giriş ve çıkış saati aynı: ${dia}.`,
    errorPausa: (dia) => `Mola, vardiyanın kendisi kadar ya da ondan uzun: ${dia}.`,
    errorSinDias: "En az bir gün için giriş ve çıkış saatini doldurun.",
    observacionNoche: "Bazı vardiyalar ertesi gün bitiyor: tamamı başladığı güne sayılır.",
    observacionGenerico:
      "Bu genel bir hesaplamadır. Azami çalışma süreleri, fazla mesai kuralları ve gece ya da tatil günü çalışmasının ücreti yasaya ve iş sözleşmenize bağlıdır.",
  }),
};
