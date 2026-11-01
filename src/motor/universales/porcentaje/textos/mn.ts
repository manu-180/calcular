import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosMn: TextosUi<UiPorcentaje> = {
  slug: "khuviin-tootsooluur",
  ui: () => ({
    modo: "Та юу тооцоолох вэ?",
    modoParte: "Y тооны X% хэд вэ?",
    modoProporcion: "X нь Y тооны хэдэн хувь вэ?",
    modoAumento: "Y дээр X% нэмэх",
    modoRebaja: "Y тооноос X% хасах",
    x: "X тоо",
    xAyuda: "Хувийн хэмжээ. «X нь Y тооны хэдэн хувь вэ?» сонголтод энэ нь хэсгийн тоо болно.",
    y: "Y тоо",
    resultado: "Үр дүн",
    porcentaje: "Хувь",
    diferencia: "Нэмсэн эсвэл хассан дүн",
    errorYCero: "Y нь 0 байж болохгүй: тэгээс хувь тооцох боломжгүй.",
    fraseParte: (x, y, r) => `${y} тооны ${x}% нь ${r} байна.`,
    fraseProporcion: (x, y, p) => `${x} нь ${y} тооны ${p}% байна.`,
    fraseAumento: (x, y, r, d) => `${y} дээр ${x}% нэмэхэд ${r} болно: ${d} нэмэгдэнэ.`,
    fraseRebaja: (x, y, r, d) => `${y} тооноос ${x}% хасахад ${r} болно: ${d} хасагдана.`,
  }),
};
