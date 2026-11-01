import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoHe: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const g = GRAMATICA.he;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  return {
    h1: "מחשבון שולי רווח",
    title: tituloQueEntre(`מחשבון שולי רווח ${g.en(ctx.nombrePais)}`, "מחשבון שולי רווח ותוספת רווח", "מחשבון שולי רווח"),
    description: "חשבו שולי רווח ותוספת רווח על העלות לפי עלות ומחיר, או את מחיר המכירה שצריך כדי להגיע לשולי הרווח שאתם רוצים.",
    intro: [
      "שולי רווח ותוספת רווח על העלות מתבלבלים כל הזמן, וההבדל יכול לעלות כסף. שניהם מודדים את אותו רווח, אבל ביחס לבסיס אחר.",
      "הזינו עלות ומחיר ונראה לכם את שניהם. או בחרו שולי רווח ונגיד לכם כמה לגבות.",
    ],
    comoSeCalcula: [
      "רווח = מחיר פחות עלות.",
      "שולי רווח = רווח ÷ מחיר × 100.",
      "תוספת רווח על העלות = רווח ÷ עלות × 100.",
      "מחיר לשולי רווח רצויים = עלות ÷ (1 פחות שולי הרווח ÷ 100).",
    ],
    ejemplo: [
      `מוצר שעולה ${m(costo)} ונמכר ב-${m(precio)} מרוויח ${m(precio - costo)}: שולי רווח של ${p(((precio - costo) / precio) * 100)} ותוספת רווח של ${p(((precio - costo) / costo) * 100)} על העלות.`,
      `כדי להגיע לשולי רווח של 50% על אותה עלות צריך למכור ב-${m(precioConMargen(costo, 50))}. תוספת של 50% על העלות נותנת רק ${p(100 / 3)} שולי רווח.`,
    ],
    faq: [
      {
        pregunta: "מה ההבדל בין שולי רווח לתוספת רווח על העלות?",
        respuesta: "שולי רווח הם הרווח ביחס למחיר המכירה. תוספת רווח היא הרווח ביחס לעלות. על אותו רווח, תוספת הרווח היא תמיד המספר הגדול יותר.",
      },
      {
        pregunta: "איך קובעים מחיר לשולי רווח רצויים?",
        respuesta: `מחלקים את העלות ב-(1 פחות שולי הרווח). לשולי רווח של 30%, מחלקים את העלות ב-${formatearNumero(ctx, 0.7, 2)}. לא מוסיפים 30% לעלות: כך מרוויחים פחות ממה שחושבים.`,
      },
      {
        pregunta: "האם העלות צריכה לכלול מע\"מ?",
        respuesta: "השתמשו בעלות ובמחיר בלי מסים שמועברים ללקוח, כמו מע\"מ. אחרת שולי הרווח ייראו גדולים ממה שהם באמת.",
      },
    ],
    glosario: [
      { termino: "שולי רווח", definicion: "הרווח באחוזים ממחיר המכירה." },
      { termino: "תוספת רווח (Markup)", definicion: "הרווח באחוזים מהעלות." },
    ],
  };
};
