import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "il.bituach-leumi-atzmai",
  h1: "מחשבון ביטוח לאומי לעצמאים",
  title: "מחשבון ביטוח לאומי לעצמאי {{anio}}: דמי ביטוח לאומי ובריאות",
  description:
    "חישוב דמי ביטוח לאומי ודמי ביטוח בריאות לעצמאי: {{il.bl-atzmai[bl-mufchat]}} ו-{{il.bl-atzmai[briut-mufchat]}} עד {{il.bl-tikrot[mufchat]}}, {{il.bl-atzmai[bl-male]}} ו-{{il.bl-atzmai[briut-male]}} מעל, עד {{il.bl-tikrot[merbit]}}.",
  intro: [
    "עובד עצמאי משלם לביטוח הלאומי מקדמות חודשיות של דמי ביטוח לאומי ודמי ביטוח בריאות, לפי ההכנסה מהעסק.",
    "הזינו את ההכנסה החודשית החייבת ובחרו קבוצת גיל. המחשבון מראה כמה משלמים בחודש ובשנה, ומה החלק של כל ביטוח.",
  ],
  comoSeCalcula: [
    "על החלק מההכנסה שעד {{il.bl-tikrot[mufchat]}} לחודש משלמים בשיעור מופחת: {{il.bl-atzmai[bl-mufchat]}} ביטוח לאומי ו-{{il.bl-atzmai[briut-mufchat]}} ביטוח בריאות.",
    "על החלק שמעל ועד ההכנסה המרבית של {{il.bl-tikrot[merbit]}} משלמים בשיעור רגיל: {{il.bl-atzmai[bl-male]}} ביטוח לאומי ו-{{il.bl-atzmai[briut-male]}} ביטוח בריאות.",
    "מי שהכנסתו נמוכה מ-{{il.bl-atzmai-mizarit[chodshi]}} לחודש משלם מההכנסה המזערית הזאת.",
    "מי שהגיע לגיל פרישה ולא מקבל קצבת אזרח ותיק משלם {{il.bl-atzmai[prisha-mufchat]}} ו-{{il.bl-atzmai[prisha-male]}}, כולל ביטוח בריאות.",
  ],
  ejemplo: [
    "עצמאי עם הכנסה של 15,000 ש\"ח בחודש: על 7,703 ש\"ח משלם 7.7% ועל 7,297 ש\"ח הנותרים 18%. סך הכול 1,906.59 ש\"ח בחודש, מזה 1,280.53 ש\"ח ביטוח לאומי ו-626.06 ש\"ח ביטוח בריאות.",
  ],
  faq: [
    {
      pregunta: "כמה ביטוח לאומי משלם עצמאי?",
      respuesta: "בשיעור מופחת של 7.7% בסך הכול על ההכנסה עד {{il.bl-tikrot[mufchat]}} לחודש, ובשיעור רגיל של 18% על ההכנסה שמעל, עד {{il.bl-tikrot[merbit]}}. השיעורים כוללים ביטוח לאומי וביטוח בריאות.",
    },
    {
      pregunta: "מה המינימום שעצמאי משלם לביטוח לאומי?",
      respuesta: "מי שהכנסתו נמוכה מ-{{il.bl-atzmai-mizarit[chodshi]}} לחודש משלם דמי ביטוח כאילו הכנסתו היא הסכום הזה.",
    },
    {
      pregunta: "האם יש תקרה לדמי הביטוח של עצמאי?",
      respuesta: "כן. על ההכנסה שמעל {{il.bl-tikrot[merbit]}} לחודש לא משלמים דמי ביטוח.",
    },
  ],
  glosario: [
    { termino: "מקדמות", definicion: "תשלומים חודשיים של דמי ביטוח שעצמאי משלם לפי ההכנסה המשוערת, עד שמתקבלת השומה השנתית." },
    { termino: "הכנסה מזערית", definicion: "ההכנסה הנמוכה ביותר שממנה מחושבים דמי הביטוח של עצמאי." },
  ],
});
