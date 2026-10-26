import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearCifra, formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHe: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  const c = (n: number) => formatearCifra(ctx, n);
  const efectivo = (1 - 0.7 * 0.9) * 100;
  const en = GRAMATICA.he.en(ctx.nombrePais);
  return {
    h1: "מחשבון הנחה",
    title: tituloQueEntre(`מחשבון הנחה ${en}: מחיר אחרי הנחה וחיסכון`, `מחשבון הנחה ${en}`, "מחשבון הנחה"),
    description: "חישוב המחיר אחרי הנחה וכמה חוסכים, כולל הנחות כפולות כמו 30% ועוד 10% נוספים בקופה.",
    intro: [
      "הזינו את המחיר ואת ההנחה ותראו מיד כמה משלמים וכמה חוסכים.",
      "אם במבצע יש הנחה נוספת, הוסיפו גם אותה: שתי הנחות ברצף אף פעם לא מצטברות בחיבור פשוט.",
    ],
    comoSeCalcula: [
      "מחיר אחרי הנחה = מחיר מקורי × (1 − הנחה ÷ 100).",
      "הנחה נוספת חלה על המחיר שכבר כולל את ההנחה הראשונה.",
      "החיסכון הוא המחיר המקורי פחות המחיר אחרי ההנחה.",
    ],
    ejemplo: [
      `מוצר שעולה ${m(precio)} בהנחה של 25% יעלה ${m(precio * 0.75)}.`,
      `עם 30% הנחה ועוד 10% נוספים, הוא יעלה ${m(precio * 0.7 * 0.9)}: זו הנחה כוללת של ${c(efectivo)}%, לא 40%.`,
    ],
    faq: [
      {
        pregunta: "איך מחשבים הנחה?",
        respuesta: "מכפילים את המחיר באחוז ההנחה ומחלקים ב-100. זה החיסכון. מורידים אותו מהמחיר ומקבלים כמה משלמים.",
      },
      {
        pregunta: "האם 30% ועוד 10% זה כמו 40% הנחה?",
        respuesta: `לא. ההנחה השנייה חלה על המחיר שכבר ירד, ולכן ההנחה הכוללת היא ${c(efectivo)}%.`,
      },
      {
        pregunta: "איך מוצאים את המחיר המקורי לפי המחיר אחרי ההנחה?",
        respuesta: `מחלקים את המחיר אחרי ההנחה ב-(1 − הנחה ÷ 100). בהנחה של 25%, מחלקים ב-${formatearNumero(ctx, 0.75, 2)}.`,
      },
    ],
    glosario: [
      { termino: "הנחה", definicion: "האחוז שיורד מהמחיר המקורי." },
      { termino: "הנחה כוללת", definicion: "האחוז הכולל שחוסכים כשיש יותר מהנחה אחת." },
    ],
  };
};
