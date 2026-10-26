import { textosArabes } from "../../comun/arabe";
import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosAr: TextosUi<UiImc> = textosArabes({
  slug: "bmi",
  ui: () => ({
    peso: (u) => `الوزن (${u})`,
    altura: (u) => `الطول (${u})`,
    pies: "الطول: بالقدم (ft)",
    pulgadas: "الطول: بالبوصة (in)",
    imc: "مؤشر كتلة الجسم",
    categoria: "التصنيف (منظمة الصحة العالمية)",
    pesoMin: (u) => `الوزن الصحي من (${u})`,
    pesoMax: (u) => `الوزن الصحي حتى (${u})`,
    rangoAyuda: "نطاق الوزن الذي يعطي مؤشر كتلة جسم صحيًا عند هذا الطول.",
    bajo: "نقص في الوزن",
    normal: "وزن صحي",
    sobrepeso: "زيادة في الوزن",
    obesidad1: "سمنة من الدرجة الأولى",
    obesidad2: "سمنة من الدرجة الثانية",
    obesidad3: "سمنة من الدرجة الثالثة",
    errorPeso: "يجب أن يكون الوزن أكبر من 0.",
    errorAltura: "يجب أن يكون الطول أكبر من 0.",
    aviso:
      "مؤشر كتلة الجسم دليل عام للبالغين، فهو لا يفرّق بين العضلات والدهون ولا يُقرأ بالطريقة نفسها أثناء الحمل أو لدى الأطفال. ولا يغني عن استشارة الطبيب أو المختص الصحي.",
  }),
});
