import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosTr: TextosUi<UiTarjetaDeCredito> = {
  slug: "kredi-karti-borc-hesaplama",
  ui: () => ({
    saldo: "Kart borcu",
    tasa: "Yıllık faiz oranı (%)",
    tasaAyuda: "Hesap ekstrenizde yazan alışveriş faizi. Ekstrede aylık faiz yazıyorsa 12 ile çarpın.",
    modo: "Nasıl ödeyeceksiniz?",
    modoFijo: "Her ay sabit bir tutar",
    modoMinimo: "Asgari ödeme tutarı",
    pagoFijo: "Aylık sabit ödeme",
    minimoPorcentaje: "Asgari ödeme (borcun yüzdesi, %)",
    minimoPorcentajeAyuda: "Kartı veren kuruluşun her ay istediği oran. Emin değilseniz %5 yaygın bir değerdir.",
    minimoPiso: "Asgari ödemenin alt sınırı",
    meses: "Borcun kapanma süresi (ay)",
    intereses: "Ödeyeceğiniz faiz",
    total: "Toplam ödeme",
    primerPago: "İlk asgari ödeme",
    tabla: "Ay ay ödeme planı",
    colMes: "Ay",
    colPago: "Ödeme",
    colInteres: "Faiz",
    colCapital: "Anapara",
    colSaldo: "Kalan borç",
    errorSaldo: "Kartta ödemeniz gereken borcu girin.",
    errorFaltaPago: "Her ay ne kadar ödeyeceğinizi girin.",
    errorNoCubre: (interes) => `Bu ödemeyle borç hiç azalmaz. Yalnızca ilk ayın faizi: ${interes}. Ödemeyi artırın.`,
    errorMuyLargo: "Bu ödemeyle borcun kapanması 50 yıldan uzun sürer. Ödemeyi artırın.",
    observacionAnios: (anios, meses) => (meses === "0" ? `Bu süre ${anios} yıl eder.` : `Bu süre ${anios} yıl ${meses} ay eder.`),
    observacionFijo: (pago, meses, ahorro) =>
      `Her ay ilk asgari ödemeyle aynı tutarı (${pago}) öderseniz borcunuz daha erken kapanır. Kapanma süresi: ${meses} ay. Faizden tasarrufunuz: ${ahorro}.`,
    observacionNoGastar: "Hesaplama, borcu kapatırken kartla yeni alışveriş yapmadığınızı varsayar.",
  }),
};
