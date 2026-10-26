import { GRAMATICA } from "../../../i18n/gramatica";
import { MESES_HE, pluralHe } from "../../../i18n/hebreo";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoHe: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const en = GRAMATICA.he.en(ctx.nombrePais);
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "מחשבון סילוק חוב בכרטיס אשראי",
    title: tituloQueEntre(`מחשבון חוב בכרטיס אשראי ${en}`, "מחשבון סילוק חוב בכרטיס אשראי", "מחשבון חוב בכרטיס אשראי"),
    description: "גלו כמה חודשים ייקח לסלק את החוב בכרטיס האשראי וכמה ריבית תשלמו, בתשלום קבוע או בתשלום המינימלי.",
    intro: [
      "חוב בכרטיס אשראי הוא בדרך כלל החוב היקר ביותר. תשלום של המינימום בלבד מושך אותו שנים ומוסיף עוד ועוד ריבית.",
      "הזינו את היתרה, את הריבית השנתית ואת מה שתוכלו לשלם בכל חודש. נראה לכם מתי תסיימו, כמה ריבית תשלמו ואת התוכנית חודש אחרי חודש.",
    ],
    comoSeCalcula: [
      "בכל חודש מתווספת ריבית: יתרה × ריבית שנתית ÷ 12.",
      "אחר כך מנוכה התשלום. בתשלום המינימלי, התשלום הוא אחוז מהחוב, עם סכום מינימום.",
      "כך עד שהיתרה מגיעה לאפס. אם התשלום לא גבוה מהריבית, החוב אף פעם לא יורד.",
    ],
    ejemplo: [
      `יתרה של ${m(saldo)} בריבית שנתית של 22%, עם תשלום של ${m(fijo)} בחודש, נסגרת תוך ${pluralHe(conFijo.meses, MESES_HE)} עם ${m(conFijo.intereses)} ריבית.`,
      `תשלום מינימלי של 3% בלבד לוקח ${pluralHe(conMinimo.meses, MESES_HE)}, והריבית עולה ל-${m(conMinimo.intereses)}.`,
    ],
    faq: [
      {
        pregunta: "מה קורה אם משלמים רק את המינימום?",
        respuesta:
          "המינימום קטן ככל שהיתרה קטנה, כך שמשלמים פחות בכל חודש והחוב נמשך שנים. אם אפשר, שלמו סכום קבוע גבוה יותר, גם אם רק במעט.",
      },
      {
        pregunta: "האם כדאי להעביר את החוב להלוואה?",
        respuesta: "אם הריבית על ההלוואה נמוכה בהרבה מהריבית בכרטיס, בדרך כלל זה משתלם. השוו את סך הריבית בשתי האפשרויות, כולל עמלות.",
      },
      {
        pregunta: "איזה כרטיס לסלק קודם?",
        respuesta: "שלמו את המינימום בכולם ואת השאר הפנו לכרטיס עם הריבית הגבוהה ביותר. כך תשלמו הכי מעט ריבית בסך הכול.",
      },
    ],
    glosario: [
      { termino: "תשלום מינימלי", definicion: "הסכום הנמוך ביותר שאפשר לשלם בחודש בלי ריבית פיגורים. הוא לא סוגר את החוב." },
      { termino: "ריבית שנתית", definicion: "הריבית שהכרטיס גובה על היתרה שנשארת." },
    ],
  };
};
