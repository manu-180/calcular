import { GRAMATICA } from "../../../i18n/gramatica";
import { DIAS_HE, pluralHe, prefijoHe } from "../../../i18n/hebreo";
import { aDia, fechaLarga, habilesEntre } from "../../comun/fechas";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHe: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const en = GRAMATICA.he.en(ctx.nombrePais);
  return {
    h1: "מחשבון ימים בין תאריכים",
    title: tituloQueEntre(`מחשבון ימים בין תאריכים ${en}: ימים וימי עבודה`, `ימים בין תאריכים ${en}`, "מחשבון ימים בין תאריכים"),
    description: "ספירת הימים בין שני תאריכים: ימים קלנדריים, שבועות, חודשים וימי עבודה משני עד שישי.",
    intro: [
      "בחרו תאריך התחלה ותאריך סיום. תראו את הימים הקלנדריים, את אותה תקופה בשבועות ובחודשים, ואת ימי העבודה.",
      "שימושי למועדים, לתשלומים, לחופשות, להריון או לספירה לאחור.",
    ],
    comoSeCalcula: [
      "ימים קלנדריים הם כל הימים בין שני התאריכים. תאריך ההתחלה נספר ותאריך הסיום לא, אלא אם מסמנים את האפשרות.",
      "ימי עבודה הם הימים משני עד שישי באותה תקופה. חגים לא מנוכים.",
      "בשנה מעוברת נספר גם 29 בפברואר.",
    ],
    ejemplo: [
      `${prefijoHe("מ", f(desde))} עד ${f(hasta)} יש ${pluralHe(dias, DIAS_HE, formatearNumero(ctx, dias))} קלנדריים.`,
      `מתוכם, ${pluralHe(habiles, DIAS_HE, formatearNumero(ctx, habiles))} נופלים בין שני לשישי.`,
    ],
    faq: [
      {
        pregunta: "האם נספר היום הראשון או היום האחרון?",
        respuesta: 'כברירת מחדל נספר הראשון ולא האחרון, כמו כשמחסירים שני תאריכים. אם צריך את שניהם, סמנו "לכלול את תאריך הסיום".',
      },
      {
        pregunta: "האם ימי העבודה לא כוללים חגים?",
        respuesta: "לא, החגים לא מנוכים. הימים נספרים משני עד שישי. בישראל שבוע העבודה הוא בדרך כלל מראשון עד חמישי, והחגים משתנים לפי מדינה ושנה, ולכן כדאי לנכות אותם בנפרד.",
      },
      {
        pregunta: "כמה ימים יש בשנה?",
        respuesta: "365, או 366 בשנה מעוברת. לכן אותם שני תאריכים בשנים שונות יכולים להיות במרחק של מספר ימים שונה.",
      },
    ],
    glosario: [
      { termino: "ימים קלנדריים", definicion: "כל הימים בלוח השנה, כולל סופי שבוע וחגים." },
      { termino: "ימי עבודה", definicion: "במחשבון הזה, הימים משני עד שישי." },
    ],
  };
};
