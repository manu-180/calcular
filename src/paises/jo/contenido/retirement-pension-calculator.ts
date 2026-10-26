import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jo.retirement-pension-calculator",
  h1: "حاسبة راتب تقاعد الشيخوخة من الضمان الاجتماعي",
  title: "حساب راتب التقاعد من الضمان الاجتماعي في الأردن",
  description:
    "قدّر راتب تقاعد الشيخوخة من الضمان: {{jo.pension-accrual[first-tier]}} عن كل سنة اشتراك لأول {{jo.pension-tier}} من متوسط أجرك، مع زيادة المعالين.",
  intro: [
    "راتب تقاعد الشيخوخة يُصرف لمن بلغ سن التقاعد وأكمل عدد الاشتراكات المطلوب في الضمان الاجتماعي.",
    "أدخل عمرك وعدد اشتراكاتك ومتوسط أجرك في آخر ثلاث سنوات، فيظهر لك تقدير لراتبك الشهري.",
  ],
  comoSeCalcula: [
    "الشرط سن {{jo.pension-age[male]}} للذكر و{{jo.pension-age[female]}} للأنثى، مع {{jo.pension-contributions[total]}} اشتراكًا منها {{jo.pension-contributions[actual]}} اشتراكًا فعليًا على الأقل.",
    "عن كل سنة اشتراك يُحسب {{jo.pension-accrual[first-tier]}} من أول {{jo.pension-tier}} من متوسط الأجر الشهري في آخر 36 اشتراكًا، و{{jo.pension-accrual[rest]}} من الباقي.",
    "يُزاد الراتب {{jo.pension-dependents[first]}} عن أول معال (بين {{jo.pension-dependents-limits[first-min]}} و{{jo.pension-dependents-limits[first-max]}})، و{{jo.pension-dependents[second]}} عن كل من الثاني والثالث (بين {{jo.pension-dependents-limits[other-min]}} و{{jo.pension-dependents-limits[other-max]}}).",
  ],
  ejemplo: ["رجل في الستين له 300 اشتراك (25 سنة) ومتوسط أجره 1,000 دينار ويعيل زوجته: راتبه 625 دينارًا، ومعه زيادة 75 دينارًا، أي 700 دينار في الشهر."],
  faq: [
    {
      pregunta: "متى يحق لي راتب تقاعد الشيخوخة في الأردن؟",
      respuesta: "عند إكمال سن {{jo.pension-age[male]}} للذكر أو {{jo.pension-age[female]}} للأنثى، مع {{jo.pension-contributions[total]}} اشتراكًا على الأقل منها {{jo.pension-contributions[actual]}} اشتراكًا فعليًا.",
    },
    {
      pregunta: "كيف يُحسب متوسط الأجر؟",
      respuesta: "هو متوسط الأجر الشهري الذي سُدد عليه اشتراكك في آخر 36 اشتراكًا. والقانون يحد من الزيادة في هذا المتوسط مقارنةً بأجرك في بداية آخر 48 اشتراكًا، فقد يختلف الرقم الرسمي قليلًا.",
    },
    {
      pregunta: "هل يمكن الاستمرار في العمل بعد سن التقاعد؟",
      respuesta: "نعم. يجوز الاستمرار في الشمول حتى إكمال المدة الموجبة للراتب، ويجوز خلال ستة أشهر من بلوغ السن طلب الاستمرار حتى 65 للذكر و60 للأنثى لزيادة الراتب.",
    },
  ],
  glosario: [
    { termino: "الاشتراك", definicion: "شهر سُدد عنه اشتراك الضمان الاجتماعي." },
    { termino: "الاشتراك الفعلي", definicion: "اشتراك عن مدة عمل فعلية مشمولة بالضمان." },
    { termino: "المعال", definicion: "شخص يتولى المؤمن عليه الإنفاق عليه وفق شروط يحددها نظام المؤسسة." },
  ],
});
