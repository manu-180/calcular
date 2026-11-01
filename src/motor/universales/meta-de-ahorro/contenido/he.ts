import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoHe: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const en = GRAMATICA.he.en(ctx.nombrePais);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  return {
    h1: "מחשבון יעד חיסכון",
    title: tituloQueEntre(`מחשבון יעד חיסכון ${en}`, "מחשבון יעד חיסכון"),
    description: "גלו כמה לחסוך בכל חודש כדי להגיע לסכום שאתם צריכים עד המועד שקבעתם, כולל מה שכבר יש לכם והתשואה על החיסכון.",
    intro: [
      "טיול, רכב, הון עצמי לדירה או כרית ביטחון להפתעות. ליעד עם סכום ותאריך הרבה יותר קל להגיע.",
      "הזינו כמה אתם רוצים לחסוך ובכמה חודשים. נראה לכם כמה להפריש בכל חודש ובכל שבוע.",
    ],
    comoSeCalcula: [
      "קודם מחושב בכמה החיסכון הקיים יגדל עד סוף התקופה.",
      "מה שעדיין חסר מתחלק להפקדות חודשיות שוות.",
      "אם החיסכון נושא ריבית, גם כל הפקדה מרוויחה, ולכן צריך להפקיד קצת פחות.",
    ],
    ejemplo: [
      `כדי לחסוך ${m(meta)} תוך 24 חודשים בלי ריבית, צריך להפקיד ${m(meta / 24)} בחודש.`,
      `אם כבר חסכתם ${m(actual)} והתשואה השנתית היא 5%, מספיק להפקיד ${m(aporteNecesario(meta, actual, 24, 5))} בחודש.`,
    ],
    faq: [
      {
        pregunta: "איך עומדים ביעד?",
        respuesta: "העבירו את הכסף מיד כשהמשכורת נכנסת, לפני כל הוצאה אחרת. אם אפשר, הגדירו הוראת קבע לחשבון נפרד.",
      },
      {
        pregunta: "מה עושים אם הסכום החודשי גבוה מדי?",
        respuesta: "תנו לעצמכם יותר זמן או הקטינו את היעד. אפשר גם להתחיל במה שמתאפשר ולהגדיל כשההכנסה עולה.",
      },
      {
        pregunta: "האם צריך להביא בחשבון אינפלציה?",
        respuesta: "אם היעד רחוק כמה שנים, הוסיפו לסכום את האינפלציה הצפויה. מה שעולה 100 היום עשוי לעלות הרבה יותר כשתגיעו לשם.",
      },
    ],
    glosario: [
      { termino: "הפקדה", definicion: "הכסף שמפרישים בכל חודש ליעד." },
      { termino: "תשואה", definicion: "מה שהחיסכון מרוויח בחשבון או בהשקעה." },
    ],
  };
};
