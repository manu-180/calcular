import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosTr: TextosUi<UiConsumoElectrico> = {
  slug: "elektrik-tuketimi-hesaplama",
  ui: () => ({
    potencia: "Cihazın gücü (W)",
    potenciaAyuda: "Cihazın etiketinde ya da kılavuzunda watt (W) olarak yazar. kW yazıyorsa 1000 ile çarpın.",
    cantidad: "Aynı cihazdan kaç tane",
    horas: "Günlük kullanım süresi (saat)",
    dias: "Aylık kullanım günü",
    precio: "kWh fiyatı",
    precioAyuda: "Elektrik faturanızda yazar: kWh başına birim fiyat. Tam maliyet için vergiler dâhil fiyatı girin.",
    kwhDia: "Günlük tüketim (kWh)",
    kwhMes: "Aylık tüketim (kWh)",
    kwhAnio: "Yıllık tüketim (kWh)",
    costoDia: "Günlük maliyet",
    costoMes: "Aylık maliyet",
    costoAnio: "Yıllık maliyet",
    errorHoras: "Bir gün 24 saattir: kullanım süresi 0 ile 24 arasında olmalıdır.",
  }),
};
