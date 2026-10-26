import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { aumentoDependientes, CAMPO_DEPENDIENTES, CAMPO_SEXO, pensionBase, REQUIERE_PENSION } from "../lib/pension";

export default definirCalculadora({
  id: "jo.retirement-pension-calculator",
  mercado: "jo",
  concepto: "jubilacion",
  slug: "retirement-pension-calculator",
  estado: "publicado",
  requiere: {
    ...REQUIERE_PENSION,
    "jo.pension-age": "mapa",
    "jo.pension-contributions": "mapa",
  },
  campos: [
    CAMPO_SEXO,
    { id: "edad", tipo: "entero", etiqueta: "العمر عند طلب الراتب", min: 18, max: 100, porDefecto: 60 },
    { id: "aportes", tipo: "entero", etiqueta: "عدد الاشتراكات الشهرية في الضمان", ayuda: "كل شهر اشتراك يُعد اشتراكًا واحدًا. تجده في كشف البيانات التفصيلي على موقع الضمان.", min: 0, max: 720, porDefecto: 300 },
    { id: "promedio", tipo: "moneda", etiqueta: "متوسط الأجر الشهري في آخر 36 اشتراكًا", min: 0, porDefecto: 800 },
    CAMPO_DEPENDIENTES,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.promedio <= 0) throw new ErrorEntrada("أدخل متوسط الأجر الشهري.", "promedio");
    const edadMinima = enMapa(v["jo.pension-age"], entrada.sexo);
    const minimo = enMapa(v["jo.pension-contributions"], "total");
    const faltaEdad = entrada.edad < edadMinima;
    const faltanAportes = entrada.aportes < minimo;
    const observaciones = [
      `يُشترط أيضًا أن يكون بين الاشتراكات ${enMapa(v["jo.pension-contributions"], "actual")} اشتراكًا فعليًا على الأقل. والراتب الفعلي تحسبه المؤسسة من سجلك، وقد تُضاف إليه زيادات تقررها لاحقًا.`,
    ];
    if (faltaEdad || faltanAportes) {
      const motivos: string[] = [];
      if (faltaEdad) motivos.push(`سن تقاعد الشيخوخة ${edadMinima} سنة`);
      if (faltanAportes) motivos.push(`عدد الاشتراكات المطلوب ${minimo} اشتراكًا على الأقل`);
      return {
        elegible: "لا تتوافر الشروط بعد",
        pension: null,
        base: null,
        aumento: null,
        anios: Math.round((entrada.aportes / 12) * 100) / 100,
        observaciones: [`لم تتوافر الشروط: ${motivos.join("، و")}.`, ...observaciones],
      };
    }
    const base = pensionBase(entrada.promedio, entrada.aportes, v);
    const aumento = aumentoDependientes(base, entrada.dependientes, v);
    return {
      elegible: "تتوافر شروط السن والاشتراكات",
      pension: redondear(base + aumento),
      base: redondear(base),
      aumento: redondear(aumento),
      anios: Math.round((entrada.aportes / 12) * 100) / 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "pension", etiqueta: "راتب تقاعد الشيخوخة الشهري التقديري", formato: "moneda", destacada: true },
    { clave: "elegible", etiqueta: "الاستحقاق", formato: "texto" },
    { clave: "base", etiqueta: "الراتب قبل زيادة المعالين", formato: "moneda" },
    { clave: "aumento", etiqueta: "زيادة المعالين", formato: "moneda", ocultarSiCero: true },
    { clave: "anios", etiqueta: "سنوات الاشتراك", formato: "numero", decimales: 2 },
  ],
});
