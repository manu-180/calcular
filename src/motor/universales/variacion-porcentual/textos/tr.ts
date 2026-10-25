import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosTr: TextosUi<UiVariacion> = {
  slug: "yuzde-degisim-hesaplama",
  ui: () => ({
    inicial: "İlk değer",
    final: "Son değer",
    variacion: "Yüzde değişim",
    diferencia: "Fark",
    vuelta: "Başa dönmek için gereken değişim",
    vueltaAyuda: "Son değerin ilk değere geri dönmesi için ne kadar değişmesi gerektiği.",
    errorInicialCero: "İlk değer 0 olamaz: sıfırdan yüzde değişim hesaplanamaz.",
    subio: (p) => `Yüzde ${p} arttı.`,
    bajo: (p) => `Yüzde ${p} azaldı.`,
    igual: "Değişim yok: iki değer aynı.",
  }),
};
