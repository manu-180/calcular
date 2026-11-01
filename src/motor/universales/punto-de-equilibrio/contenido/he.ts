import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoHe: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const g = GRAMATICA.he;
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "מחשבון נקודת איזון",
    title: tituloQueEntre(`מחשבון נקודת איזון לעסק ${g.en(ctx.nombrePais)}`, `מחשבון נקודת איזון ${g.en(ctx.nombrePais)}`, "מחשבון נקודת איזון"),
    description: "גלו כמה יחידות צריך למכור וכמה מחזור צריך בכל חודש כדי לכסות את ההוצאות של העסק, וכדי להגיע לרווח שהצבתם לעצמכם.",
    intro: [
      "נקודת האיזון היא היקף המכירות שבו העסק לא מרוויח ולא מפסיד. מתחתיה מפסידים, ומעליה מתחילים להרוויח.",
      "הזינו את ההוצאות הקבועות, את המחיר ואת העלות של כל יחידה. נגיד לכם כמה למכור כדי לכסות את ההוצאות וכדי להגיע ליעד.",
    ],
    comoSeCalcula: [
      "תרומה ליחידה = מחיר פחות עלות משתנה ליחידה.",
      "יחידות לנקודת האיזון = הוצאות קבועות ÷ תרומה ליחידה, מעוגל כלפי מעלה.",
      "מחזור לנקודת האיזון = הוצאות קבועות ÷ (תרומה ליחידה ÷ מחיר).",
      "לרווח רצוי מוסיפים אותו להוצאות הקבועות ומחשבים באותה דרך.",
    ],
    ejemplo: [
      `עם הוצאות קבועות של ${m(fijos)}, מחיר של ${m(precio)} ועלות משתנה של ${m(variable)}, כל מכירה משאירה ${m(precio - variable)}.`,
      `צריך למכור ${formatearNumero(ctx, base.unidades)} יחידות (${m(base.facturacion)}) כדי לכסות את ההוצאות, ו-${formatearNumero(ctx, meta.unidades)} כדי להרוויח ${m(objetivo)} בחודש.`,
    ],
    faq: [
      {
        pregunta: "מה ההבדל בין הוצאות קבועות להוצאות משתנות?",
        respuesta: "הוצאות קבועות נשארות אותו דבר גם בלי מכירות: שכירות, משכורות קבועות, חשבונות. הוצאות משתנות גדלות עם כל מכירה: מלאי, חומרים, עמלות, משלוחים.",
      },
      {
        pregunta: "איך מורידים את נקודת האיזון?",
        respuesta: "יש שלושה מנופים: להעלות את המחיר, להוריד את העלות המשתנה ליחידה או לקצץ בהוצאות הקבועות. המחיר הוא בדרך כלל מה שמשפיע הכי הרבה.",
      },
      {
        pregunta: "זה מתאים גם לעסק של שירותים?",
        respuesta: "כן. יחידה יכולה להיות שעה, פגישה או לקוח בחודש. העלות המשתנה היא כמה עולה לכם לספק כל אחת מהן.",
      },
    ],
    glosario: [
      { termino: "נקודת איזון", definicion: "היקף המכירות שבו ההכנסות שוות להוצאות." },
      { termino: "תרומה ליחידה", definicion: "מה שכל מכירה משאירה לכיסוי ההוצאות הקבועות." },
    ],
  };
};
