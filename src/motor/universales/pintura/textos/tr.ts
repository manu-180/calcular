import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "litre" : "galon");

export const textosTr: TextosUi<UiPintura> = {
  slug: "boya-hesaplama",
  ui: () => ({
    modo: "Hangi ölçüleriniz var?",
    modoMedidas: "Duvarların uzunluğu ve yüksekliği",
    modoSuperficie: "Toplam alan",
    largo: (u) => `Duvarların toplam uzunluğu (${u})`,
    largoAyuda: "Boyayacağınız tüm duvarların toplamı. Bir oda için çevre uzunluğu.",
    alto: (u) => `Duvar yüksekliği (${u})`,
    superficie: (u) => `Boyanacak alan (${u})`,
    aberturas: (u) => `Düşülecek kapı ve pencereler (${u})`,
    aberturasAyuda: "Bir kapı yaklaşık 2 m² (21 ft²), standart bir pencere 1 ile 2 m² kadardır.",
    manos: "Kat sayısı",
    rendimiento: (u) => `Boya sarfiyatı (${u})`,
    rendimientoAyuda: "Kutunun üzerinde yazar: bir katta ne kadar alanı kapladığı. Bilmiyorsanız önerilen değeri bırakın.",
    recomendado: (u) => `Alınacak boya (${volumen(u)})`,
    recomendadoAyuda: "Rötuşlar ve ruloda kalan boya için %10 pay dâhildir.",
    necesario: (u) => `Tam miktar (${volumen(u)})`,
    neta: (u) => `Boyanacak alan (${u})`,
    errorMedidas: "Duvarların uzunluğunu ve yüksekliğini girin.",
    errorSuperficie: "Boyanacak alanı girin.",
    errorAberturas: "Kapı ve pencereler duvarın tamamını kaplayamaz.",
    errorRendimiento: "Boya sarfiyatı sıfırdan büyük olmalıdır.",
  }),
};
