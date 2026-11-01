import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosTr: TextosUi<UiPrestamo> = {
  slug: "kredi-hesaplama",
  ui: () => ({
    monto: "Kredi tutarı",
    tasa: "Yıllık faiz oranı (%)",
    tasaAyuda: "Teklifteki yıllık nominal faiz. Banka aylık faiz veriyorsa 12 ile çarpın. Masraflar dâhil değildir.",
    meses: "Vade (ay)",
    extra: "Aylık ek ödeme (isteğe bağlı)",
    extraAyuda: "Krediyi daha erken kapatmak için her ay eklemek istediğiniz tutar. Tamamı anaparaya gider.",
    cuota: "Aylık taksit",
    intereses: "Toplam faiz",
    total: "Toplam geri ödeme",
    mesesReales: "Ek ödemeyle kapanma süresi (ay)",
    ahorro: "Tasarruf ettiğiniz faiz",
    tabla: "Ödeme planı",
    colMes: "Ay",
    colPago: "Taksit",
    colInteres: "Faiz",
    colCapital: "Anapara",
    colSaldo: "Kalan borç",
    errorMonto: "Sıfırdan büyük bir tutar girin.",
    observacionCostos: "Taksite bankanın ekleyebileceği sigorta, masraf ve vergiler dâhil değildir. İmzalamadan önce toplam maliyeti sorun.",
    observacionExtra: (meses, ahorro) => `Ek ödemeyle krediniz daha erken kapanır. Kapanma süresi: ${meses} ay. Faizden tasarrufunuz: ${ahorro}.`,
  }),
};
