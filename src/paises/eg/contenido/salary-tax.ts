import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "eg.salary-tax",
  h1: "حاسبة ضريبة كسب العمل على المرتبات",
  title: "حساب ضريبة المرتبات {{anio}} في مصر بالشرائح الجديدة",
  description:
    "احسب ضريبة كسب العمل الشهرية والسنوية بشرائح القانون رقم 7 لسنة 2024، مع الإعفاء الشخصي البالغ {{eg.personal-exemption}} وأعلى نسبة {{eg.income-tax[-1].tasa}}.",
  intro: [
    "ابدأ من إجمالي مرتبك الشهري أو من دخلك السنوي بعد التأمينات، وتعرف الضريبة التي يخصمها صاحب العمل كل شهر.",
    "الحاسبة تطبق قاعدة سقوط الشرائح على الدخول الكبيرة كما وردت في المادة 8 من قانون الضريبة على الدخل.",
  ],
  comoSeCalcula: [
    "يُخصم من الدخل السنوي الإعفاء الشخصي البالغ {{eg.personal-exemption}}، ثم يُقرب الناتج إلى أقرب عشرة جنيهات أقل.",
    "حتى {{eg.income-tax[0].hasta}} لا ضريبة. من {{eg.income-tax[1].desde}} إلى {{eg.income-tax[1].hasta}} نسبة {{eg.income-tax[1].tasa}}، ثم {{eg.income-tax[2].tasa}} حتى {{eg.income-tax[2].hasta}}، ثم {{eg.income-tax[3].tasa}} حتى {{eg.income-tax[3].hasta}}.",
    "من {{eg.income-tax[4].desde}} إلى {{eg.income-tax[4].hasta}} نسبة {{eg.income-tax[4].tasa}}، ثم {{eg.income-tax[5].tasa}} حتى {{eg.income-tax[5].hasta}}، وما زاد بنسبة {{eg.income-tax[-1].tasa}}.",
    "إذا تجاوز الدخل الخاضع {{eg.income-tax-thresholds[t1]}} تسقط شريحة الإعفاء، وكلما تجاوز حدًا أعلى ({{eg.income-tax-thresholds[t2]}} ثم {{eg.income-tax-thresholds[t3]}} ثم {{eg.income-tax-thresholds[t4]}} ثم {{eg.income-tax-thresholds[t5]}}) سقطت الشريحة التالية وحُسب الجزء الأول كله بنسبة أعلى.",
  ],
  ejemplo: [
    "مرتب إجمالي 20,000 جنيه: التأمينات 1,837 جنيهًا على الحد الأقصى لأجر الاشتراك، فيبقى 18,163 جنيهًا في الشهر، أي 217,956 جنيهًا في السنة. بعد الإعفاء الشخصي والتقريب يخضع 197,950 جنيهًا، والضريبة 29,340 جنيهًا في السنة، أي 2,445 جنيهًا في الشهر.",
  ],
  faq: [
    {
      pregunta: "ما شرائح ضريبة المرتبات الحالية؟",
      respuesta: "صفر حتى {{eg.income-tax[0].hasta}}، ثم {{eg.income-tax[1].tasa}} و{{eg.income-tax[2].tasa}} و{{eg.income-tax[3].tasa}} و{{eg.income-tax[4].tasa}} و{{eg.income-tax[5].tasa}}، وأعلاها {{eg.income-tax[-1].tasa}} لما زاد على {{eg.income-tax[-1].desde}}. تسري على المرتبات منذ {{eg.income-tax#desde}}.",
    },
    {
      pregunta: "هل تُخصم التأمينات قبل حساب الضريبة؟",
      respuesta: "نعم. حصتك في التأمينات الاجتماعية تُخصم من المرتب قبل حساب الدخل الخاضع للضريبة، ثم يُخصم الإعفاء الشخصي.",
    },
    {
      pregunta: "لماذا ترتفع الضريبة فجأة عند الدخول الكبيرة؟",
      respuesta: "لأن القانون يحرم الدخول الكبيرة من الشرائح الأولى. عند تجاوز {{eg.income-tax-thresholds[t1]}} تُحسب أول شريحة بنسبة {{eg.income-tax[1].tasa}} بدل الإعفاء، وهكذا مع كل حد.",
    },
  ],
  glosario: [
    { termino: "ضريبة كسب العمل", definicion: "الضريبة على المرتبات وما في حكمها، يحجزها صاحب العمل ويوردها لمصلحة الضرائب." },
    { termino: "الإعفاء الشخصي", definicion: "مبلغ سنوي يُخصم من الدخل قبل تطبيق الشرائح." },
    { termino: "النسبة الفعلية", definicion: "الضريبة السنوية مقسومة على دخلك السنوي بعد التأمينات." },
  ],
});
