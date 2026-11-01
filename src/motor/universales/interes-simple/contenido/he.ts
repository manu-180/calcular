import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHe: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const en = GRAMATICA.he.en(ctx.nombrePais);
  const capital = montoEjemplo(ctx, 1000);
  return {
    h1: "מחשבון ריבית פשוטה",
    title: tituloQueEntre(`מחשבון ריבית פשוטה ${en}`, "מחשבון ריבית פשוטה"),
    description: "חשבו ריבית פשוטה על קרן בריבית שנתית לתקופה של ימים, חודשים או שנים. בחרו שנה של 365 או 360 ימים וראו את הסכום הכולל.",
    intro: [
      "ריבית פשוטה מחושבת תמיד על הקרן המקורית: הריבית לא מתווספת ליתרה במהלך התקופה.",
      "משתמשים בה בפיקדונות קצרים, בהלוואות בין אנשים ובהרבה תרגילים בבית הספר.",
    ],
    comoSeCalcula: [
      "ריבית = קרן × ריבית שנתית × תקופה בשנים.",
      "לתקופה בחודשים מחלקים ב-12. לתקופה בימים מחלקים ב-365 או ב-360, לפי השנה שהבנק משתמש בה.",
      "סכום כולל = קרן + ריבית.",
    ],
    ejemplo: [
      `${m(capital)} בריבית של 10% לשנה למשך 6 חודשים צוברים ${m(capital * 0.1 * 0.5)} ריבית.`,
      `אותה קרן למשך 90 ימים צוברת ${m((capital * 0.1 * 90) / 365)} בשנה של 365 ימים ו-${m((capital * 0.1 * 90) / 360)} בשנה של 360 ימים.`,
    ],
    faq: [
      {
        pregunta: "מהי הנוסחה של ריבית פשוטה?",
        respuesta: `I = P × r × t. P היא הקרן, r הריבית השנתית כשבר עשרוני (10% הם ${formatearNumero(ctx, 0.1, 2)}) ו-t התקופה בשנים.`,
      },
      {
        pregunta: "במה היא שונה מריבית דריבית?",
        respuesta: "ריבית פשוטה מחושבת תמיד על אותה קרן. בריבית דריבית הריבית מתווספת ליתרה וצוברת גם היא ריבית.",
      },
      {
        pregunta: "למה יש בנקים שמחשבים שנה של 360 ימים?",
        respuesta: "זו מוסכמה בנקאית שמפשטת את החישוב. עם 360 ימים הריבית יוצאת קצת גבוהה יותר. בדקו באיזו שיטה הבנק שלכם משתמש.",
      },
    ],
    glosario: [
      { termino: "קרן", definicion: "הכסף שמלווים או משקיעים." },
      { termino: "שנה בנקאית", definicion: "שנה שנספרת כ-360 ימים, עם חודשים של 30 ימים." },
    ],
  };
};
