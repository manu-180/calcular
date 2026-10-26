import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosTr: TextosUi<UiHipoteca> = {
  slug: "konut-kredisi-hesaplama",
  ui: () => ({
    precio: "Konutun fiyatı",
    entradaPorcentaje: "Peşinat (fiyatın yüzdesi, %)",
    entradaMonto: "Peşinat tutarı (isteğe bağlı)",
    entradaMontoAyuda: "Doldurursanız yüzde yerine bu tutar kullanılır.",
    tasa: "Yıllık faiz oranı (%)",
    anios: "Vade (yıl)",
    gastos: "Aylık konut giderleri (isteğe bağlı)",
    gastosAyuda: "Taksitle birlikte ödediğiniz emlak vergisi, konut sigortası ya da site aidatı.",
    cuota: "Aylık konut kredisi taksiti",
    cuotaTotal: "Giderlerle birlikte aylık ödeme",
    entrada: "Peşinat",
    prestado: "Kredi tutarı",
    intereses: "Toplam faiz",
    total: "Toplam kredi geri ödemesi",
    tabla: "Yıllara göre",
    colAnio: "Yıl",
    colIntereses: "Ödenen faiz",
    colCapital: "Ödenen anapara",
    colSaldo: "Yıl sonunda kalan borç",
    errorPrecio: "Konutun fiyatını girin.",
    errorEntrada: "Peşinat konutun fiyatının tamamını karşılıyor, hesaplanacak bir kredi kalmıyor. Peşinatı düşürün.",
    observacionPrestado: (porcentaje) => `Konutun fiyatının %${porcentaje} kadarını kredi olarak alıyorsunuz. Bu oran büyüdükçe bankaların koşulları genellikle ağırlaşır.`,
    observacionCostos: "Tapu ve noter masrafları, ekspertiz ücreti, kredi tahsis ücreti ve zorunlu sigortalar dâhil değildir. Bu masraflar için peşinatın dışında ayrıca para ayırın.",
  }),
};
