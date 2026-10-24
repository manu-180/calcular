import { pluralAr } from "../../../i18n/arabe";
import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

// La cantidad de meses llega ya formateada y entera: se lee de nuevo para elegir la forma del plural.
const meses = (cifra: string) =>
  pluralAr(Number(cifra.replace(/\D/g, "")), { uno: "شهر واحد", dos: "شهرين", pocos: "{n} أشهر", muchos: "{n} شهرًا", otros: "{n} شهر" }, cifra);

export const textosAr: TextosUi<UiPrestamo> = {
  slug: "loan",
  ui: () => ({
    monto: "مبلغ القرض",
    tasa: "معدل الفائدة السنوي (%)",
    tasaAyuda: "المعدل السنوي الاسمي المذكور في العرض. لا يشمل الرسوم والعمولات.",
    meses: "مدة القرض بالأشهر",
    extra: "دفعة إضافية كل شهر (اختياري)",
    extraAyuda: "المبلغ الذي تضيفه كل شهر لتنهي السداد مبكرًا. يُخصم كله من أصل القرض.",
    cuota: "القسط الشهري",
    intereses: "إجمالي الفوائد",
    total: "إجمالي المبلغ المدفوع",
    mesesReales: "عدد الأشهر حتى السداد مع الدفعة الإضافية",
    ahorro: "الفوائد التي توفّرها",
    tabla: "جدول السداد",
    colMes: "الشهر",
    colPago: "القسط",
    colInteres: "الفائدة",
    colCapital: "الأصل",
    colSaldo: "الرصيد المتبقي",
    errorMonto: "أدخل مبلغًا أكبر من صفر.",
    observacionCostos: "القسط لا يشمل التأمين أو الرسوم أو الضرائب التي قد يضيفها المُقرض. اطلب التكلفة الإجمالية قبل التوقيع.",
    observacionExtra: (n, ahorro) => `مع الدفعة الإضافية تنتهي من السداد خلال ${meses(n)} وتوفّر ${ahorro} من الفوائد.`,
  }),
};
