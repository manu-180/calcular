import { textosArabes } from "../../comun/arabe";
import { pluralAr, type FormasAr } from "../../../i18n/arabe";
import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

// Las cantidades llegan formateadas y enteras: se leen de nuevo para elegir la forma del plural.
const entero = (cifra: string) => Number(cifra.replace(/\D/g, ""));
const ANIOS: FormasAr = { uno: "سنة واحدة", dos: "سنتان", pocos: "{n} سنوات", muchos: "{n} سنة", otros: "{n} سنة" };
const MESES: FormasAr = { uno: "شهر واحد", dos: "شهران", pocos: "{n} أشهر", muchos: "{n} شهرًا", otros: "{n} شهر" };

export const textosAr: TextosUi<UiTarjetaDeCredito> = textosArabes({
  slug: "credit-card-payoff",
  ui: () => ({
    saldo: "رصيد البطاقة",
    tasa: "معدل الفائدة السنوي (%)",
    tasaAyuda: "معدل الفائدة على المشتريات. تجده في كشف حساب البطاقة.",
    modo: "كيف ستسدد؟",
    modoFijo: "مبلغ ثابت كل شهر",
    modoMinimo: "الحد الأدنى للسداد",
    pagoFijo: "الدفعة الشهرية الثابتة",
    minimoPorcentaje: "الحد الأدنى للسداد (% من الرصيد)",
    minimoPorcentajeAyuda: "ما تطلبه الجهة المصدرة للبطاقة كل شهر. إذا لم تكن متأكدًا، فنسبة 5% شائعة.",
    minimoPiso: "ألا يقل الحد الأدنى عن",
    meses: "عدد الأشهر حتى السداد الكامل",
    intereses: "الفوائد التي تدفعها",
    total: "إجمالي المبلغ المدفوع",
    primerPago: "أول دفعة بالحد الأدنى",
    tabla: "خطة السداد شهرًا بشهر",
    colMes: "الشهر",
    colPago: "الدفعة",
    colInteres: "الفائدة",
    colCapital: "الأصل",
    colSaldo: "الرصيد",
    errorSaldo: "أدخل الرصيد المستحق على البطاقة.",
    errorFaltaPago: "أدخل المبلغ الذي ستدفعه كل شهر.",
    errorNoCubre: (interes) => `بهذه الدفعة لا ينخفض الرصيد أبدًا، ففائدة الشهر الأول وحدها ${interes}. ارفع الدفعة.`,
    errorMuyLargo: "بهذه الدفعة يستغرق السداد أكثر من 50 سنة. ارفع الدفعة.",
    observacionAnios: (anios, meses) => {
      const a = pluralAr(entero(anios), ANIOS, anios);
      const m = entero(meses) === 0 ? "" : ` و${pluralAr(entero(meses), MESES, meses)}`;
      return `أي أن المدة ${a}${m}.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `إذا دفعت دائمًا ${pago}، أي قيمة أول حد أدنى، فإنك تنتهي من السداد في ${pluralAr(entero(meses), { uno: "شهر واحد", dos: "شهرين", pocos: "{n} أشهر", muchos: "{n} شهرًا", otros: "{n} شهر" }, meses)} وتوفّر ${ahorro} من الفوائد.`,
    observacionNoGastar: "تفترض الحاسبة أنك لا تشتري شيئًا جديدًا بالبطاقة في أثناء السداد.",
  }),
});
