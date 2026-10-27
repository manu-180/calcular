import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "il.sachar-neto",
  h1: "מחשבון שכר נטו {{anio}}",
  title: "מחשבון שכר נטו {{anio}}: מברוטו לנטו לפי מדרגות המס",
  description:
    "חישוב שכר נטו מהברוטו: מס הכנסה עם נקודות זיכוי (נקודה שווה {{il.nekudat-zikui}}), ביטוח לאומי, מס בריאות והפרשה לפנסיה. לפי מדרגות המס של {{anio}}.",
  intro: [
    "השכר נטו הוא מה שנכנס לחשבון הבנק אחרי כל הניכויים שבתלוש: מס הכנסה, דמי ביטוח לאומי, מס בריאות וההפרשה שלכם לפנסיה.",
    "הזינו את השכר הברוטו החודשי, בחרו את נקודות הזיכוי הבסיסיות והוסיפו נקודות אם מגיעות לכם עוד (ילדים, תואר, שירות צבאי). התוצאה מראה כל ניכוי בנפרד.",
  ],
  comoSeCalcula: [
    "מס הכנסה מחושב לפי מדרגות: {{il.mas-hachnasa[0].tasa}} עד {{il.mas-hachnasa[0].hasta}}, {{il.mas-hachnasa[1].tasa}} עד {{il.mas-hachnasa[1].hasta}}, {{il.mas-hachnasa[2].tasa}} עד {{il.mas-hachnasa[2].hasta}}, {{il.mas-hachnasa[3].tasa}} עד {{il.mas-hachnasa[3].hasta}}, {{il.mas-hachnasa[4].tasa}} עד {{il.mas-hachnasa[4].hasta}} ו-{{il.mas-hachnasa[5].tasa}} מעל זה. כל שקל משלם את השיעור של המדרגה שלו.",
    "מהמס יורדות נקודות הזיכוי: כל נקודה שווה {{il.nekudat-zikui}} לחודש. תושב ישראל מקבל {{il.nekudot-bsis[toshav]}} נקודות ואישה עוד {{il.nekudot-bsis[isha]}}.",
    "על ההפרשה שלכם לפנסיה מגיע זיכוי של {{il.zikui-pensia[shiur-zikui]}}, עד {{il.zikui-pensia[achuz-mezake]}} משכר של עד {{il.zikui-pensia-tikra}} בחודש.",
    "ביטוח לאומי ומס בריאות: עד {{il.bl-tikrot[mufchat]}} בשיעור מופחת ({{il.bl-oved[mufchat]}} ו-{{il.mas-briut[mufchat]}}), ומשם ועד {{il.bl-tikrot[merbit]}} בשיעור מלא ({{il.bl-oved[male]}} ו-{{il.mas-briut[male]}}).",
    "על שכר שעובר {{il.mas-yasaf[saf-chodshi]}} ש\"ח בחודש נוסף מס של {{il.mas-yasaf[shiur]}} אחוזים על החלק שמעל הסף.",
  ],
  ejemplo: [
    "גבר עם שכר ברוטו של 15,000 ש\"ח והפרשה של 6% לפנסיה: מס הכנסה של כ-1,334 ש\"ח, ביטוח לאומי של כ-591 ש\"ח, מס בריאות של כ-626 ש\"ח ו-900 ש\"ח לפנסיה. נשארים כ-11,549 ש\"ח נטו.",
  ],
  faq: [
    {
      pregunta: "איך מחשבים שכר נטו מברוטו?",
      respuesta:
        "מורידים מהברוטו את מס ההכנסה (אחרי נקודות הזיכוי), את דמי הביטוח הלאומי, את מס הבריאות ואת ההפרשה שלכם לפנסיה. מה שנשאר הוא הנטו.",
    },
    {
      pregunta: "כמה שווה נקודת זיכוי ב-2026?",
      respuesta: "נקודת זיכוי שווה {{il.nekudat-zikui}} לחודש. רשות המסים הקפיאה את הסכומים לשנים 2025 עד 2027.",
    },
    {
      pregunta: "מה השתנה במדרגות המס ב-2026?",
      respuesta:
        "החוק שאושר במרץ 2026 הרחיב את מדרגת ה-{{il.mas-hachnasa[2].tasa}} עד {{il.mas-hachnasa[2].hasta}} בחודש ואת מדרגת ה-{{il.mas-hachnasa[3].tasa}} עד {{il.mas-hachnasa[3].hasta}}, למפרע מינואר 2026.",
    },
    {
      pregunta: "למה הנטו שלי שונה מהתוצאה?",
      respuesta:
        "בתלוש יכולים להיות רכיבים שלא נכללים כאן: קרן השתלמות, שווי רכב או טלפון, הטבת יישוב מוטב, תיאום מס או ניכויים אחרים. החישוב לשכיר במשרה אחת.",
    },
  ],
  glosario: [
    { termino: "שכר ברוטו", definicion: "השכר לפני כל הניכויים, כפי שמופיע בראש התלוש." },
    { termino: "נקודת זיכוי", definicion: "סכום קבוע שיורד מהמס שצריך לשלם. מספר הנקודות תלוי במצב האישי." },
    { termino: "שיעור מס שולי", definicion: "השיעור שמשלמים על השקל האחרון של השכר." },
  ],
});
