import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

export const textosTr: TextosUi<UiHormigon> = {
  slug: "beton-hesaplama",
  ui: () => ({
    largo: (u) => `Uzunluk (${u})`,
    ancho: (u) => `Genişlik (${u})`,
    espesor: (u) => `Kalınlık (${u})`,
    espesorAyuda: "Bir avlu ya da yürüyüş yolu genellikle 10 cm (4 in), araç girişi 12 ile 15 cm olur.",
    margen: "Ek pay (%)",
    margenAyuda: "Düzgün olmayan zemin ve dökülen beton için. Genellikle %5 ile %10 arası.",
    bolsa: (u) => `Çimento torbasının ağırlığı (${u})`,
    volumen: (u) => `Tam hacim (${u})`,
    volumenTotal: (u) => `Gereken beton (${u})`,
    volumenPies: "Gereken beton (ft³)",
    cemento: (u) => `Çimento (${u})`,
    bolsas: "Çimento torbası (adet)",
    arena: (u) => `Kum (${u})`,
    piedra: (u) => `Mıcır (${u})`,
    agua: (u) => (u === "L" ? "Su (litre)" : "Su (galon)"),
    errorMedida: "Bu ölçü sıfırdan büyük olmalıdır.",
    aviso: "Malzemeler, genel amaçlı 1:2:3 karışım (m³ başına yaklaşık 350 kg çimento) için yol göstericidir. Karışım oranına, işe ve yöredeki malzemeye göre değişir: işi yürüten ustayla ya da mühendisle teyit edin.",
  }),
};
