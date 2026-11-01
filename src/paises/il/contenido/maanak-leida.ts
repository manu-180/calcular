import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "il.maanak-leida",
  h1: "מחשבון מענק לידה",
  title: "מחשבון מענק לידה {{anio}}: כמה משלם ביטוח לאומי",
  description:
    "כמה מענק לידה תקבלו מביטוח לאומי: {{il.maanak-leida[rishon]}} לילד הראשון, {{il.maanak-leida[sheni]}} לשני ו-{{il.maanak-leida[shlishi]}} מהשלישי. לתאומים {{il.maanak-leida[teomim]}}.",
  intro: [
    "מענק לידה הוא תשלום חד-פעמי שהביטוח הלאומי משלם אחרי הלידה.",
    "הזינו כמה תינוקות נולדו ואיזה מספר ילד זה במשפחה. המחשבון מראה את סכום המענק לפי הסכומים העדכניים.",
  ],
  comoSeCalcula: [
    "בלידה של תינוק אחד הסכום נקבע לפי מספר הילדים במשפחה: {{il.maanak-leida[rishon]}} לילד הראשון, {{il.maanak-leida[sheni]}} לילד השני ו-{{il.maanak-leida[shlishi]}} לילד השלישי ואילך.",
    "בלידת תאומים המענק הוא {{il.maanak-leida[teomim]}} ובלידת שלישייה {{il.maanak-leida[shlishiya]}}, בלי קשר למספר הילדים שכבר יש במשפחה.",
    "על כל ילד נוסף בלידה מרובת עוברים מוסיפים {{il.maanak-leida[nosaf]}}.",
  ],
  ejemplo: [
    "משפחה עם ילד אחד שנולד לה ילד שני מקבלת {{il.maanak-leida[sheni]}}. אם נולדו לה תאומים, היא מקבלת {{il.maanak-leida[teomim]}}.",
  ],
  faq: [
    {
      pregunta: "כמה מענק לידה מקבלים על הילד הראשון?",
      respuesta: "{{il.maanak-leida[rishon]}}, לפי הסכומים שהביטוח הלאומי מפרסם.",
    },
    {
      pregunta: "כמה מענק לידה מקבלים על תאומים?",
      respuesta: "{{il.maanak-leida[teomim]}} על הלידה כולה. בלידת שלישייה {{il.maanak-leida[shlishiya]}}.",
    },
    {
      pregunta: "מה ההבדל בין מענק לידה לדמי לידה?",
      respuesta: "מענק לידה הוא סכום קבוע שמשולם פעם אחת לכל יולדת. דמי לידה הם תשלום במקום השכר בתקופת חופשת הלידה, ומחושבים לפי ההכנסה.",
    },
  ],
  glosario: [
    { termino: "מענק לידה", definicion: "תשלום חד-פעמי מהביטוח הלאומי אחרי לידה." },
    { termino: "לידה מרובת עוברים", definicion: "לידה של שני תינוקות או יותר באותה לידה." },
  ],
});
