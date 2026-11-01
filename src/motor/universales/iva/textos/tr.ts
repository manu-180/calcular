import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosTr: TextosUi<UiIva> = {
  slug: "kdv-hesaplama",
  ui: () => ({
    operacion: "Ne yapmak istiyorsunuz?",
    agregar: "KDV hariç fiyata KDV ekle",
    quitar: "KDV dahil fiyattan KDV'yi ayır",
    monto: "Fiyat",
    montoAyuda: "KDV ekliyorsanız KDV hariç, ayırıyorsanız KDV dahil fiyatı girin.",
    otraTasa: "Farklı KDV oranı (%)",
    otraTasaAyuda: "İsteğe bağlı. Ürününüz ya da hizmetiniz indirimli bir orana tabiyse buraya girin. Boş bırakırsanız genel oran kullanılır.",
    neto: "KDV hariç fiyat (matrah)",
    impuesto: "KDV tutarı",
    total: "KDV dahil fiyat",
    tasaUsada: "Uygulanan oran",
    errorTasa: "KDV oranı geçerli değil.",
  }),
};
