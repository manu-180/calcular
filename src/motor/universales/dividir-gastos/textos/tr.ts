import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosTr: TextosUi<UiDividirGastos> = {
  slug: "hesap-bolme-hesaplama",
  ui: () => ({
    persona: (n) => `${n}. kişi`,
    personaAyuda: "Her kişinin ne kadar ödediğini girin. Hiç ödemeyen ama masrafa ortak olan biri varsa 0 yazın. Diğer kutuları boş bırakın.",
    total: "Toplam harcama",
    personas: "Kişi sayısı",
    cuota: "Kişi başı pay",
    transferencias: "Hesaplaşma için gereken ödeme sayısı",
    tabla: "Kim kime ödeyecek",
    colDe: "Ödeyen",
    colPara: "Alan",
    colMonto: "Tutar",
    errorPocas: "Masrafı bölüşmek için en az iki kişi gerekir.",
    aMano: "Hesap denk: herkes aynı tutarı ödemiş.",
  }),
};
