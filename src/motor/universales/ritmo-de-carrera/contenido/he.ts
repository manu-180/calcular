import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoHe: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "מייל" : 'ק"מ';
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  return {
    h1: "מחשבון קצב ריצה",
    title: tituloQueEntre("מחשבון קצב ריצה: קצב, זמן ומרחק", "מחשבון קצב ריצה"),
    description: `חשבו את קצב הריצה ל${u}, את זמן הסיום או את המרחק, ל-5 ק"מ, 10 ק"מ, חצי מרתון או מרתון.`,
    intro: [
      "עם שניים משלושת הנתונים (מרחק, זמן וקצב) מקבלים את השלישי. אפשר לתכנן כך מרוץ או לבדוק אימון.",
      'המרחקים של 5 ק"מ, 10 ק"מ, חצי מרתון ומרתון כבר מוגדרים במחשבון.',
    ],
    comoSeCalcula: [
      `קצב = זמן ÷ מרחק, בדקות ובשניות ל${u}.`,
      "זמן = קצב × מרחק.",
      "מרחק = זמן ÷ קצב. המהירות הממוצעת היא המרחק חלקי מספר השעות.",
    ],
    ejemplo: imperial
      ? [
          `3 מייל ב-27 דקות הם קצב של 9:00 למייל, במהירות של ${formatearNumero(ctx, 20 / 3, 2)} מייל לשעה.`,
          `חצי מרתון (${formatearNumero(ctx, media, 2)} מייל) בקצב של ${ritmoTexto(ritmoMedia)} למייל מסתיים ב-${reloj(ritmoMedia * media)}.`,
        ]
      : [
          '10 ק"מ ב-50 דקות הם קצב של 5:00 לק"מ, במהירות של 12 קמ"ש.',
          `חצי מרתון (${formatearNumero(ctx, media, 1)} ק"מ) בקצב של ${ritmoTexto(ritmoMedia)} לק"מ מסתיים ב-${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `איך מחשבים קצב ריצה ל${u}?`,
        respuesta: imperial
          ? `ממירים את הזמן לדקות ומחלקים במספר המיילים. 3 מייל ב-28 דקות ו-30 שניות הם ${formatearNumero(ctx, 9.5, 1)} דקות למייל, כלומר 9:30.`
          : `ממירים את הזמן לדקות ומחלקים במספר הקילומטרים. 10 ק"מ ב-55 דקות הם ${formatearNumero(ctx, 5.5, 1)} דקות לק"מ, כלומר 5:30.`,
      },
      {
        pregunta: "מה קצב טוב למתחילים?",
        respuesta: "קצב שמאפשר לדבר תוך כדי ריצה. עם השיפור בכושר הקצב יורד מעצמו.",
      },
      {
        pregunta: "כמה ארוך מרתון?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} ק"מ (${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} מייל). חצי מרתון הוא חצי מזה.`,
      },
    ],
    glosario: [
      { termino: "קצב", definicion: 'הזמן שלוקח לעבור קילומטר אחד או מייל אחד.' },
      { termino: "מהירות ממוצעת", definicion: "המרחק שעוברים בשעה." },
    ],
  };
};
