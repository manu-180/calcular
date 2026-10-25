import type { TextosUi } from "../../tipos";
import type { UiMetrosCuadrados } from "../definicion";

export const textosTr: TextosUi<UiMetrosCuadrados> = {
  slug: "metrekare-hesaplama",
  ui: () => ({
    forma: (n) => `${n}. alan: şekil`,
    formaAyuda: "Oda L biçimindeyse ya da düzgün değilse parçalara ayırın, hesaplama hepsini toplar.",
    ninguna: "Kullanılmıyor",
    rectangulo: "Dikdörtgen ya da kare",
    triangulo: "Üçgen",
    circulo: "Daire",
    medidaA: (n, u) => `${n}. alan: uzunluk, taban ya da çap (${u})`,
    medidaAAyuda: "Dikdörtgen: uzunluk ve genişlik. Üçgen: taban ve yükseklik. Daire: yalnızca çap.",
    medidaB: (n, u) => `${n}. alan: genişlik ya da yükseklik (${u})`,
    total: (u) => `Toplam alan (${u})`,
    equivale: (u) => `Karşılığı (${u})`,
    parcial: (n, u) => `${n}. alan (${u})`,
    errorMedida: "Bu ölçü eksik ya da sıfır.",
  }),
};
