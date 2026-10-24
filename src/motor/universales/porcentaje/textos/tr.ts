import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosTr: TextosUi<UiPorcentaje> = {
  slug: "yuzde-hesaplama",
  ui: () => ({
    modo: "Ne hesaplamak istiyorsunuz?",
    modoParte: "Y sayısının yüzde X'i kaçtır?",
    modoProporcion: "X sayısı, Y sayısının yüzde kaçıdır?",
    modoAumento: "Y artı yüzde X",
    modoRebaja: "Y eksi yüzde X",
    x: "X sayısı",
    xAyuda: "Yüzde değeri. “X sayısı, Y sayısının yüzde kaçıdır?” seçeneğinde ise parçanın kendisi.",
    y: "Y sayısı",
    resultado: "Sonuç",
    porcentaje: "Yüzde",
    diferencia: "Eklenen ya da düşülen miktar",
    errorYCero: "Y sayısı 0 olamaz: sıfırın yüzdesi hesaplanamaz.",
    fraseParte: (x, y, r) => `${y} sayısının yüzde ${x} kadarı: ${r}.`,
    fraseProporcion: (x, y, p) => `${x}, ${y} sayısının yüzde ${p} kadarıdır.`,
    fraseAumento: (x, y, r, d) => `${y} sayısına yüzde ${x} eklenince sonuç ${r} olur. Eklenen miktar: ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} sayısından yüzde ${x} düşülünce sonuç ${r} olur. Düşülen miktar: ${d}.`,
  }),
};
