import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoHe: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const g = GRAMATICA.he;
  const sueldo = montoEjemplo(ctx, 4000);
  return {
    h1: "מחשבון העלאת שכר",
    title: tituloQueEntre(`מחשבון העלאת שכר ${g.en(ctx.nombrePais)}`, "מחשבון העלאת שכר והעלאה ריאלית", "מחשבון העלאת שכר"),
    description: "חשבו את השכר החדש אחרי העלאה, את ההפרש בחודש ובשנה, ואם ההעלאה הריאלית שלכם עוקפת את האינפלציה.",
    intro: [
      "הציעו לכם העלאה, או שאתם עומדים לבקש אחת. הזינו את השכר ואת ההעלאה, באחוזים או בסכום, וראו כמה משתנה בכל חודש ובכל שנה.",
      "הוסיפו את האינפלציה בתקופה ונגיד לכם אם באמת הרווחתם כוח קנייה או רק השלמתם פער.",
    ],
    comoSeCalcula: [
      "שכר חדש = שכר נוכחי × (1 + ההעלאה ÷ 100).",
      "הפרש בשנה = הפרש בחודש × מספר המשכורות בשנה.",
      "העלאה ריאלית = (1 + ההעלאה) ÷ (1 + האינפלציה) פחות 1.",
    ],
    ejemplo: [
      `שכר של ${m(sueldo)} בחודש עם העלאה של 5% הופך ל-${m(sueldo * 1.05)}: ${m(sueldo * 0.05)} יותר בחודש ו-${m(sueldo * 0.05 * 12)} יותר בשנה.`,
      `אם האינפלציה בתקופה הייתה 3%, ההעלאה הריאלית היא ${p(aumentoReal(5, 3))}. עם אינפלציה של 6%, היא ${p(aumentoReal(5, 6))}.`,
    ],
    faq: [
      {
        pregunta: "מה זו העלאה ריאלית?",
        respuesta: "זו ההעלאה אחרי ניכוי האינפלציה. היא מראה אם השכר החדש קונה יותר או פחות מבעבר.",
      },
      {
        pregunta: "למה לא פשוט להחסיר את האינפלציה מההעלאה?",
        respuesta: `כי שני האחוזים מוכפלים זה בזה ולא מתחברים. עם העלאה של 5% ואינפלציה של 3%, ההעלאה הריאלית היא ${p(aumentoReal(5, 3))} ולא 2%. כשהאינפלציה גבוהה, הפער גדל הרבה.`,
      },
      {
        pregunta: "כמה העלאה כדאי לבקש?",
        respuesta: "לפחות את האינפלציה מאז ההעלאה הקודמת, כדי לא להישאר מאחור. מעבר לזה, כמה משלמים מעסיקים אחרים על תפקיד כמו שלכם וכמה התפקיד שלכם גדל.",
      },
    ],
    glosario: [
      { termino: "העלאה נומינלית", definicion: "ההעלאה כפי שהיא מופיעה בתלוש השכר, לפני אינפלציה." },
      { termino: "כוח קנייה", definicion: "מה שאפשר לקנות עם השכר." },
    ],
  };
};
