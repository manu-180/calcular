import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "litr" : "gallon");

export const textosUz: TextosUi<UiPintura> = {
  slug: "boyoq-kalkulyatori",
  ui: () => ({
    modo: "Qaysi oʻlchamlar maʼlum?",
    modoMedidas: "Devor uzunligi va balandligi",
    modoSuperficie: "Umumiy maydon",
    largo: (u) => `Devorlarning umumiy uzunligi (${u})`,
    largoAyuda: "Boʻyaladigan barcha devorlar uzunligi yigʻindisi. Xona uchun bu uning perimetri.",
    alto: (u) => `Devor balandligi (${u})`,
    superficie: (u) => `Boʻyaladigan maydon (${u})`,
    aberturas: (u) => `Hisobga olinmaydigan eshik va derazalar (${u})`,
    aberturasAyuda: "Bitta eshik taxminan 2 m² (21 ft²), oddiy deraza 1 yoki 2 m² keladi.",
    manos: "Qatlamlar soni",
    rendimiento: (u) => `Boʻyoq sarfi meʼyori (${u})`,
    rendimientoAyuda: "U bankada yozilgan: bir qatlamda qancha maydonni qoplashi. Bilmasangiz, taklif qilingan qiymatni qoldiring.",
    recomendado: (u) => `Sotib olinadigan boʻyoq (${volumen(u)})`,
    recomendadoAyuda: "Tuzatishlar va valikda qoladigan boʻyoq uchun 10% zaxira qoʻshilgan.",
    necesario: (u) => `Aniq miqdor (${volumen(u)})`,
    neta: (u) => `Boʻyaladigan maydon (${u})`,
    errorMedidas: "Devor uzunligi va balandligini kiriting.",
    errorSuperficie: "Boʻyaladigan maydonni kiriting.",
    errorAberturas: "Eshik va derazalar butun devorni egallay olmaydi.",
    errorRendimiento: "Sarf meʼyori noldan katta boʻlishi kerak.",
  }),
};
