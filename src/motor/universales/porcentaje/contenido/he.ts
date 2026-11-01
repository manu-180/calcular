import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHe: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  const c = (n: number) => formatearCifra(ctx, n);
  return {
    h1: "מחשבון אחוזים",
    title: tituloQueEntre(`מחשבון אחוזים ${GRAMATICA.he.en(ctx.nombrePais)}: אחוז ממספר, תוספת והנחה`, `מחשבון אחוזים ${GRAMATICA.he.en(ctx.nombrePais)}`, "מחשבון אחוזים"),
    description: "חישוב אחוז ממספר, כמה אחוזים מספר אחד מהווה מתוך מספר אחר, ומה התוצאה אחרי תוספת או הפחתה של אחוז.",
    intro: [
      "בחרו מה רוצים לדעת, הזינו את שני המספרים והתשובה מופיעה מיד.",
      "המחשבון מכסה את ארבעת חישובי האחוזים של היום יום: חלק, יחס, תוספת והפחתה.",
    ],
    comoSeCalcula: [
      "X% מתוך Y = X × Y ÷ 100.",
      "X כאחוז מתוך Y = X ÷ Y × 100.",
      "Y ועוד X% = Y × (1 + X ÷ 100). Y פחות X% = Y × (1 − X ÷ 100).",
    ],
    ejemplo: [
      `15% מתוך 200 הם ${c((15 * 200) / 100)}.`,
      `30 הם ${c((30 / 120) * 100)}% מתוך 120.`,
      `מחיר של ${m(precio)} שעולה ב-10% מגיע ל-${m(precio * 1.1)}.`,
    ],
    faq: [
      {
        pregunta: "איך מחשבים אחוז ממספר?",
        respuesta: `מכפילים את המספר באחוז ומחלקים ב-100. 20% מתוך 350 הם 350 × 20 ÷ 100 = ${c((350 * 20) / 100)}.`,
      },
      {
        pregunta: "איך יודעים כמה אחוזים מספר אחד מהווה מתוך מספר אחר?",
        respuesta: `מחלקים את החלק בשלם ומכפילים ב-100. מי שענה נכון על 45 שאלות מתוך 60 קיבל 45 ÷ 60 × 100 = ${c((45 / 60) * 100)}%.`,
      },
      {
        pregunta: "איך מוסיפים אחוז למחיר?",
        respuesta: `מכפילים את המחיר ב-1 ועוד האחוז כשבר עשרוני. כדי להוסיף 10%, מכפילים ב-${formatearNumero(ctx, 1.1, 2)}.`,
      },
      {
        pregunta: "אם מחיר עולה ב-10% ואחר כך יורד ב-10%, הוא חוזר למקום?",
        respuesta: `לא. 100 ועוד 10% הם ${c(110)}, ו-110 פחות 10% הם ${c(110 * 0.9)}. ההפחתה חלה על מספר גדול יותר.`,
      },
    ],
    glosario: [
      { termino: "אחוז", definicion: "חלק מתוך 100." },
      { termino: "בסיס", definicion: "המספר שממנו לוקחים את האחוז (Y במחשבון הזה)." },
    ],
  };
};
