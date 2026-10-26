import { GRAMATICA } from "../../../i18n/gramatica";
import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHe: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  const en = GRAMATICA.he.en(ctx.nombrePais);
  return {
    h1: "הוספת ימים לתאריך",
    title: tituloQueEntre(`מחשבון הוספת ימים לתאריך ${en}`, `הוספת ימים לתאריך ${en}`, "מחשבון הוספת ימים לתאריך"),
    description: "הוספה או הפחתה של ימים קלנדריים או ימי עבודה מתאריך, ובאיזה יום בשבוע יוצא התאריך. שימושי למועדים ולתשלומים.",
    intro: [
      "בחרו תאריך, מספר ימים ואם להוסיף או להפחית. תראו את התאריך שמתקבל ואת היום בשבוע.",
      "בימי עבודה, המחשבון מדלג על שבת וראשון.",
    ],
    comoSeCalcula: [
      "בימים קלנדריים, המחשבון מתקדם יום אחד בלוח השנה על כל יום שמזינים.",
      "בימי עבודה, נספרים רק הימים משני עד שישי. תאריך ההתחלה עצמו לא נספר.",
      "חגים לא מנוכים, כי הם משתנים לפי מדינה ולפי שנה.",
    ],
    ejemplo: [`${f(inicio)} ועוד 90 ימים קלנדריים הם ${f(mas90)}.`, `${f(inicio)} ועוד 15 ימי עבודה הם ${f(aFecha(habil))}.`],
    faq: [
      {
        pregunta: "האם תאריך ההתחלה נספר כיום הראשון?",
        respuesta: "לא. הוספת יום אחד ליום שני נותנת יום שלישי. כך סופרים את רוב המועדים.",
      },
      {
        pregunta: "מה קורה אם מוסיפים ימי עבודה משבת?",
        respuesta: "יום העבודה הראשון הוא יום שני שאחריה. הוספת יום עבודה אחד לשבת נותנת יום שני.",
      },
      {
        pregunta: "המחשבון מתחשב בשנים מעוברות?",
        respuesta: "כן. אם התקופה עוברת דרך 29 בפברואר, הוא נספר כיום נוסף.",
      },
    ],
    glosario: [
      { termino: "ימים קלנדריים", definicion: "כל הימים בלוח השנה, בלי לדלג על אף יום." },
      { termino: "ימי עבודה", definicion: "במחשבון הזה, הימים משני עד שישי." },
    ],
  };
};
