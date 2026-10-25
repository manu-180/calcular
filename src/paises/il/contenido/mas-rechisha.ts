import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "il.mas-rechisha",
  h1: "מחשבון מס רכישה",
  title: "מחשבון מס רכישה לדירה יחידה ולדירה נוספת",
  description:
    "חישוב מס רכישה על דירה יחידה (פטור עד {{il.mas-rechisha-yechida[0].hasta}}) או על דירה נוספת ({{il.mas-rechisha-nosefet[0].tasa}} מהשקל הראשון), לפי מדרגות רשות המסים.",
  intro: [
    "מס רכישה הוא מס שמשלם מי שקונה דירה. הסכום תלוי במחיר ובשאלה אם זו הדירה היחידה שלכם.",
    "הזינו את מחיר הדירה ובחרו אם היא דירה יחידה או דירה נוספת. תקבלו את המס ואת השיעור שלו מתוך המחיר.",
  ],
  comoSeCalcula: [
    "דירה יחידה: עד {{il.mas-rechisha-yechida[0].hasta}} אין מס. מעל זה {{il.mas-rechisha-yechida[1].tasa}} עד {{il.mas-rechisha-yechida[1].hasta}}, {{il.mas-rechisha-yechida[2].tasa}} עד {{il.mas-rechisha-yechida[2].hasta}}, {{il.mas-rechisha-yechida[3].tasa}} עד {{il.mas-rechisha-yechida[3].hasta}} ו-{{il.mas-rechisha-yechida[4].tasa}} מעל זה.",
    "דירה נוספת: {{il.mas-rechisha-nosefet[0].tasa}} עד {{il.mas-rechisha-nosefet[0].hasta}} ו-{{il.mas-rechisha-nosefet[1].tasa}} על החלק שמעל.",
    "כל חלק מהמחיר משלם את השיעור של המדרגה שלו, כמו במס הכנסה.",
  ],
  ejemplo: [
    "דירה יחידה במחיר 2,500,000 ש\"ח: 12,890.33 ש\"ח על החלק שבמדרגה של 3.5% ו-7,648 ש\"ח על החלק שבמדרגה של 5%. ביחד 20,538.33 ש\"ח. אותה דירה כדירה נוספת: 200,000 ש\"ח.",
  ],
  faq: [
    {
      pregunta: "כמה מס רכישה משלמים על דירה ראשונה?",
      respuesta: "על דירה יחידה אין מס על החלק שעד {{il.mas-rechisha-yechida[0].hasta}}. מעל זה המס מתחיל ב-{{il.mas-rechisha-yechida[1].tasa}} ועולה במדרגות.",
    },
    {
      pregunta: "כמה מס רכישה על דירה שנייה?",
      respuesta: "{{il.mas-rechisha-nosefet[0].tasa}} מהשקל הראשון ועד {{il.mas-rechisha-nosefet[0].hasta}}, ו-{{il.mas-rechisha-nosefet[1].tasa}} על החלק שמעל. זו הוראת שעה שהוארכה עד 31 בדצמבר 2026.",
    },
    {
      pregunta: "האם מדרגות מס הרכישה מתעדכנות?",
      respuesta: "בדרך כלל הן מתעדכנות ב-16 בינואר. הסכומים הוקפאו, והמדרגות לדירה יחידה נשארות כמו שהן עד 15 בינואר 2028.",
    },
  ],
  glosario: [
    { termino: "מס רכישה", definicion: "מס שמשלם הקונה ברכישת זכות במקרקעין, למשל דירה." },
    { termino: "דירה יחידה", definicion: "דירת מגורים שהיא הדירה היחידה של הקונה, לפי ההגדרה בחוק מיסוי מקרקעין." },
  ],
});
