import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoHe: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "רגל" : "מטר";
  const us = imperial ? "רגל רבוע" : 'מ"ר';
  const enL = imperial ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  return {
    h1: imperial ? "מחשבון רגל רבוע" : "מחשבון מטר רבוע",
    title: imperial
      ? tituloQueEntre("מחשבון רגל רבוע: חישוב שטח של חדר", "מחשבון רגל רבוע")
      : tituloQueEntre('מחשבון מטר רבוע: חישוב שטח של חדר או דירה', 'מחשבון מ"ר: חישוב שטח', "מחשבון מטר רבוע"),
    description: "חשבו את השטח של חדר, רצפה או מגרש: מלבנים, משולשים ועיגולים, ועד חמש צורות יחד.",
    intro: [
      "בחרו צורה והזינו את המידות שלה. אם החלל הוא לא מלבן פשוט, חלקו אותו לחלקים והמחשבון יחבר אותם.",
      imperial ? 'התוצאה מוצגת גם במ"ר.' : "התוצאה מוצגת גם ברגל רבוע.",
    ],
    comoSeCalcula: [
      "מלבן: אורך × רוחב.",
      "משולש: בסיס × גובה ÷ 2.",
      `עיגול: π × רדיוס × רדיוס, כשהרדיוס הוא חצי מהקוטר. מ"ר אחד הוא ${n(FT2_POR_M2)} רגל רבוע.`,
    ],
    ejemplo: [
      imperial
        ? `סלון בצורת L אפשר לחלק למלבן של 16 × 12 רגל ולמלבן של 10 × 6 רגל. יחד זה ${n(enL, 0)} רגל רבוע.`
        : `סלון בצורת L אפשר לחלק למלבן של 5 × 4 מטר ולמלבן של 3 × 2 מטר. יחד זה ${n(enL, 0)} מ"ר.`,
      `שולחן עגול בקוטר 2 ${u} תופס ${n(area("circulo", 2, 0))} ${us}.`,
    ],
    faq: [
      {
        pregunta: imperial ? "איך מחשבים את השטח של חדר ברגל רבוע?" : "איך מחשבים כמה מטר רבוע יש בחדר?",
        respuesta: imperial
          ? "מודדים את האורך ואת הרוחב ברגל ומכפילים. חדר של 12 × 10 רגל הוא 120 רגל רבוע."
          : 'מודדים את האורך ואת הרוחב במטרים ומכפילים. חדר של 4 × 3 מטר הוא 12 מ"ר.',
      },
      {
        pregunta: imperial ? "מה עושים אם המידות באינצ'ים?" : 'מה עושים אם המידות בס"מ?',
        respuesta: imperial
          ? "ממירים קודם: מחלקים את האינצ'ים ב-12 כדי לקבל רגל. 42 אינץ' הם 3.5 רגל."
          : `ממירים קודם: מחלקים את הסנטימטרים ב-100 כדי לקבל מטרים. 350 ס"מ הם ${n(3.5, 1)} מטר.`,
      },
      {
        pregunta: 'איך ממירים מ"ר לרגל רבוע?',
        respuesta: `מכפילים ב-${n(FT2_POR_M2)}. 20 מ"ר הם ${n(20 * FT2_POR_M2)} רגל רבוע.`,
      },
    ],
    glosario: [
      { termino: 'מטר רבוע (מ"ר)', definicion: "השטח של ריבוע שכל צלע שלו באורך מטר אחד." },
      { termino: "רגל רבוע (ft²)", definicion: "השטח של ריבוע שכל צלע שלו באורך רגל אחת." },
    ],
  };
};
