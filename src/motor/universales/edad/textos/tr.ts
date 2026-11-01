import type { TextosUi } from "../../tipos";
import { duracionTr } from "../../dias-entre-fechas/textos/tr";
import type { UiEdad } from "../definicion";

export const textosTr: TextosUi<UiEdad> = {
  slug: "yas-hesaplama",
  ui: () => ({
    nacimiento: "Doğum tarihi",
    referencia: "Yaşın hesaplanacağı tarih",
    referenciaAyuda: "Varsayılan olarak bugün. Başka bir tarihteki yaşı görmek için değiştirin.",
    edad: "Yaş",
    anios: "Tam yaş",
    totalMeses: "Ay olarak",
    totalSemanas: "Hafta olarak",
    totalDias: "Gün olarak",
    proximo: "Bir sonraki doğum günü",
    faltan: "Kalan gün",
    cumplira: "Girilecek yaş",
    duracion: duracionTr,
    errorFutura: "Doğum tarihi, yaşın hesaplanacağı tarihten sonra olamaz.",
    cumpleHoy: (anios) => `Bugün doğum günü. Yeni yaş: ${anios}.`,
    nota29: "29 Şubat doğumlular için artık yıl olmayan yıllarda doğum günü 28 Şubat sayılır.",
  }),
};
