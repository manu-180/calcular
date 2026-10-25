import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHe: ContenidoUniversal = (ctx) => {
  const precio3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  const c = (n: number) => formatearCifra(ctx, n);
  const en = GRAMATICA.he.en(ctx.nombrePais);
  return {
    h1: "מחשבון כלל שלושה",
    title: tituloQueEntre(`מחשבון כלל שלושה ${en}: יחס ישר והפוך`, `מחשבון כלל שלושה ${en}`, "מחשבון כלל שלושה"),
    description: "פתרון של יחס ישר או יחס הפוך בשנייה. מזינים שלושה ערכים ומקבלים את הרביעי, עם החישוב המלא.",
    intro: [
      "כלל שלושה מתאים כששני גדלים משתנים יחד וידועים שלושה מתוך ארבעת הערכים.",
      "בחרו יחס ישר או הפוך, מלאו את A, B ו-C, והמחשבון ייתן את X.",
    ],
    comoSeCalcula: [
      "יחס ישר: X = B × C ÷ A. משתמשים בו כששני הגדלים גדלים יחד (יותר קילו, מחיר גבוה יותר).",
      "יחס הפוך: X = A × B ÷ C. משתמשים בו כשאחד גדל והשני קטן (יותר אנשים, פחות ימים).",
    ],
    ejemplo: [
      `אם 3 קילו עולים ${m(precio3)}, אז 5 קילו עולים ${m((precio3 * 5) / 3)}.`,
      `אם 4 אנשים צובעים בית ב-12 ימים, 6 אנשים יצבעו אותו ב-${c((4 * 12) / 6)} ימים.`,
    ],
    faq: [
      {
        pregunta: "איך יודעים אם היחס ישר או הפוך?",
        respuesta: "אם גודל אחד עולה כשהשני עולה, היחס ישר. אם אחד יורד כשהשני עולה, היחס הפוך.",
      },
      {
        pregunta: "איך פותרים יחס ישר בלי מחשבון?",
        respuesta: `מכפילים בהצלבה את שני הערכים הידועים שבאלכסון ומחלקים בערך שנשאר. אם 3 מתאים ל-600, אז 5 מתאים ל-600 × 5 ÷ 3 = ${formatearNumero(ctx, (600 * 5) / 3)}.`,
      },
      {
        pregunta: "אפשר להשתמש בזה לאחוזים?",
        respuesta: `כן. אם 200 הם 100%, אז 50 הם ${c((50 * 100) / 200)}%: זה יחס ישר עם A = 200, B = 100 ו-C = 50.`,
      },
    ],
    glosario: [
      { termino: "יחס ישר", definicion: "שני הגדלים עולים או יורדים יחד." },
      { termino: "יחס הפוך", definicion: "גודל אחד עולה כשהשני יורד." },
    ],
  };
};
