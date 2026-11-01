import { GRAMATICA } from "../../../i18n/gramatica";
import { DIAS_HE, pluralHe, prefijoHe } from "../../../i18n/hebreo";
import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionHe } from "../../dias-entre-fechas/textos/he";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHe: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  const en = GRAMATICA.he.en(ctx.nombrePais);
  return {
    h1: "מחשבון גיל",
    title: tituloQueEntre(`מחשבון גיל ${en}: גיל מדויק בשנים, חודשים וימים`, `מחשבון גיל ${en}`, "מחשבון גיל"),
    description: "חישוב הגיל המדויק בשנים, חודשים וימים, כמה ימים עברו מאז הלידה וכמה זמן נשאר עד יום ההולדת הבא.",
    intro: [
      "הזינו תאריך לידה ותראו את הגיל המדויק היום, גם בחודשים, בשבועות ובימים.",
      "שנו את התאריך השני כדי לדעת מה היה הגיל ביום מסוים, או מה הוא יהיה.",
    ],
    comoSeCalcula: [
      "המחשבון סופר את החודשים המלאים מהלידה ועד התאריך שנבחר. כל 12 חודשים הם שנה.",
      "הימים שנשארו אחרי החודש המלא האחרון הם הימים של הגיל.",
      "שנים מעוברות נספרות עם 366 הימים שלהן.",
    ],
    ejemplo: [
      `מי שנולד ${prefijoHe("ב", fechaLarga(ctx.locale, nac))} היה ${prefijoHe("ב", fechaLarga(ctx.locale, ref))} בגיל ${duracionHe(Math.floor(meses / 12), meses % 12, dias)}.`,
      `זה ${pluralHe(total, DIAS_HE, formatearNumero(ctx, total))}.`,
    ],
    faq: [
      {
        pregunta: "איך מחשבים גיל מדויק?",
        respuesta: "סופרים את השנים המלאות, אחר כך את החודשים המלאים מאז יום ההולדת האחרון, ואז את הימים שנשארו.",
      },
      {
        pregunta: "מה עם מי שנולד ב-29 בפברואר?",
        respuesta: "בשנים שאינן מעוברות, המחשבון הזה סופר את יום ההולדת ב-28 בפברואר. יש חוקים שסופרים אותו ב-1 במרץ.",
      },
      {
        pregunta: "בן כמה ימים אני?",
        respuesta: 'ראו את השורה "בימים". היא סופרת כל יום מהלידה ועד התאריך שנבחר, בלי היום האחרון.',
      },
    ],
    glosario: [
      { termino: "גיל", definicion: "מספר השנים המלאות מאז הלידה." },
      { termino: "שנה מעוברת", definicion: "שנה של 366 ימים עם 29 בפברואר. היא מגיעה כל ארבע שנים, חוץ מכמה שנות מאה." },
    ],
  };
};
