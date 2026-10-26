import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jo.early-retirement-calculator",
  h1: "حاسبة التقاعد المبكر من الضمان الاجتماعي",
  title: "حساب راتب التقاعد المبكر في الأردن ونسبة الخصم",
  description:
    "قدّر راتب التقاعد المبكر من الضمان الاجتماعي: شروط السن والاشتراكات، ونسبة الخصم حسب عمرك من الجدول الملحق بالقانون، وزيادة المعالين.",
  intro: [
    "التقاعد المبكر يتيح لمن انتهت خدمته قبل سن الشيخوخة أن يتقاضى راتبًا من الضمان، بخصم يقل كلما اقترب عمره من سن التقاعد.",
    "أدخل عمرك وعدد اشتراكاتك الفعلية ومتوسط أجرك في آخر خمس سنوات، فيظهر لك إن كانت الشروط متوافرة وتقدير راتبك بعد الخصم.",
  ],
  comoSeCalcula: [
    "الشروط العامة: سن {{jo.early-retirement[age]}} مع {{jo.early-retirement[male]}} اشتراكًا فعليًا للذكر و{{jo.early-retirement[female]}} للأنثى، أو {{jo.early-retirement[alt-contributions]}} اشتراك فعلي مع سن لا تقل عن {{jo.early-retirement[alt-age]}}.",
    "يُحسب الراتب عن كل سنة اشتراك بنسبة {{jo.pension-accrual[first-tier]}} لأول {{jo.pension-tier}} من متوسط الأجر في آخر 60 اشتراكًا، و{{jo.pension-accrual[rest]}} من الباقي.",
    "يُخصم منه حسب العمر عند الطلب: للذكر من {{jo.early-retirement-reduction[male-45]}} بين 45 و46 سنة حتى {{jo.early-retirement-reduction[male-59]}} بين 59 و60، وللأنثى من {{jo.early-retirement-reduction[female-45]}} حتى {{jo.early-retirement-reduction[female-54]}} بين 54 و55.",
    "بعد الخصم تُضاف زيادة المعالين: {{jo.pension-dependents[first]}} عن الأول، و{{jo.pension-dependents[second]}} عن كل من الثاني والثالث، ضمن حدود القانون.",
  ],
  ejemplo: ["رجل عمره 52 سنة له 300 اشتراك ومتوسط أجره 1,000 دينار ويعيل شخصًا واحدًا: راتبه قبل الخصم 625 دينارًا، يُخصم منه 9%، ثم تُضاف زيادة المعال، فيصبح نحو 637 دينارًا."],
  faq: [
    {
      pregunta: "ما شروط التقاعد المبكر في الضمان الاجتماعي؟",
      respuesta: "إكمال سن {{jo.early-retirement[age]}} مع {{jo.early-retirement[male]}} اشتراكًا فعليًا للذكر أو {{jo.early-retirement[female]}} للأنثى، أو بلوغ {{jo.early-retirement[alt-contributions]}} اشتراك فعلي مع سن لا تقل عن {{jo.early-retirement[alt-age]}}. وللمشمولين قبل 2014 شروط انتقالية.",
    },
    {
      pregunta: "كم نسبة الخصم من راتب التقاعد المبكر؟",
      respuesta: "تتحدد بالعمر عند طلب الراتب. للذكر تبدأ من {{jo.early-retirement-reduction[male-45]}} وتنزل حتى {{jo.early-retirement-reduction[male-59]}}، وللأنثى من {{jo.early-retirement-reduction[female-45]}} حتى {{jo.early-retirement-reduction[female-54]}}.",
    },
    {
      pregunta: "هل ستتغير شروط التقاعد المبكر؟",
      respuesta: "نشرت الحكومة في شباط 2026 مشروع قانون معدل يشدد شروط التقاعد المبكر على مراحل. إلى أن يُنشر في الجريدة الرسمية يبقى الحساب على القانون النافذ.",
    },
  ],
  glosario: [
    { termino: "التقاعد المبكر", definicion: "راتب يُصرف قبل سن الشيخوخة لمن استوفى شروطه، بخصم حسب العمر." },
    { termino: "نسبة الخصم", definicion: "ما يُنقص من الراتب بحسب سن المؤمن عليه، وفق الجدول رقم 5 الملحق بالقانون." },
  ],
});
