import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosHe: TextosUi<UiAhorroRetiro> = {
  slug: "retirement-savings",
  ui: () => ({
    edadActual: "הגיל שלכם היום",
    edadRetiro: "הגיל שבו תרצו לפרוש",
    actual: "כמה כבר חסכתם",
    aporte: "הפקדה חודשית",
    rendimiento: "תשואה שנתית ריאלית (%)",
    rendimientoAyuda: "מה שההשקעה מרוויחה מעל האינפלציה. בטווח הארוך, 2% עד 5% היא הנחה זהירה.",
    aniosRenta: "מספר שנות הפרישה לכיסוי",
    aniosRentaAyuda: "כמה שנים תרצו למשוך מהחיסכון הזה.",
    capital: "החיסכון בגיל הפרישה",
    renta: "הכנסה חודשית מהחיסכון",
    aportado: "סך ההפקדות",
    intereses: "סך הצמיחה",
    tabla: "הצמיחה לפי גיל",
    colEdad: "גיל",
    colAportado: "הופקד עד עכשיו",
    colSaldo: "חיסכון",
    errorEdades: "גיל הפרישה צריך להיות גבוה מהגיל שלכם היום.",
    errorSinAhorro: "הזינו את החיסכון הקיים או הפקדה חודשית.",
    observacionDineroDeHoy: "הסכומים בכסף של היום, כי התשואה הריאלית כבר מנכה את האינפלציה.",
    observacionPublica: "זה רק החיסכון האישי שלכם. הוא לא כולל קצבה ממלכתית או פנסיה שתקבלו מהמדינה או מהעבודה.",
  }),
};
