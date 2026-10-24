import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosAr: TextosUi<UiIva> = {
  slug: "vat",
  ui: () => ({
    operacion: "ماذا تريد أن تفعل؟",
    agregar: "إضافة الضريبة إلى سعر قبل الضريبة",
    quitar: "استخراج الضريبة من سعر يشملها",
    monto: "السعر",
    montoAyuda: "قبل الضريبة إذا كنت تضيفها، وشاملًا الضريبة إذا كنت تستخرجها.",
    otraTasa: "نسبة ضريبة مختلفة (%)",
    otraTasaAyuda: "اختياري. إذا كانت سلعتك تخضع لنسبة مخفضة فأدخلها هنا، وإلا تُطبَّق النسبة الأساسية.",
    neto: "السعر قبل الضريبة",
    impuesto: "ضريبة القيمة المضافة",
    total: "السعر شاملًا الضريبة",
    tasaUsada: "النسبة المطبّقة",
    errorTasa: "نسبة الضريبة غير صالحة.",
  }),
};
