import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { aumentoDependientes, CAMPO_DEPENDIENTES, CAMPO_SEXO, pensionBase, REQUIERE_PENSION } from "../lib/pension";

export default definirCalculadora({
  id: "jo.early-retirement-calculator",
  mercado: "jo",
  concepto: "propio",
  slug: "early-retirement-calculator",
  estado: "publicado",
  requiere: {
    ...REQUIERE_PENSION,
    "jo.pension-age": "mapa",
    "jo.early-retirement": "mapa",
    "jo.early-retirement-reduction": "mapa",
  },
  campos: [
    CAMPO_SEXO,
    { id: "edad", tipo: "entero", etiqueta: "العمر بالسنوات الكاملة عند طلب الراتب", min: 18, max: 100, porDefecto: 52 },
    { id: "aportes", tipo: "entero", etiqueta: "عدد الاشتراكات الفعلية في الضمان", min: 0, max: 720, porDefecto: 300 },
    { id: "promedio", tipo: "moneda", etiqueta: "متوسط الأجر الشهري في آخر 60 اشتراكًا", min: 0, porDefecto: 800 },
    CAMPO_DEPENDIENTES,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.promedio <= 0) throw new ErrorEntrada("أدخل متوسط الأجر الشهري.", "promedio");
    const c = v["jo.early-retirement"];
    const edadVejez = enMapa(v["jo.pension-age"], entrada.sexo);
    const anios = Math.round((entrada.aportes / 12) * 100) / 100;
    if (entrada.edad >= edadVejez) {
      return {
        elegible: "بلغت سن تقاعد الشيخوخة: احسب راتبك بحاسبة راتب التقاعد",
        pension: null,
        base: null,
        descuento: null,
        tasaDescuento: null,
        aumento: null,
        anios,
        observaciones: [],
      };
    }
    const requeridos = enMapa(c, entrada.sexo);
    const porEdad = entrada.edad >= enMapa(c, "age") && entrada.aportes >= requeridos;
    const porAportes = entrada.aportes >= enMapa(c, "alt-contributions") && entrada.edad >= enMapa(c, "alt-age");
    if (!porEdad && !porAportes) {
      return {
        elegible: "لا تتوافر الشروط العامة للتقاعد المبكر",
        pension: null,
        base: null,
        descuento: null,
        tasaDescuento: null,
        aumento: null,
        anios,
        observaciones: [
          `الشرط سن ${enMapa(c, "age")} مع ${requeridos} اشتراكًا فعليًا، أو ${enMapa(c, "alt-contributions")} اشتراك فعلي مع سن لا تقل عن ${enMapa(c, "alt-age")}. للمشمولين قبل نفاذ القانون عام 2014 شروط انتقالية أخرى.`,
        ],
      };
    }
    const base = pensionBase(entrada.promedio, entrada.aportes, v);
    const tasaDescuento = enMapa(v["jo.early-retirement-reduction"], `${entrada.sexo}-${entrada.edad}`);
    const descuento = porcentaje(base, tasaDescuento);
    const reducida = base - descuento;
    const aumento = aumentoDependientes(reducida, entrada.dependientes, v);
    return {
      elegible: "تتوافر الشروط العامة للتقاعد المبكر",
      pension: redondear(reducida + aumento),
      base: redondear(base),
      descuento: redondear(descuento),
      tasaDescuento,
      aumento: redondear(aumento),
      anios,
      observaciones: ["تقدير بالقانون النافذ. الراتب الفعلي تحسبه المؤسسة من سجلك، والقانون يحد من الزيادة في متوسط الأجر في آخر السنوات."],
    };
  },
  resultado: [
    { clave: "pension", etiqueta: "راتب التقاعد المبكر الشهري التقديري", formato: "moneda", destacada: true },
    { clave: "elegible", etiqueta: "الاستحقاق", formato: "texto" },
    { clave: "base", etiqueta: "الراتب قبل الخصم", formato: "moneda" },
    { clave: "tasaDescuento", etiqueta: "نسبة الخصم حسب العمر", formato: "porcentaje" },
    { clave: "descuento", etiqueta: "قيمة الخصم", formato: "moneda" },
    { clave: "aumento", etiqueta: "زيادة المعالين", formato: "moneda", ocultarSiCero: true },
    { clave: "anios", etiqueta: "سنوات الاشتراك", formato: "numero", decimales: 2 },
  ],
});
