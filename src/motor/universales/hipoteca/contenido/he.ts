import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";

export const contenidoHe: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const en = GRAMATICA.he.en(ctx.nombrePais);
  const precio = montoEjemplo(ctx, 200000);
  const prestado = precio * 0.8;
  const cuota30 = cuotaFrancesa(prestado, 7, 360);
  const cuota15 = cuotaFrancesa(prestado, 7, 180);
  return {
    h1: "מחשבון משכנתא",
    title: tituloQueEntre(`מחשבון משכנתא ${en}: החזר חודשי וריבית`, `מחשבון משכנתא ${en}`, "מחשבון משכנתא"),
    description: "חשבו את ההחזר החודשי של המשכנתא לפי מחיר הדירה, ההון העצמי, הריבית והתקופה. ראו את סך הריבית ואיך היתרה יורדת בכל שנה.",
    intro: [
      "משכנתא היא החוב הגדול ביותר שרוב משקי הבית לוקחים. כדאי לראות את כל המספרים לפני הפגישה עם הבנק.",
      "הזינו את המחיר, את ההון העצמי, את הריבית ואת התקופה. אם אתם משלמים ארנונה או ביטוח יחד עם המשכנתא, הוסיפו אותם כדי לראות את ההוצאה החודשית האמיתית.",
    ],
    comoSeCalcula: [
      "סכום המשכנתא = מחיר הדירה − הון עצמי.",
      "החזר חודשי קבוע לפי לוח שפיצר, עם הריבית השנתית מחולקת ב-12 והתקופה בחודשים.",
      "בכל שנה מסכמים את הריבית והקרן ששולמו ומראים כמה נשאר לשלם.",
    ],
    ejemplo: [
      `דירה של ${m(precio)} עם הון עצמי של 20% משאירה משכנתא של ${m(prestado)}. בריבית של 7% ל-30 שנה, ההחזר החודשי הוא ${m(cuota30)}.`,
      `לאורך 30 שנה משלמים ${m(interesesTotales(prestado, 7, 360))} ריבית. ב-15 שנה ההחזר עולה ל-${m(cuota15)}, אבל הריבית יורדת ל-${m(interesesTotales(prestado, 7, 180))}.`,
    ],
    faq: [
      {
        pregunta: "כמה הון עצמי צריך?",
        respuesta:
          "זה תלוי בבנק ובמדינה. ככל שההון העצמי גדול יותר, לווים פחות, ההחזר נמוך יותר ומשלמים פחות ריבית. כדאי לשמור כסף גם לעלויות הרכישה.",
      },
      {
        pregunta: "למה היתרה כמעט לא יורדת בשנים הראשונות?",
        respuesta:
          "הריבית מחושבת על היתרה. בהתחלה היתרה גדולה, ולכן רוב ההחזר הולך לריבית. עם הזמן זה מתהפך.",
      },
      {
        pregunta: "האם תקופה קצרה יותר עדיפה?",
        respuesta:
          "אם ההחזר הגבוה יותר מתאים לכם, כן: משלמים הרבה פחות ריבית. אם לא, אפשר לקחת תקופה ארוכה ולהקדים תשלומים כשמתאפשר.",
      },
      {
        pregunta: "האם ההחזר יכול להשתנות?",
        respuesta:
          "בריבית קבועה ההחזר נשאר זהה. בריבית משתנה או במסלול צמוד הוא יכול לזוז. המחשבון מניח שהריבית נשארת קבועה לאורך כל התקופה.",
      },
    ],
    glosario: [
      { termino: "הון עצמי", definicion: "החלק מהמחיר שמשלמים מהחסכונות שלכם." },
      { termino: "קרן", definicion: "הסכום שלוויתם ועוד לא החזרתם." },
      { termino: "יתרה", definicion: "מה שעוד נשאר לשלם על המשכנתא." },
    ],
  };
};
