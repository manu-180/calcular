import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoHe: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  const g = GRAMATICA.he;
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  return {
    h1: "מחשבון שעות עבודה",
    title: tituloQueEntre(`מחשבון שעות עבודה ושעות נוספות ${g.en(ctx.nombrePais)}`, `מחשבון שעות עבודה ${g.en(ctx.nombrePais)}`, "מחשבון שעות עבודה"),
    description: "סכמו את שעות העבודה של השבוע לפי שעת כניסה, שעת יציאה והפסקות, וחשבו את השכר כולל שעות נוספות.",
    intro: [
      "בחרו שעת כניסה ושעת יציאה לכל יום, את ההפסקה שלא משולמת ואת השכר השעתי. נראה לכם את סך השעות, את השעות הנוספות ואת השכר לשבוע.",
      "זה עוזר לבדוק את תלוש השכר, למלא כרטיס נוכחות או לחייב על עבודה לפי שעה.",
    ],
    comoSeCalcula: [
      "שעות ביום = שעת יציאה פחות שעת כניסה פחות הפסקה. אם שעת היציאה מוקדמת משעת הכניסה, המשמרת נגמרת למחרת.",
      "שעות נוספות = סך השעות בשבוע פחות השעות הרגילות, כשהסך עובר אותן.",
      "שכר = שעות רגילות × שכר שעתי + שעות נוספות × שכר שעתי × (1 + התוספת).",
    ],
    ejemplo: [
      `מ-${hora("09:00")} עד ${hora("17:30")} עם הפסקה של 30 דקות יוצא ${n(jornada)} שעות ביום. מיום שני עד יום שישי, ${n(jornada * 5)} שעות: בשכר של ${m(pago)} לשעה, ${m(jornada * 5 * pago)}.`,
      `מ-${hora("08:00")} עד ${hora("18:00")} עם הפסקה של שעה יוצא ${n(larga * 5)} שעות בשבוע, ומהן ${n(extra)} שעות נוספות. בתעריף של 150%, השכר הוא ${m(40 * pago + extra * pago * 1.5)}.`,
    ],
    faq: [
      {
        pregunta: "איך מחשבים שעות עבודה?",
        respuesta: "מחסירים את שעת הכניסה משעת היציאה ומורידים את ההפסקה. אחר כך מחברים את כל ימי השבוע.",
      },
      {
        pregunta: "איך הופכים דקות לשעות עשרוניות?",
        respuesta: `מחלקים את הדקות ב-60. חצי שעה היא ${n(0.5, 1)}, רבע שעה היא ${n(0.25, 2)} ו-45 דקות הן ${n(0.75, 2)}. כך ש-7 שעות ו-45 דקות הן ${n(7.75, 2)} שעות.`,
      },
      {
        pregunta: "כמה שעות נוספות מותר לעבוד ואיך משלמים עליהן?",
        respuesta: "זה תלוי בחוק במקום העבודה ובחוזה שלכם. המחשבון משתמש בתוספת ובשעות הרגילות שהזנתם, בלי להחיל כלל מסוים.",
      },
    ],
    glosario: [
      { termino: "שעות נוספות", definicion: "שעות עבודה מעבר לשעות הרגילות, שמשולמות בתעריף גבוה יותר." },
      { termino: "תעריף 150%", definicion: "שכר לשעה נוספת של פעם וחצי מהשכר הרגיל, תוספת של 50%." },
    ],
  };
};
