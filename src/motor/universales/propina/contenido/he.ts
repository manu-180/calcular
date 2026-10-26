import { GRAMATICA } from "../../../i18n/gramatica";
import { formatearCifra, formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoHe: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.12;
  const m = (n: number) => formatearMonto(ctx, n);
  const c = (n: number) => formatearCifra(ctx, n);
  const en = GRAMATICA.he.en(ctx.nombrePais);
  return {
    h1: "מחשבון טיפ",
    title: tituloQueEntre(`מחשבון טיפ ${en}: כמה להשאיר וכמה כל אחד משלם`, `מחשבון טיפ ${en}`, "מחשבון טיפ"),
    description: "חישוב הטיפ, סך החשבון וכמה כל אחד משלם כשמתחלקים. אפשר לעגל את החלק של כל אחד לסכום שלם.",
    intro: [
      "הזינו את החשבון, את אחוז הטיפ ואת מספר המשלמים. תראו את הטיפ, את הסכום הכולל ואת החלק של כל אחד.",
      "אם נוח לכם עם סכומים עגולים, המחשבון מעגל את החלק של כל אחד כלפי מעלה ומה שנוסף הולך לטיפ.",
    ],
    comoSeCalcula: ["טיפ = חשבון × אחוז הטיפ ÷ 100.", "סך הכול = חשבון + טיפ.", "החלק של כל אחד הוא סך הכול חלקי מספר המשלמים."],
    ejemplo: [
      `על חשבון של ${m(cuenta)} עם טיפ של 12% מוסיפים ${m(propina)}, ובסך הכול ${m(cuenta + propina)}.`,
      `אם מתחלקים בשלושה, כל אחד משלם ${m((cuenta + propina) / 3)}.`,
    ],
    faq: [
      {
        pregunta: "כמה טיפ משאירים?",
        respuesta: `זה תלוי במנהג המקומי ובמקום. בדקו מה מקובל ${en}, והאם דמי שירות כבר כלולים בחשבון.`,
      },
      {
        pregunta: "מחשבים את הטיפ לפני מע\"מ או אחריו?",
        respuesta: "רוב האנשים מחשבים את הטיפ על הסכום הסופי שבחשבון. אם אתם מעדיפים לחשב על הסכום שלפני המס, הזינו אותו במקום.",
      },
      {
        pregunta: "איך מחשבים טיפ של 15% בראש?",
        respuesta: `מחלקים את החשבון ב-10 ומקבלים 10%, ומוסיפים עוד חצי מזה. על 40, זה 4 ועוד 2, כלומר ${c(40 * 0.15)}.`,
      },
    ],
    glosario: [
      { termino: "טיפ", definicion: "סכום נוסף שמשאירים על השירות, מעבר למחיר." },
      { termino: "דמי שירות", definicion: "תוספת שהמקום כבר הוסיף לחשבון עבור השירות." },
    ],
  };
};
