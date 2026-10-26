import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosHe: TextosUi<UiMargenDeGanancia> = {
  slug: "profit-margin",
  ui: () => ({
    modo: "מה תרצו לחשב?",
    modoPrecio: "את שולי הרווח, לפי עלות ומחיר",
    modoMargen: "את המחיר לשולי רווח רצויים",
    modoMarkup: "את המחיר לתוספת רווח רצויה על העלות",
    costo: "עלות ליחידה",
    costoAyuda: "כמה עולה לקנות או לייצר יחידה אחת, בלי מע\"מ שמועבר ללקוח.",
    precio: "מחיר מכירה",
    precioAyuda: "רק אם מחשבים את שולי הרווח. בלי מע\"מ.",
    objetivo: "שולי רווח או תוספת רווח רצויים (%)",
    objetivoAyuda: "רק אם מחשבים את המחיר.",
    precioResultado: "מחיר מכירה",
    margen: "שולי רווח",
    margenAyuda: "הרווח באחוזים ממחיר המכירה.",
    markup: "תוספת רווח על העלות (Markup)",
    markupAyuda: "הרווח באחוזים מהעלות.",
    ganancia: "רווח ליחידה",
    errorCosto: "הזינו את העלות של יחידה אחת.",
    errorFaltaPrecio: "הזינו את מחיר המכירה כדי לחשב את שולי הרווח.",
    errorFaltaObjetivo: "הזינו את שולי הרווח או את תוספת הרווח שאתם מכוונים אליהם.",
    errorMargen100: "שולי רווח חייבים להיות מתחת ל-100%: אחרת כל המחיר הוא רווח, בלי שום עלות.",
    observacionPerdida: "במחיר הזה אתם מוכרים מתחת לעלות ומפסידים בכל מכירה.",
  }),
};
