import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosTr: TextosUi<UiOvulacion> = {
  slug: "yumurtlama-donemi-hesaplama",
  ui: () => ({
    fum: "Son adet tarihinin ilk günü",
    fumAyuda: "Kanamanın başladığı ilk gün, son gün değil.",
    ciclo: "Adet döngüsü süresi (gün)",
    cicloAyuda: "Bir adetin ilk gününden bir sonrakinden önceki güne kadar. Değişiyorsa ortalamasını girin.",
    ovulacion: "Tahmini yumurtlama günü",
    fertilDesde: "Doğurgan dönem başlangıcı",
    fertilHasta: "Doğurgan dönem bitişi",
    proxima: "Sonraki adet",
    tabla: "Sonraki döngüler",
    colRegla: "Adet",
    colDesde: "Doğurgan dönem başı",
    colHasta: "Doğurgan dönem sonu",
    colOvulacion: "Yumurtlama",
    errorCiclo: "Döngü süresi 21 ile 45 gün arasında olmalıdır.",
    aviso: "Bu, düzenli döngüler için bir tahmindir. Doğum kontrol yöntemi değildir ve bir sağlık uzmanına danışmanın yerini tutmaz.",
  }),
};
