import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHe: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const g = GRAMATICA.he;
  const anual = montoEjemplo(ctx, 50000);
  const hora = montoEjemplo(ctx, 20);
  return {
    h1: "מחשבון המרת שכר שעתי לחודשי ושנתי",
    title: tituloQueEntre(`מחשבון שכר שעתי לחודשי ${g.en(ctx.nombrePais)}`, "מחשבון המרת שכר שעתי לחודשי", "מחשבון שכר שעתי"),
    description: "המירו את השכר בין שעתי, יומי, שבועי, חצי חודשי, חודשי ושנתי, לפי שעות העבודה והשבועות בתשלום שלכם בפועל.",
    intro: [
      "כמה שווה המשכורת שלכם לשעה? כמה יוצאת הצעה של שכר שעתי בשנה? הזינו סכום, בחרו את התקופה ונראה לכם את כל השאר.",
      "זה עוזר להשוות הצעות עבודה, לתמחר שעות נוספות או לדעת כמה שווה הזמן שלכם.",
    ],
    comoSeCalcula: [
      "קודם הכול הופך לסכום שנתי.",
      "שכר שעתי = שנתי ÷ (שעות בשבוע × שבועות בתשלום).",
      "שכר יומי = שנתי ÷ (ימים בשבוע × שבועות בתשלום). שכר שבועי = שנתי ÷ שבועות בתשלום.",
      "שכר חודשי = שנתי ÷ 12. שכר חצי חודשי = שנתי ÷ 24.",
    ],
    ejemplo: [
      `שכר של ${m(anual)} בשנה, ב-40 שעות שבועיות, הוא ${m(anual / 2080)} לשעה ו-${m(anual / 12)} לחודש.`,
      `הצעה של ${m(hora)} לשעה במשרה מלאה מגיעה ל-${m(hora * 2080)} בשנה.`,
    ],
    faq: [
      {
        pregunta: "כמה שעות עבודה יש בשנה?",
        respuesta: `ב-40 שעות שבועיות ו-52 שבועות בתשלום, ${formatearNumero(ctx, 2080)} שעות. לכן כלל אצבע מהיר הוא להכפיל את השכר השעתי בכ-${formatearNumero(ctx, 2000)}.`,
      },
      {
        pregunta: "למה שכר שבועי כפול 4 לא נותן את השכר החודשי?",
        respuesta: `כי בחודש ממוצע יש ${formatearNumero(ctx, 52 / 12, 2)} שבועות ולא 4. כדי לעבור משבועי לחודשי, מכפילים ב-52 ומחלקים ב-12.`,
      },
      {
        pregunta: "האם זה כולל בונוסים או מסים?",
        respuesta: "לא. המחשבון ממיר את אותו סכום בין תקופות. אם יש לכם בונוסים, הוסיפו אותם בנפרד כשאתם משווים הצעות.",
      },
    ],
    glosario: [
      { termino: "שכר ברוטו", definicion: "השכר לפני מסים וניכויים." },
      { termino: "שכר חצי חודשי", definicion: "תשלום פעמיים בחודש, 24 פעמים בשנה." },
    ],
  };
};
