import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "il.mas-hachnasa",
  h1: "מחשבון מס הכנסה 2026",
  title: "מחשבון מס הכנסה 2026 לפי מדרגות ונקודות זיכוי",
  description:
    "חישוב מס הכנסה לחודש או לשנה לפי מדרגות המס של 2026, מ-{{il.mas-hachnasa[0].tasa}} עד {{il.mas-hachnasa[-1].tasa}}, עם נקודות זיכוי ושיעור המס השולי והאפקטיבי.",
  intro: [
    "מס ההכנסה בישראל עולה במדרגות: כל חלק מההכנסה משלם את השיעור של המדרגה שלו, ולא כל ההכנסה בשיעור הגבוה.",
    "הזינו הכנסה חודשית או שנתית ובחרו את נקודות הזיכוי. תקבלו את המס לתשלום, את שיעור המס השולי ואת השיעור האפקטיבי, כלומר כמה אחוז מכל ההכנסה הולך למס.",
  ],
  comoSeCalcula: [
    "המדרגות החודשיות ל-2026: {{il.mas-hachnasa[0].tasa}} עד {{il.mas-hachnasa[0].hasta}}, {{il.mas-hachnasa[1].tasa}} עד {{il.mas-hachnasa[1].hasta}}, {{il.mas-hachnasa[2].tasa}} עד {{il.mas-hachnasa[2].hasta}}, {{il.mas-hachnasa[3].tasa}} עד {{il.mas-hachnasa[3].hasta}}, {{il.mas-hachnasa[4].tasa}} עד {{il.mas-hachnasa[4].hasta}} ו-{{il.mas-hachnasa[5].tasa}} מעל זה. המדרגות השנתיות הן פי 12.",
    "מהמס שיצא מורידים {{il.nekudat-zikui}} לכל נקודת זיכוי בחודש. המס לא יורד מתחת לאפס.",
    "על הכנסה שעוברת {{il.mas-yasaf[saf-chodshi]}} ש\"ח בחודש נוסף מס של {{il.mas-yasaf[shiur]}} אחוזים על החלק שמעל הסף.",
  ],
  ejemplo: [
    "הכנסה של 20,000 ש\"ח בחודש: 701 ש\"ח במדרגה הראשונה, 427 בשנייה, 1,788 בשלישית ו-310 ברביעית. ביחד 3,226 ש\"ח, ואחרי 2.25 נקודות זיכוי נשארים 2,681.50 ש\"ח.",
  ],
  faq: [
    {
      pregunta: "מה מדרגות מס הכנסה ב-2026?",
      respuesta:
        "לחודש: {{il.mas-hachnasa[0].tasa}} עד {{il.mas-hachnasa[0].hasta}}, {{il.mas-hachnasa[1].tasa}} עד {{il.mas-hachnasa[1].hasta}}, {{il.mas-hachnasa[2].tasa}} עד {{il.mas-hachnasa[2].hasta}}, {{il.mas-hachnasa[3].tasa}} עד {{il.mas-hachnasa[3].hasta}}, {{il.mas-hachnasa[4].tasa}} עד {{il.mas-hachnasa[4].hasta}} ו-{{il.mas-hachnasa[5].tasa}} מעל. המדרגות של {{il.mas-hachnasa[2].tasa}} ו-{{il.mas-hachnasa[3].tasa}} הורחבו בחוק שאושר במרץ 2026, למפרע מינואר.",
    },
    {
      pregunta: "מה ההבדל בין מס שולי למס אפקטיבי?",
      respuesta: "המס השולי הוא השיעור שמשלמים על השקל האחרון. המס האפקטיבי הוא סך המס חלקי סך ההכנסה, והוא תמיד נמוך יותר בגלל המדרגות הנמוכות ונקודות הזיכוי.",
    },
    {
      pregunta: "כמה נקודות זיכוי יש לי?",
      respuesta:
        "כל תושב ישראל מקבל {{il.nekudot-bsis[toshav]}} נקודות, ואישה עוד {{il.nekudot-bsis[isha]}}. ילדים, תואר אקדמי, שירות צבאי ועלייה מזכים בנקודות נוספות. את הנקודות מצהירים בטופס 101 אצל המעסיק.",
    },
  ],
  glosario: [
    { termino: "מדרגת מס", definicion: "טווח הכנסה שמשלם שיעור מס אחד." },
    { termino: "מס נוסף (מס יסף)", definicion: "מס של {{il.mas-yasaf[shiur]}} אחוזים על הכנסה חייבת שעוברת את הסף." },
  ],
});
