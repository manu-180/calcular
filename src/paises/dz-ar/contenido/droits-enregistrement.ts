import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dz-ar.droits-enregistrement",
  h1: "حساب حقوق تسجيل العقار في الجزائر",
  title: "حقوق التسجيل في الجزائر {{anio}}: بيع العقارات",
  description:
    "احسب حقوق تسجيل بيع عقار في الجزائر: {{dz.droits-mutation[vente]}} من السعر، أو {{dz.droits-mutation[promesse]}} على الوعد بالبيع ومثلها على العقد النهائي.",
  intro: [
    "كل بيع لعقار أو لحق عقاري يمر بعقد مسجل يخضع لحق نسبي من السعر. وهذا الحق منصوص عليه في المادة 252 من قانون التسجيل.",
    "أدخل السعر ونوع العقد. وقد أنشأ قانون المالية لسنة 2026 نظامًا خاصًا بالوعد بالبيع.",
  ],
  comoSeCalcula: [
    "البيع المباشر: {{dz.droits-mutation[vente]}} من السعر.",
    "الوعد بالبيع: {{dz.droits-mutation[promesse]}} من السعر، ثم {{dz.droits-mutation[concretisation]}} على العقد الذي يجسد الوعد.",
    "إذا فُسخ الوعد قبل تنفيذه، يخضع عقد الفسخ لحق ثابت.",
  ],
  faq: [
    {
      pregunta: "هل تشمل حقوق التسجيل أتعاب الموثق؟",
      respuesta: "لا. يعطي الحساب حق التسجيل المنصوص عليه في المادة 252 فقط، ولا تدخل فيه أتعاب الموثق والمصاريف الأخرى للعقد.",
    },
    {
      pregunta: "على أي مبلغ يُحسب الحق؟",
      respuesta: "على السعر المصرح به في عقد البيع. أدخل هذا السعر في الحساب.",
    },
    {
      pregunta: "هل يكلف الوعد بالبيع أكثر من البيع المباشر؟",
      respuesta:
        "لا. المجموع واحد: {{dz.droits-mutation[promesse]}} على الوعد و{{dz.droits-mutation[concretisation]}} على العقد النهائي، أي ما يساوي حق البيع المباشر البالغ {{dz.droits-mutation[vente]}}.",
    },
  ],
  glosario: [
    { termino: "حق التسجيل", definicion: "رسم تحصله إدارة الضرائب عند تسجيل العقد." },
    { termino: "الوعد بالبيع", definicion: "عقد يلتزم فيه المالك ببيع العقار لمشتر بشروط محددة." },
  ],
});
