import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { impuestoAnual, REQUIERE_IMPUESTO } from "../lib/impuesto";
import { aportesSsc, REQUIERE_SSC } from "../lib/ssc";

export default definirCalculadora({
  id: "jo.salary-calculator",
  mercado: "jo",
  concepto: "sueldo-neto",
  slug: "salary-calculator",
  estado: "publicado",
  requiere: { ...REQUIERE_SSC, ...REQUIERE_IMPUESTO },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "الراتب الإجمالي الشهري", min: 0, porDefecto: 800 },
    {
      id: "dependientes",
      tipo: "si-no",
      etiqueta: "أعيل زوجًا أو أولادًا أو والدين",
      ayuda: "يضيف إعفاء المعالين في ضريبة الدخل.",
      porDefecto: false,
    },
    {
      id: "ssc",
      tipo: "si-no",
      etiqueta: "مشمول بالضمان الاجتماعي",
      ayuda: "العاملون في القطاع الخاص مشمولون عادةً. أزل الإشارة إذا لم يُقتطع منك اشتراك.",
      porDefecto: true,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل الراتب الإجمالي الشهري.", "salario");
    const a = aportesSsc(entrada.salario, v);
    const ssc = entrada.ssc ? redondear(a.empleado) : 0;
    const anual = impuestoAnual(entrada.salario * 12, { dependientes: entrada.dependientes, conyuge: entrada.dependientes, hijos: 0, facturas: 0 }, v);
    const impuesto = redondear(anual.total / 12);
    const neto = redondear(entrada.salario - ssc - impuesto);
    const observaciones = [
      "ضريبة الشهر هنا هي الضريبة السنوية مقسومة على 12، كما تقتطعها المنشأة عادةً. إعفاء الفواتير يُطلب في الإقرار السنوي ولا يدخل في هذا الحساب.",
    ];
    if (entrada.ssc && a.topeAplicado) observaciones.push("حُسب اشتراك الضمان على الحد الأعلى للأجر الخاضع للاقتطاع.");
    return {
      neto,
      bruto: redondear(entrada.salario),
      ssc,
      impuesto,
      descuentos: redondear(ssc + impuesto),
      netoAnual: redondear(neto * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "صافي الراتب الشهري", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "الراتب الإجمالي", formato: "moneda" },
    { clave: "ssc", etiqueta: "اشتراك الضمان الاجتماعي", formato: "moneda", ocultarSiCero: true },
    { clave: "impuesto", etiqueta: "ضريبة الدخل الشهرية", formato: "moneda" },
    { clave: "descuentos", etiqueta: "مجموع الاقتطاعات", formato: "moneda" },
    { clave: "netoAnual", etiqueta: "صافي الراتب في السنة", formato: "moneda" },
  ],
  mundo: {
    bruto: "salario",
    periodoBruto: "mes",
    neto: "neto",
    periodoNeto: "mes",
    entrada: { dependientes: false, ssc: true },
  },
});
