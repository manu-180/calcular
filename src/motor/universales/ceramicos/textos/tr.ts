import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosTr: TextosUi<UiCeramicos> = {
  slug: "fayans-hesaplama",
  ui: () => ({
    superficie: (u) => `Döşenecek alan (${u})`,
    largo: (u) => `Fayans uzunluğu (${u})`,
    ancho: (u) => `Fayans genişliği (${u})`,
    desperdicio: "Fire payı (%)",
    desperdicioAyuda: "Kesim ve kırılmalar için. Düz döşemede %10, çapraz döşemede %15 kullanın.",
    porCaja: "Kutudaki fayans sayısı",
    porCajaAyuda: "İsteğe bağlı. Kaç kutu alacağınızı görmek için doldurun.",
    piezas: "Gereken fayans (adet)",
    cajas: "Alınacak kutu",
    conDesperdicio: (u) => `Fire payı dâhil alan (${u})`,
    cubre: (u) => `Kutuların kapladığı alan (${u})`,
    errorSuperficie: "Alan sıfırdan büyük olmalıdır.",
    errorPieza: "Fayans ölçüleri sıfırdan büyük olmalıdır.",
  }),
};
