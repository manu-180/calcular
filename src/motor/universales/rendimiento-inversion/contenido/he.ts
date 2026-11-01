import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoHe: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const g = GRAMATICA.he;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "מחשבון תשואה על השקעה",
    title: tituloQueEntre(`מחשבון תשואה על השקעה ${g.en(ctx.nombrePais)}`, `מחשבון תשואה ROI ו-CAGR`, "מחשבון תשואה על השקעה"),
    description: "חשבו את התשואה הכוללת (ROI) ואת התשואה השנתית הממוצעת (CAGR) של השקעה לפי הסכום שהשקעתם, השווי היום ומספר השנים.",
    intro: [
      "רווח של 50% נשמע מצוין, אבל הוא לא אותו דבר אחרי שנתיים או אחרי 10 שנים. כדי להשוות בין השקעות צריך את התשואה לשנה.",
      "הזינו כמה השקעתם, כמה ההשקעה שווה היום וכמה שנים עברו. נראה לכם את התשואה הכוללת ואת התשואה השנתית המצטברת.",
    ],
    comoSeCalcula: [
      "ROI = (שווי סופי + הכנסות שהתקבלו פחות סכום ההשקעה) ÷ סכום ההשקעה × 100.",
      "CAGR = ((שווי סופי + הכנסות שהתקבלו) ÷ סכום ההשקעה) בחזקת (1 ÷ מספר השנים), פחות 1.",
      "CAGR היא הריבית השנתית המצטברת: זו שנותנת את אותה תוצאה אם היא חוזרת בכל שנה.",
    ],
    ejemplo: [
      `מי שהשקיע ${m(inicial)} וסיים עם ${m(final)} הרוויח ${m(final - inicial)}: תשואה כוללת של ${p(roi(inicial, final))}.`,
      `אם זה לקח 5 שנים, התשואה השנתית היא ${p(cagr(inicial, final, 5))}. אם זה לקח שנתיים, ${p(cagr(inicial, final, 2))}.`,
    ],
    faq: [
      {
        pregunta: "מה ההבדל בין ROI ל-CAGR?",
        respuesta: "ROI הוא הרווח הכולל ביחס לסכום שהושקע, בלי קשר לזמן. CAGR מחלק אותו לשנים, וכך אפשר להשוות השקעות באורך שונה.",
      },
      {
        pregunta: "למה התשואה השנתית היא לא פשוט התשואה הכוללת חלקי מספר השנים?",
        respuesta: `כי הרווח של כל שנה מתווסף ליתרה וגם הוא מרוויח. רווח של 50% ב-5 שנים הוא ${p(cagr(1, 1.5, 5))} בשנה בריבית דריבית, ולא 10%.`,
      },
      {
        pregunta: "איך מחשבים דיבידנדים או ריבית שקיבלתי?",
        respuesta: "אם משכתם אותם, הוסיפו אותם בשדה ההכנסות שהתקבלו. אם השקעתם אותם מחדש, הם כבר כלולים בשווי הסופי.",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "תשואה על ההשקעה: הרווח הכולל באחוזים מהסכום שהושקע." },
      { termino: "CAGR", definicion: "שיעור צמיחה שנתי מצטבר: התשואה הממוצעת לשנה, כולל ריבית דריבית." },
    ],
  };
};
