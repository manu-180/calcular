import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoHe: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        return [
          `משטח של 10 × 10 רגל בעובי 4 אינץ' צריך ${n(ft3)} רגל מעוקב של בטון: ${n(ft3 / 27)} יארד מעוקב.`,
          `עם תערובת הייחוס זה בערך ${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)} ליברות מלט.`,
        ];
      })()
    : (() => {
        const volumen = 4 * 3 * 0.1;
        return [
          `משטח של 4 × 3 מטר בעובי 10 ס"מ צריך ${n(volumen, 1)} מ"ק בטון.`,
          `עם תערובת הייחוס זה בערך ${n(MEZCLA.cementoKg * volumen, 0)} ק"ג מלט, ${n(MEZCLA.arenaM3 * volumen)} מ"ק חול ו-${n(MEZCLA.piedraM3 * volumen)} מ"ק חצץ.`,
        ];
      })();
  return {
    h1: "מחשבון בטון",
    title: tituloQueEntre("מחשבון בטון: כמה בטון ומלט צריך", "מחשבון בטון"),
    description: `חשבו כמה בטון צריך ליציקת משטח, רצפה או שביל, ב${imperial ? "יארד מעוקב" : 'מ"ק'}, וכמה מלט, חול וחצץ לקנות בערך לפי תערובת כללית.`,
    intro: [
      "הזינו אורך, רוחב ועובי. תקבלו את נפח הבטון ואת כמות החומרים המשוערת להכנת התערובת.",
      "החומרים תלויים בסוג התערובת. המחשבון משתמש בתערובת כללית של 1:2:3 כנקודת ייחוס.",
    ],
    comoSeCalcula: [
      imperial ? "נפח = אורך × רוחב × עובי, כשהעובי ברגל. מחלקים רגל מעוקב ב-27 כדי לקבל יארד מעוקב." : "נפח = אורך × רוחב × עובי, כשהעובי במטרים.",
      "מתווספת תוספת ביטחון לקרקע לא אחידה ולשפיכה.",
      `לכל מ"ק: כ-${MEZCLA.cementoKg} ק"ג מלט, ${n(MEZCLA.arenaM3)} מ"ק חול, ${n(MEZCLA.piedraM3, 1)} מ"ק חצץ ו-${MEZCLA.aguaL} ליטרים מים.`,
    ],
    ejemplo,
    faq: [
      imperial
        ? {
            pregunta: "כמה רגל מעוקב יש ביארד מעוקב?",
            respuesta: "27. יארד מעוקב הוא 3 × 3 × 3 רגל. בטון מוכן נמכר בדרך כלל לפי יארד מעוקב.",
          }
        : {
            pregunta: 'איך מחשבים כמה מ"ק בטון צריך?',
            respuesta: 'מכפילים אורך × רוחב × עובי, הכול במטרים. משטח של 5 × 4 מטר בעובי 10 ס"מ הוא 2 מ"ק.',
          },
      {
        pregunta: 'כמה מלט יש במ"ק בטון?',
        respuesta: `בתערובת של 1:2:3, בערך ${MEZCLA.cementoKg} ק"ג. בטון חזק יותר דורש יותר מלט.`,
      },
      {
        pregunta: "כדאי להזמין בטון מוכן?",
        respuesta: "ביציקות גדולות הוא בדרך כלל אחיד ומהיר יותר. בעבודות קטנות מקובל לערבב באתר עם הכמויות האלה.",
      },
    ],
    glosario: [
      { termino: "תערובת", definicion: "היחס בין מלט, חול, חצץ ומים בבטון." },
      imperial
        ? { termino: "יארד מעוקב (yd³)", definicion: "הנפח של קובייה שכל צלע שלה באורך יארד: 27 רגל מעוקב." }
        : { termino: 'מטר מעוקב (מ"ק)', definicion: "הנפח של קובייה שכל צלע שלה באורך מטר אחד." },
    ],
  };
};
