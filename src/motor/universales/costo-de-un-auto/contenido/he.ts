import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoHe: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const g = GRAMATICA.he;
  const imperial = ctx.unidades === "imperial";
  const gastos: GastosAuto = {
    precio: montoEjemplo(ctx, 25000),
    depreciacion: 15,
    seguro: montoEjemplo(ctx, 100),
    distancia: 1000,
    consumo: imperial ? 28 : 8,
    precioCombustible: montoEjemplo(ctx, imperial ? 3.5 : 1.2),
    mantenimiento: montoEjemplo(ctx, 60),
    estacionamiento: 0,
    otros: 0,
  };
  const mensual = costoMensual(gastos, imperial);
  const unidad = imperial ? "מייל" : "קילומטר";
  return {
    h1: "מחשבון עלות אחזקת רכב",
    title: tituloQueEntre(`מחשבון עלות אחזקת רכב ${g.en(ctx.nombrePais)}`, `עלות אחזקת רכב ${g.en(ctx.nombrePais)}`, "מחשבון עלות אחזקת רכב"),
    description: `חשבו כמה הרכב באמת עולה לכם בחודש, בשנה ולכל ${unidad}: דלק, ביטוח, טיפולים, חניה והערך שהוא מאבד.`,
    intro: [
      "רוב האנשים יודעים כמה הם מוציאים על דלק. מעטים מחברים גם ביטוח, טיפולים, חניה ובעיקר את הערך שהרכב מאבד בכל שנה.",
      "מלאו את ההוצאות ונראה לכם כמה הרכב באמת עולה. זה עוזר להחליט אם לקנות, להחליף רכב או להתנייד בדרך אחרת.",
    ],
    comoSeCalcula: [
      imperial
        ? "דלק בחודש = מיילים בחודש ÷ מיילים לגלון × מחיר גלון."
        : "דלק בחודש = קילומטרים בחודש × ליטרים ל-100 ק\"מ ÷ 100 × מחיר ליטר.",
      "ירידת ערך בחודש = שווי הרכב × ירידת הערך השנתית ÷ 12.",
      "עלות אמיתית = דלק + ביטוח + טיפולים + חניה + הוצאות אחרות + ירידת ערך.",
      `עלות לכל ${unidad} = העלות האמיתית בחודש ÷ המרחק שנסעתם באותו חודש.`,
    ],
    ejemplo: [
      `רכב ששווה ${m(gastos.precio)} ונוסע ${formatearNumero(ctx, gastos.distancia)} ${imperial ? "מייל" : "ק\"מ"} בחודש עולה ${m(mensual)} בחודש, כולל הערך שהוא מאבד.`,
      `זה ${m(mensual * 12)} בשנה ו-${formatearMonto(ctx, mensual / gastos.distancia)} לכל ${unidad}.`,
    ],
    faq: [
      {
        pregunta: "מה זה ירידת ערך של רכב?",
        respuesta: "זה הערך שהרכב מאבד עם הזמן והשימוש. לא משלמים אותה כל חודש, אבל מרגישים אותה במכירה. ברכב חדש זו לרוב ההוצאה הגדולה ביותר.",
      },
      {
        pregunta: "למה החזר ההלוואה לא נספר?",
        respuesta: "חלק מההחזר משלם על הרכב עצמו, וזה כבר נספר בירידת הערך. אם נחבר את שניהם, הרכב ייספר פעמיים. הריבית על ההלוואה היא עלות נוספת.",
      },
      {
        pregunta: "איך מוזילים את עלות הרכב?",
        respuesta: "משווים הצעות ביטוח בכל שנה, שומרים על לחץ אוויר בצמיגים ועל טיפולים בזמן, ולא מחליפים רכב לעתים קרובות: בשנים הראשונות הוא מאבד הכי הרבה ערך.",
      },
    ],
    glosario: [
      { termino: "ירידת ערך", definicion: "הערך שהרכב מאבד עם הזמן והשימוש." },
      { termino: `עלות ל${unidad}`, definicion: `העלות הממוצעת של כל ${unidad} נסיעה, כשכל ההוצאות בפנים.` },
    ],
  };
};
