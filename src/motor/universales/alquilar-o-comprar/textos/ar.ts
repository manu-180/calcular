import { textosArabes } from "../../comun/arabe";
import { pluralAr } from "../../../i18n/arabe";
import type { TextosUi } from "../../tipos";
import type { UiAlquilarOComprar } from "../definicion";

// Los años llegan formateados y enteros; detrás de «بعد» el dual va en genitivo (سنتين).
const anios = (cifra: string) =>
  pluralAr(Number(cifra.replace(/\D/g, "")), { uno: "سنة واحدة", dos: "سنتين", pocos: "{n} سنوات", muchos: "{n} سنة", otros: "{n} سنة" }, cifra);

export const textosAr: TextosUi<UiAlquilarOComprar> = textosArabes({
  slug: "rent-vs-buy",
  ui: () => ({
    precio: "سعر العقار",
    entrada: "الدفعة الأولى (% من السعر)",
    gastosCompra: "مصاريف الشراء (% من السعر)",
    gastosCompraAyuda: "رسوم التسجيل ونقل الملكية وعمولة الوسيط والتقييم.",
    tasa: "معدل فائدة التمويل العقاري (% سنويًا)",
    aniosHipoteca: "مدة التمويل بالسنوات",
    alquiler: "الإيجار الشهري لعقار مماثل",
    aumentoAlquiler: "الزيادة السنوية في الإيجار (%)",
    gastosPropietario: "مصاريف المالك السنوية (% من القيمة)",
    gastosPropietarioAyuda: "الصيانة وضريبة العقار وتأمين المنزل. النسبة المعتادة بين 1% و2%.",
    revalorizacion: "ارتفاع سعر العقار سنويًا (%)",
    rendimiento: "عائد استثمار بديل (% سنويًا)",
    rendimientoAyuda: "ما كنت ستكسبه لو استثمرت الدفعة الأولى بدل الشراء.",
    horizonte: "عدد سنوات المقارنة",
    veredicto: "النتيجة",
    patrimonioComprar: "صافي ثروتك في النهاية إذا اشتريت",
    patrimonioAlquilar: "صافي ثروتك في النهاية إذا استأجرت",
    diferencia: "الفرق",
    anioDesde: "السنة التي يبدأ فيها الشراء بالتفوق",
    pagadoAlquilando: "إجمالي الإيجار المدفوع",
    pagadoComprando: "إجمالي أقساط التمويل ومصاريف المالك",
    tabla: "مقارنة سنة بعد سنة",
    colAnio: "السنة",
    colComprar: "الشراء",
    colAlquilar: "الإيجار",
    colDiferencia: "الفرق",
    errorPrecio: "أدخل سعر العقار.",
    errorAlquiler: "أدخل الإيجار الشهري لعقار مماثل.",
    convieneComprar: (n, diferencia) => `الشراء أفضل: بعد ${anios(n)} تكون ثروتك أكبر بمقدار ${diferencia}.`,
    convieneAlquilar: (n, diferencia) => `الإيجار أفضل: بعد ${anios(n)} تكون ثروتك أكبر بمقدار ${diferencia}.`,
    empate: (n) => `بعد ${anios(n)} يتساوى الخياران.`,
    observacionDesde: (anio) => `يتقدم الشراء على الإيجار في السنة ${anio} ويبقى متقدمًا بعدها.`,
    observacionMetodo:
      "تقارن الحاسبة ما تملكه في كل حالة. إذا استأجرت، تبقى الدفعة الأولى وما توفّره كل شهر مستثمرين. ولا تُخصم مصاريف البيع.",
  }),
});
