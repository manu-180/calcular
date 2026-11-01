import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoHe: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const en = GRAMATICA.he.en(ctx.nombrePais);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  return {
    h1: "מחשבון ריבית דריבית",
    title: tituloQueEntre(`מחשבון ריבית דריבית ${en}`, "מחשבון ריבית דריבית"),
    description: "ראו איך הכסף שלכם גדל בריבית דריבית עם הפקדה חודשית. קבלו את היתרה הסופית, את הריבית שנצברה וטבלה שנה אחרי שנה.",
    intro: [
      "בריבית דריבית הריבית מתווספת ליתרה ומתחילה לצבור ריבית משלה. לכן החיסכון גדל מהר יותר ויותר.",
      "הזינו כמה יש לכם היום, כמה תוכלו להוסיף בכל חודש, את הריבית ואת מספר השנים. נראה לכם את היתרה הסופית וכמה ממנה היא ריבית.",
    ],
    comoSeCalcula: [
      "יתרה סופית = סכום × (1 + i) בחזקת n + הפקדה × ((1 + i) בחזקת n − 1) ÷ i.",
      "כאן i היא הריבית החודשית ששווה לתדירות הצבירה שבחרתם, ו-n הוא מספר החודשים.",
      "ההפקדות נכנסות בסוף כל חודש.",
    ],
    ejemplo: [
      `מתחילים עם ${m(capital)} ומוסיפים ${m(aporte)} בחודש בריבית של 7% לשנה: אחרי 10 שנים מגיעים ל-${m(a10)}.`,
      `אם ממשיכים עוד 10 שנים, היתרה מגיעה ל-${m(a20)}. העשור השני מרוויח הרבה יותר מהראשון.`,
    ],
    faq: [
      {
        pregunta: "מה ההבדל בין ריבית פשוטה לריבית דריבית?",
        respuesta:
          "ריבית פשוטה מחושבת תמיד על הסכום המקורי. ריבית דריבית מחושבת על הסכום ועל הריבית שכבר נצברה.",
      },
      {
        pregunta: "מה זה כלל ה-72?",
        respuesta: "דרך מהירה לדעת תוך כמה זמן הכסף מוכפל: מחלקים את 72 בריבית השנתית. בריבית של 6%, הוא מוכפל בערך תוך 12 שנים.",
      },
      {
        pregunta: "באיזו ריבית כדאי להשתמש?",
        respuesta:
          "בריבית מציאותית למה שתעשו עם הכסף. כדי לראות את התוצאה בכסף של היום, השתמשו בריבית פחות האינפלציה הצפויה.",
      },
    ],
    glosario: [
      { termino: "צבירה", definicion: "הרגע שבו הריבית מתווספת ליתרה." },
      { termino: "ריבית דריבית", definicion: "ריבית שמחושבת על היתרה ועל הריבית שכבר נצברה." },
    ],
  };
};
