import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

// La definición pasa los símbolos latinos; en árabe van los de uso corriente.
const UNIDAD: Readonly<Record<string, string>> = { "m²": "م²", "ft²": "قدم²", cm: "سم", in: "بوصة" };
const unidad = (u: string) => UNIDAD[u] ?? u;

export const textosAr: TextosUi<UiCeramicos> = {
  slug: "tile-calculator",
  ui: () => ({
    superficie: (u) => `المساحة المراد تبليطها (${unidad(u)})`,
    largo: (u) => `طول البلاطة (${unidad(u)})`,
    ancho: (u) => `عرض البلاطة (${unidad(u)})`,
    desperdicio: "نسبة الهدر (%)",
    desperdicioAyuda: "للقص والكسر. استخدم 10% للتركيب المستقيم و15% للتركيب المائل.",
    porCaja: "عدد البلاطات في الصندوق",
    porCajaAyuda: "اختياري. أدخله لتعرف عدد الصناديق التي تشتريها.",
    piezas: "عدد البلاطات اللازمة",
    cajas: "عدد الصناديق",
    conDesperdicio: (u) => `المساحة مع الهدر (${unidad(u)})`,
    cubre: (u) => `المساحة التي تغطيها الصناديق (${unidad(u)})`,
    errorSuperficie: "يجب أن تكون المساحة أكبر من 0.",
    errorPieza: "يجب أن تكون مقاسات البلاطة أكبر من 0.",
  }),
};
