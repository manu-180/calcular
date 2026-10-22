import { pluralAr } from "../arabe";
import { GRAMATICA } from "../gramatica";
import type { Diccionario } from "../resolver";
import type { TextosInicio } from "./tipos";

const g = GRAMATICA.ar;

const base: TextosInicio = {
  arranque: {
    estasEn: (pais) => `أنت ${g.en(pais)}`,
    resumen: (calculadoras) => `${calculadoras} بالقيم الرسمية المعمول بها.`,
    ultimoDato: "آخر رقم مُحمَّل",
    ir: (pais) => `الذهاب إلى ${g.nombre(pais)}`,
    otro: "اختر دولة أخرى",
    argentina: "حاسباتك على calcular.ar، ببيانات الأرجنتين الرسمية.",
    argentinaIr: "الذهاب إلى calcular.ar",
    neutroTitulo: (paises) => `${pluralAr(paises, { uno: "دولة واحدة", dos: "دولتان", pocos: "{n} دول", muchos: "{n} دولة", otros: "{n} دولة" })}، لكلٍّ منها قوانينها وعملتها`,
    neutroTexto: "نراجع المصادر الرسمية كل يوم.",
    neutroIr: "عرض الدول",
  },
  selector: {
    buscar: "ابحث عن دولة",
    sinResultados: (q) => `لا توجد دولة تطابق «${q}»`,
    ubicacion: "موقعك الحالي",
    mismaCalculadora: "الحاسبة نفسها",
    paises: "الدول",
  },
  aviso: { mismaCalculadora: (pais) => `احسبها ببيانات ${g.de(pais)}` },
  vivo: {
    titulo: "بيانات رسمية تتحدّث تلقائيًا",
    vigilado: "تراجع عملية آلية المصادر الرسمية كل يوم. ولا تُعتمد تغييرات القواعد إلا بعد أن نتحقق منها.",
    sinVigilar: "لكل قيمة مصدرها الرسمي وتاريخ مراجعتنا لها.",
    verificado: "آخر مراجعة للقواعد",
    automatico: "آخر رقم آلي",
    fuentes: "المصادر الرسمية",
    nFuentes: (n) => pluralAr(n, { uno: "وثيقة رسمية واحدة", dos: "وثيقتان رسميتان", pocos: "{n} وثائق رسمية", muchos: "{n} وثيقة رسمية", otros: "{n} وثيقة رسمية" }),
    verFuentes: "عرض المصادر",
    verNovedades: "عرض التحديثات",
    hoy: "اليوم",
    ayer: "أمس",
    elDia: (fecha) => `في ${fecha}`,
    actualizadoSerie: (serie, cuando) => `${serie}، ${cuando}`,
  },
  sello: {
    verificado: (fecha) => `راجعنا البيانات في المصدر الرسمي بتاريخ ${fecha}.`,
    serie: (serie, cuando, organismo) => `${serie}: حُدِّث ${cuando} بآخر رقم من ${organismo}.`,
    diario: "نراجع المصادر الرسمية آليًا كل يوم.",
    actualizado: "محدَّث",
  },
  novedades: {
    pildora: "التحديثات",
    titulo: (pais) => `ما الذي تغيّر في البيانات الرسمية ${g.en(pais)}`,
    acento: "يوم تغيّره",
    bajada: "كل رقم جديد يصل إلى الحاسبات يُسجَّل هنا: ما الذي تغيّر، ومتى يسري، ومن أين جاء.",
    ultimoCambio: "آخر تغيير",
    revision: "مراجعة المصادر",
    diaria: "كل يوم",
    porNorma: "مع كل قاعدة جديدة",
    siguiendo: "المصادر التي نتابعها",
    masOrganismos: (n) => `و${pluralAr(n, { uno: "جهة أخرى", dos: "جهتان أخريان", pocos: "{n} جهات أخرى", muchos: "{n} جهة أخرى", otros: "{n} جهة أخرى" })}`,
    proximos: "منشورة وتسري قريبًا",
    proximosTexto: "قيم رسمية حمّلناها بالفعل وتسري في الأيام المقبلة.",
    registro: "سجل التغييرات",
    rss: "تابع عبر RSS",
    vacio: "لا توجد تغييرات مسجّلة لهذه الدولة بعد.",
    etiqueta: { editorial: "قاعدة", dato: "رقم جديد", proximo: "قريبًا", serie: "آلي", revision: "مراجعة" },
    rige: (fecha) => `يسري من ${fecha}`,
    rigeDesdeHasta: (desde, hasta) => `يسري من ${desde} حتى ${hasta}`,
    antes: (valor, fecha) => `سابقًا: ${valor} (${fecha})`,
    revisados: (n) =>
      `راجعنا ${pluralAr(n, { uno: "رقمًا واحدًا", dos: "رقمين", pocos: "{n} أرقام", muchos: "{n} رقمًا", otros: "{n} رقم" })} في المصدر الرسمي`,
    revisadosTexto: (organismos) => `تأكدنا من القيم المعمول بها لدى ${organismos}.`,
    verDatos: (n) => (n === 1 ? "عرض الرقم" : `عرض ${pluralAr(n, { uno: "الرقم", dos: "الرقمين", pocos: "الأرقام الـ{n}", muchos: "الأرقام الـ{n}", otros: "الأرقام الـ{n}" })}`),
    calculadoras: "تستخدمه",
    rango: (min, max, zonas) => `من ${min} إلى ${max} حسب المنطقة (${pluralAr(zonas, { uno: "منطقة واحدة", dos: "منطقتان", pocos: "{n} مناطق", muchos: "{n} منطقة", otros: "{n} منطقة" })})`,
    tabla: (filas) => `جدول من ${pluralAr(filas, { uno: "شريحة واحدة", dos: "شريحتين", pocos: "{n} شرائح", muchos: "{n} شريحة", otros: "{n} شريحة" })}`,
    valores: (n) => pluralAr(n, { uno: "قيمة واحدة", dos: "قيمتان", pocos: "{n} قيم", muchos: "{n} قيمة", otros: "{n} قيمة" }),
    pasosTitulo: "كيف تبقى البيانات محدّثة",
    pasos: [
      { titulo: "جهة رسمية تنشر", texto: "يصدر قرار أو مؤشر أو سعر صرف في المصدر الرسمي." },
      { titulo: "نتحقق قبل الاستخدام", texto: "تصل المؤشرات وأسعار الصرف آليًا مع فحص لمداها. أما القواعد فنحمّلها والوثيقة الرسمية بين أيدينا." },
      { titulo: "تتحدّث الحاسبات", texto: "تنتقل الحاسبات إلى الرقم الجديد، ويُسجَّل التغيير هنا مع مصدره." },
    ],
    feedTitulo: (pais) => `تحديثات ${g.de(pais)} على CalcularYa`,
    feedSubtitulo: (pais) => `تغييرات البيانات الرسمية التي تعتمد عليها الحاسبات ${g.en(pais)}، مع تواريخ السريان والمصادر.`,
  },
};

export const ar: Diccionario<TextosInicio> = { base };
