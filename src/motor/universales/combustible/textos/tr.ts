import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

export const textosTr: TextosUi<UiCombustible> = {
  slug: "yakit-hesaplama",
  ui: () => ({
    distancia: (u) => `Yol mesafesi (${u})`,
    idaYVuelta: "Gidiş dönüş",
    tipoConsumo: "Yakıt tüketimi nasıl ölçülüyor",
    l100: "100 km'de litre",
    kml: "Litre başına kilometre",
    consumo: "Yakıt tüketimi",
    consumoMpg: "Yakıt tüketimi (galon başına mil)",
    consumoAyuda: "Kullanım kılavuzuna ya da yol bilgisayarına bakın. Otoyolda tüketim genellikle şehir içinden düşüktür.",
    precio: (u) => (u === "L" ? "Litre fiyatı" : "Galon fiyatı"),
    personas: "Masrafı paylaşan kişi sayısı",
    costo: "Yakıt maliyeti",
    porPersona: "Kişi başı",
    combustible: (u) => (u === "L" ? "Gereken yakıt (litre)" : "Gereken yakıt (galon)"),
    distanciaTotal: (u) => `Toplam mesafe (${u})`,
    costoPorDistancia: (u) => (u === "mi" ? "Mil başına maliyet" : "Kilometre başına maliyet"),
    errorConsumo: "Yakıt tüketimi sıfırdan büyük olmalıdır.",
    errorPersonas: "En az bir kişi olmalıdır.",
  }),
};
