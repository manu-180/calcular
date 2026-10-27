import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "qa-ar.property-registration-fee",
  h1: "حاسبة رسوم التسجيل العقاري في قطر",
  title: "رسوم التسجيل العقاري في قطر: البيع والهبة والرهن",
  description:
    "احسب رسم تسجيل العقار لدى وزارة العدل في قطر: {{qa.property-registration-rates[sale]}} من القيمة للبيع، ورسوم الهبة والإرث والرهن.",
  intro: [
    "شراء عقار أو تلقيه هبة أو رهنه في قطر يتطلب تسجيله لدى وزارة العدل مقابل رسم.",
    "اختر المعاملة وأدخل القيمة لترى الرسم وفق الجدول المعمول به منذ {{qa.property-registration-rates#desde}}.",
  ],
  comoSeCalcula: [
    "البيع رسمه {{qa.property-registration-rates[sale]}} من قيمة العقار، ومثله الهبة لغير الأصول والفروع والزوج.",
    "الهبة للأصول أو الفروع أو الزوج رسمها {{qa.property-registration-fixed[gift-family]}}، ونقل الملكية بالإرث {{qa.property-registration-fixed[inheritance]}} لكل عقار.",
    "الرهن رسمه {{qa.property-registration-rates[mortgage]}} من قيمة الدين المضمون.",
  ],
  ejemplo: ["تسجيل بيع فيلا قيمتها 2.5 مليون ريال يكلف 6,250 ريالًا، ورهن بقيمة 1.6 مليون ريال عليها يضيف 400 ريال."],
  faq: [
    {
      pregunta: "من يُعفى من الرسم؟",
      respuesta: "الوزارات والجهات الحكومية والهيئات العامة، والهبات والوصايا والأوقاف للأغراض الخيرية، والعقارات التي تخصصها الدولة للمواطنين وفق قوانين الإسكان، وغيرها.",
    },
    {
      pregunta: "كيف تُحسب رسوم المقايضة؟",
      respuesta: "بنسبة {{qa.property-registration-rates[sale]}} من قيمة العقار الأعلى سعرًا، مناصفة بين الطرفين.",
    },
    {
      pregunta: "كم يكلف فك الرهن؟",
      respuesta: "رسم فك الرهن 100 ريال.",
    },
  ],
  glosario: [{ termino: "السجل العقاري", definicion: "سجل وزارة العدل الذي يبين مالك كل عقار والحقوق المقررة عليه." }],
});
