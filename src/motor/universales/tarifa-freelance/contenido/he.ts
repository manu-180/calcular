import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoHe: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const g = GRAMATICA.he;
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  return {
    h1: "מחשבון תעריף לשעה לפרילנסרים",
    title: tituloQueEntre(`מחשבון תעריף לשעה לפרילנסרים ${g.en(ctx.nombrePais)}`, "מחשבון תעריף לשעה לפרילנסרים", "מחשבון תעריף לפרילנסרים"),
    description: "חשבו את התעריף לשעה וליום עבודה כפרילנסרים לפי מה שתרצו להרוויח, ההוצאות, המסים, ימי החופש והשעות שאפשר לחייב.",
    intro: [
      "הטעות הנפוצה של פרילנסרים היא לקחת את המשכורת שהיו רוצים כשכירים ולחלק ב-160 שעות. כך נשארים בחוץ המסים, ההוצאות, החופשות וכל השעות שאי אפשר לחייב עליהן.",
      "המחשבון יוצא ממה שתרצו שיישאר לכם נטו, ואומר לכם כמה לגבות כדי להגיע לשם.",
    ],
    comoSeCalcula: [
      "כמה צריך לחייב = הכנסה נטו ÷ (1 פחות שיעור המס) + הוצאות העסק.",
      "ימי עבודה = 52 שבועות × ימי עבודה בשבוע פחות ימי חופש.",
      "שעות לחיוב בשנה = ימי עבודה × שעות לחיוב ביום.",
      "תעריף לשעה = כמה צריך לחייב ÷ שעות לחיוב בשנה.",
    ],
    ejemplo: [
      `כדי שיישארו לכם ${m(ingreso)} בשנה, עם ${m(gastos)} הוצאות ו-25% מס, צריך לחייב ${m(r.facturado)}.`,
      `עם 30 ימי חופש ו-25 שעות לחיוב בשבוע, אלה ${formatearNumero(ctx, Math.round(r.horas))} שעות בשנה: תעריף של ${m(r.hora)} לשעה או ${m(r.dia)} ליום.`,
    ],
    faq: [
      {
        pregunta: "כמה שעות בשבוע אפשר לחייב?",
        respuesta: "פחות ממה שעובדים. חיפוש לקוחות, מיילים, הוצאת חשבוניות ולמידה לוקחים זמן שאף אחד לא משלם עליו. 20 עד 30 שעות לחיוב מתוך 40 זה מקובל.",
      },
      {
        pregunta: "לגבות לפי שעה או לפי פרויקט?",
        respuesta: "שתי הדרכים עובדות. גם אם מתמחרים לפי פרויקט, כדאי להעריך את מספר השעות ולהכפיל בתעריף הזה כדי לא לצאת בהפסד.",
      },
      {
        pregunta: "באיזה שיעור מס להשתמש?",
        respuesta: "זה תלוי במדינה ובצורת ההתאגדות שלכם. חברו את מס ההכנסה ואת דמי הביטוח הסוציאלי. אם אינכם בטוחים, התייעצו עם רואה חשבון.",
      },
    ],
    glosario: [
      { termino: "שעות לחיוב", definicion: "שעות עבודה שגובים עליהן כסף מלקוח." },
      { termino: "הכנסה נטו", definicion: "מה שנשאר אחרי מסים והוצאות העסק." },
    ],
  };
};
