import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoHe: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const en = GRAMATICA.he.en(ctx.nombrePais);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const quien = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "הקנייה" : "השכירות");
  return {
    h1: "מחשבון לקנות או לשכור דירה",
    title: tituloQueEntre(`לקנות או לשכור דירה ${en}: מחשבון`, "מחשבון לקנות או לשכור דירה", "לקנות או לשכור"),
    description: "השוו בין שכירות לקניית דירה לאורך מספר השנים שתבחרו. ראו איזו אפשרות משאירה לכם יותר הון, מאיזו שנה ובכמה.",
    intro: [
      "לא מספיק להשוות את החזר המשכנתא לשכר הדירה. מי שקונה משלם ריבית, תחזוקה וארנונה, אבל בסוף הדירה שלו. מי ששוכר יכול להשאיר את ההון העצמי מושקע.",
      "המחשבון מחבר את כל זה שנה אחרי שנה ומראה איזו אפשרות משאירה לכם יותר הון.",
    ],
    comoSeCalcula: [
      "קנייה: בכל חודש משלמים את המשכנתא ואת הוצאות הבעלות. ההון הוא שווי הדירה פחות מה שעוד נשאר לשלם.",
      "שכירות: ההון העצמי ועלויות הרכישה נשארים מושקעים בתשואה החלופית, ושכר הדירה עולה בכל שנה.",
      "בכל חודש, מי שמוציא פחות משקיע את ההפרש, כך ששתי האפשרויות יוצאות מאותו תקציב.",
      "האפשרות העדיפה היא זו שמשאירה יותר הון בסוף התקופה.",
    ],
    ejemplo: [
      `דירה של ${m(precio)} עם הון עצמי של 20% ומשכנתא בריבית של 7% ל-25 שנה, מול שכר דירה של ${m(alquiler)} בחודש.`,
      `לאורך 10 שנים ${quien(a10)} משתלמת יותר ב-${m(Math.abs(a10.comprar - a10.alquilar))}. לאורך 3 שנים ${quien(a3)} משתלמת יותר ב-${m(Math.abs(a3.comprar - a3.alquilar))}.`,
    ],
    faq: [
      {
        pregunta: "האם שכירות היא זריקת כסף?",
        respuesta:
          "לא בדיוק. גם מי שקונה משלם הוצאות שלא חוזרות: ריבית, ארנונה ותחזוקה. מה שחשוב הוא כמה הון יש לכם בסוף בכל מקרה.",
      },
      {
        pregunta: "למה התשובה משתנה לפי מספר השנים?",
        respuesta:
          "לקנייה יש עלויות גבוהות בהתחלה (עלויות רכישה וריבית של השנים הראשונות) שלוקח זמן להחזיר. אם אתם מתכננים לעבור דירה בקרוב, שכירות בדרך כלל משתלמת יותר.",
      },
      {
        pregunta: "איזה נתון משפיע הכי הרבה?",
        respuesta:
          "היחס בין המחיר לשכר הדירה, ריבית המשכנתא וקצב עליית מחירי הדירות. נסו לשנות את עליית המחיר ואת התשואה החלופית ותראו כמה התשובה זזה.",
      },
    ],
    glosario: [
      { termino: "הון", definicion: "מה שיש לכם פחות מה שאתם חייבים." },
      { termino: "עליית ערך", definicion: "בכמה שווי הדירה עולה בכל שנה." },
      { termino: "עלות אלטרנטיבית", definicion: "מה ההון העצמי היה מרוויח אם הייתם משקיעים אותו." },
    ],
  };
};
