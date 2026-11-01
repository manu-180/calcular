import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoHe: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const en = GRAMATICA.he.en(ctx.nombrePais);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 65, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 65, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  return {
    h1: "מחשבון חיסכון לפרישה",
    title: tituloQueEntre(`מחשבון חיסכון לפרישה ${en}`, "מחשבון חיסכון לפרישה"),
    description: "ראו כמה תוכלו לצבור לפרישה עם הפקדה חודשית ואיזו הכנסה חודשית החיסכון ייתן לכם, בכסף של היום.",
    intro: [
      "הקצבה מהמדינה ומהעבודה לא תמיד מספיקה כדי לשמור על רמת החיים. חיסכון אישי, גם קטן, עושה הבדל גדול אם מתחילים מוקדם.",
      "הזינו את הגיל שלכם, מתי תרצו לפרוש, כמה יש לכם וכמה תוכלו להוסיף בכל חודש. נראה לכם את החיסכון בגיל הפרישה וכמה תוכלו למשוך ממנו בכל חודש.",
    ],
    comoSeCalcula: [
      "החיסכון גדל בכל חודש בתשואה הריאלית, כלומר התשואה פחות האינפלציה. כך התוצאה נשארת בכסף של היום.",
      "בפרישה החיסכון משולם בסכומים חודשיים שווים לאורך השנים שבחרתם. מה שנשאר ממשיך להרוויח בינתיים.",
      "קצבאות מהמדינה, מסים ודמי ניהול לא כלולים.",
    ],
    ejemplo: [
      `עם חיסכון של ${m(actual)} בגיל 30 והפקדה של ${m(aporte)} בחודש בתשואה ריאלית של 4%, מגיעים ל-${m(capital30)} בגיל 65. הסכום הזה נותן ${m(rentaMensual(capital30, 4, 25))} בחודש למשך 25 שנה.`,
      `מי שמתחיל בגיל 40 עם אותם נתונים מגיע ל-${m(capital40)}. עשר שנים עושות הבדל גדול.`,
    ],
    faq: [
      {
        pregunta: "מהי תשואה ריאלית?",
        respuesta: "זה מה שההשקעה מרוויחה אחרי האינפלציה. אם ההשקעה מרוויחה 7% והאינפלציה היא 3%, התשואה הריאלית היא בערך 4%.",
      },
      {
        pregunta: "האם זה מחליף את הפנסיה שלי?",
        respuesta: "לא. זה חיסכון אישי בנוסף לקצבה מהמדינה או לפנסיה מהעבודה. כדי להעריך את הקצבה, בדקו מול הגוף המוסמך במדינה שלכם או מול קרן הפנסיה.",
      },
      {
        pregunta: "כמה כדאי לחסוך לפרישה?",
        respuesta: "אין מספר אחד שמתאים לכולם. כלל אצבע נפוץ הוא 10% עד 15% מההכנסה. הכי חשוב להתחיל מוקדם ככל האפשר.",
      },
    ],
    glosario: [
      { termino: "תשואה ריאלית", definicion: "מה שההשקעה מרוויחה מעל האינפלציה." },
      { termino: "כסף של היום", definicion: "סכום עתידי שמוצג לפי מה שאפשר לקנות בו היום." },
    ],
  };
};
