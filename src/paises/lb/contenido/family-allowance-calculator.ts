import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  "calculadora": "lb.family-allowance-calculator",
  "h1": "حساب التقديمات العائلية في الضمان اللبناني",
  "title": "التعويضات العائلية في لبنان {{anio}}: حتى {{lb.family-allowance[max]}}",
  "description": "التقديمات العائلية في الضمان اللبناني {{lb.family-allowance[spouse]}} عن الزوج و{{lb.family-allowance[child]}} عن كل ولد منذ {{lb.family-allowance#desde}}.",
  "intro": [
    "التقديمات العائلية في الضمان اللبناني {{lb.family-allowance[spouse]}} في الشهر عن الزوج أو الزوجة، و{{lb.family-allowance[child]}} عن كل ولد لغاية {{lb.family-allowance-children}} أولاد، بحد أقصى {{lb.family-allowance[max]}}. والأرقام سارية منذ {{lb.family-allowance#desde}}.",
    "اختر وضعك وعدد أولادك لتعرف المبلغ الشهري. الاستحقاق نفسه يتبع شروط قانون الضمان."
  ],
  "comoSeCalcula": [
    "عن الزوج أو الزوجة: {{lb.family-allowance[spouse]}}.",
    "عن كل ولد: {{lb.family-allowance[child]}}، حتى {{lb.family-allowance-children}} أولاد.",
    "الحد الأقصى للكسب الخاضع لحسومات هذا الفرع {{lb.nssf-ceiling-family}}، بحسب المذكرة 831."
  ],
  "ejemplo": [
    "أجير متزوج وله ثلاثة أولاد: 2,100,000 ليرة عن الزوجة و3,465,000 ليرة عن الأولاد، فالمجموع 5,565,000 ليرة في الشهر."
  ],
  "faq": [
    {
      "pregunta": "كم التعويض العائلي في لبنان 2026؟",
      "respuesta": "منذ {{lb.family-allowance#desde}}: {{lb.family-allowance[spouse]}} عن الشريك و{{lb.family-allowance[child]}} عن كل ولد، وفق المرسوم 2923 الذي طبقته مذكرة الضمان 831."
    },
    {
      "pregunta": "كم ولد يُحتسب؟",
      "respuesta": "{{lb.family-allowance-children}} أولاد على الأكثر، فيصل المبلغ إلى {{lb.family-allowance[max]}} في الشهر."
    },
    {
      "pregunta": "هل تخضع التعويضات للضريبة؟",
      "respuesta": "لا. المادة 47 من قانون ضريبة الدخل تستثني التعويضات العائلية المدفوعة وفق القوانين النافذة."
    }
  ],
  "glosario": [
    {
      "termino": "التقديمات العائلية",
      "definicion": "مبالغ شهرية يدفعها الضمان عن الزوج والأولاد."
    },
    {
      "termino": "الشريك",
      "definicion": "الزوج أو الزوجة في لغة المذكرة."
    }
  ]
});
