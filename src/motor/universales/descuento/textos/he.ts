import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosHe: TextosUi<UiDescuento> = {
  slug: "discount",
  ui: () => ({
    precio: "מחיר מקורי",
    descuento: "הנחה (%)",
    segundoDescuento: "הנחה נוספת (%)",
    segundoDescuentoAyuda: "אם יש הנחה נוספת על המחיר אחרי ההנחה הראשונה, הזינו אותה כאן.",
    ahorro: "החיסכון",
    final: "מחיר סופי",
    descuentoTotal: "הנחה כוללת",
    errorMayorA100: "הנחה לא יכולה להיות גבוהה מ-100%.",
    observacionDoble: (efectivo) => `שתי הנחות ברצף לא מצטברות בחיבור פשוט: יחד הן מורידות ${efectivo}% מהמחיר.`,
  }),
};
