import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "jo.unemployment-benefit-calculator",
  h1: "حاسبة بدل التعطل عن العمل من الضمان",
  title: "حساب بدل التعطل عن العمل من الضمان الاجتماعي 2026",
  description:
    "احسب بدل التعطل عن العمل من الضمان الاجتماعي شهرًا بشهر: النسب من آخر أجر، ومدة الصرف، والحد الأعلى للصافي {{jo.unemployment-benefit-cap}}.",
  intro: [
    "بدل التعطل عن العمل يُصرف من الضمان الاجتماعي لمن ترك عمله وكان له عدد كافٍ من الاشتراكات، ليعينه حتى يجد عملًا جديدًا.",
    "أدخل آخر أجر خاضع للاقتطاع وعدد اشتراكاتك وعمرك، فيظهر لك صافي البدل في الشهر الأول ومجموعه عن المدة كلها.",
  ],
  comoSeCalcula: [
    "البدل نسبة من آخر أجر خاضع للاقتطاع: {{jo.unemployment-benefit[month-1]}} للشهر الأول، و{{jo.unemployment-benefit[month-2]}} للثاني، و{{jo.unemployment-benefit[month-3]}} للثالث، و{{jo.unemployment-benefit[month-4-6]}} لكل شهر بعده.",
    "مدة الصرف {{jo.unemployment-benefit-terms[short-months]}} أشهر إذا كانت اشتراكاتك أقل من {{jo.unemployment-benefit-terms[long-contributions]}}، و{{jo.unemployment-benefit-terms[long-months]}} أشهر إذا بلغتها.",
    "يُخصم من البدل اشتراك تأمين الشيخوخة والعجز والوفاة بنسبة {{jo.ssc-optional-old-age}} من الأجر نفسه، لأن مدة الصرف تُحسب مدة خدمة.",
    "لا يزيد الصافي في أي شهر على {{jo.unemployment-benefit-cap}}، وهو حد يُربط بالتضخم كل سنة.",
  ],
  ejemplo: ["عامل آخر أجره 600 دينار وله 200 اشتراك: صافي بدله 345 دينارًا في الشهر الأول، ويتناقص حتى 165 دينارًا، ومجموعه عن ستة أشهر 1,350 دينارًا."],
  faq: [
    {
      pregunta: "ما شروط استحقاق بدل التعطل عن العمل؟",
      respuesta: "ألا يقل عدد اشتراكاتك عن {{jo.unemployment-benefit-terms[contributions]}} قبل الاستحقاق، وأن يكون لك اشتراك واحد على الأقل في تأمين التعطل، وألا تكون قد بلغت {{jo.pension-age[male]}} للذكر أو {{jo.pension-age[female]}} للأنثى.",
    },
    {
      pregunta: "كم مرة يُصرف بدل التعطل؟",
      respuesta: "ثلاث مرات على الأكثر طيلة مدة الشمول بالضمان الاجتماعي.",
    },
    {
      pregunta: "متى يتوقف صرف البدل؟",
      respuesta: "إذا ثبت للمؤسسة أن المتعطل عاد إلى عمل يتقاضى عنه أجرًا أو زاول عملًا تجاريًا أو مهنيًا لحسابه.",
    },
    {
      pregunta: "هل يُجمع بدل التعطل مع بدل إجازة الأمومة؟",
      respuesta: "لا. لا يجوز الجمع بين بدل التعطل وبدل إجازة الأمومة، ويُصرف البدل الأكثر.",
    },
  ],
  glosario: [
    { termino: "بدل التعطل", definicion: "مبلغ شهري يُصرف لمن فقد عمله لمدة محددة." },
    { termino: "آخر أجر خاضع للاقتطاع", definicion: "آخر أجر شهري سُدد عليه اشتراك الضمان." },
  ],
});
