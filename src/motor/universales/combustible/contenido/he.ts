import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHe: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const precio = montoEjemplo(ctx, 3.5);
        const galones = 300 / 30;
        return [
          `נסיעה של 150 מייל הלוך ושוב ברכב שעושה 30 מייל לגלון צורכת ${formatearNumero(ctx, galones)} גלונים.`,
          `במחיר של ${m(precio)} לגלון זה ${m(galones * precio)}. בחלוקה בין 2 אנשים, ${m((galones * precio) / 2)} לכל אחד.`,
        ];
      })()
    : (() => {
        const precio = montoEjemplo(ctx, 1.2);
        const litros = (600 * 8) / 100;
        return [
          `נסיעה של 300 ק"מ הלוך ושוב ברכב שצורך 8 ליטרים ל-100 ק"מ דורשת ${formatearNumero(ctx, litros)} ליטרים.`,
          `במחיר של ${m(precio)} לליטר זה ${m(litros * precio)}. בחלוקה בין 2 אנשים, ${m((litros * precio) / 2)} לכל אחד.`,
        ];
      })();
  return {
    h1: "מחשבון עלות דלק לנסיעה",
    title: tituloQueEntre("מחשבון דלק: כמה עולה הנסיעה", "מחשבון עלות דלק לנסיעה", "מחשבון דלק"),
    description: "חשבו כמה עולה נסיעה בדלק לפי המרחק, צריכת הדלק של הרכב ומחיר הדלק, וכמה משלם כל נוסע.",
    intro: [
      `הזינו את המרחק, את צריכת הדלק של הרכב ואת המחיר ל${imperial ? "גלון" : "ליטר"}. תקבלו את כמות הדלק הנדרשת ואת עלות הנסיעה.`,
      imperial ? "צריכת הדלק נכתבת במייל לגלון, כמו במדבקה של הרכב." : 'אפשר להזין את צריכת הדלק בליטרים ל-100 ק"מ או בק"מ לליטר.',
    ],
    comoSeCalcula: imperial
      ? ["גלונים = מרחק ÷ מייל לגלון.", "עלות = גלונים × מחיר לגלון. בנסיעה הלוך ושוב המרחק מוכפל."]
      : [
          'בליטרים ל-100 ק"מ: ליטרים = מרחק × צריכה ÷ 100.',
          'בק"מ לליטר: ליטרים = מרחק ÷ צריכה.',
          "עלות = ליטרים × מחיר לליטר. בנסיעה הלוך ושוב המרחק מוכפל.",
        ],
    ejemplo,
    faq: [
      {
        pregunta: imperial ? 'איך ממירים מייל לגלון לליטרים ל-100 ק"מ?' : 'איך ממירים ק"מ לליטר לליטרים ל-100 ק"מ?',
        respuesta: imperial
          ? `מחלקים את ${formatearNumero(ctx, 235.215, 1)} במספר המיילים לגלון (גלון אמריקאי). רכב שעושה 30 מייל לגלון צורך כ-${formatearNumero(ctx, 235.215 / 30, 1)} ליטרים ל-100 ק"מ.`
          : `מחלקים 100 במספר הק"מ לליטר. רכב שעושה 14 ק"מ לליטר צורך כ-${formatearNumero(ctx, 100 / 14, 1)} ליטרים ל-100 ק"מ.`,
      },
      {
        pregunta: "האם החישוב כולל כבישי אגרה?",
        respuesta: "לא. הוא כולל רק דלק. את האגרה והחניה צריך להוסיף בנפרד.",
      },
      {
        pregunta: "למה הרכב צורך יותר דלק בעיר?",
        respuesta: "עצירות והאצות דורשות יותר אנרגיה מנסיעה במהירות קבועה בכביש מהיר, ולכן הצריכה בעיר בדרך כלל גבוהה יותר.",
      },
    ],
    glosario: [
      { termino: "צריכת דלק", definicion: "המרחק שרכב עובר עם כמות נתונה של דלק." },
      { termino: 'ק"מ לליטר', definicion: "כמה קילומטרים הרכב עובר עם ליטר אחד. ככל שהמספר גבוה יותר, הרכב חסכוני יותר." },
    ],
  };
};
