import { definirTextos } from "@/motor/edicion";
import excise from "../../qa/calculadoras/excise-tax-calculator";

export default definirTextos(excise, {
  calculadora: "qa-ar.excise-tax-calculator",
  slug: "excise-tax-calculator",
  campos: {
    producto: { etiqueta: "السلعة" },
    precio: { etiqueta: "السعر", ayuda: "السعر القياسي أو سعر البيع بالتجزئة، أيهما أعلى." },
    modo: { etiqueta: "السعر الذي أدخلته", opciones: { sin: "لا يشمل الضريبة الانتقائية", con: "يشمل الضريبة الانتقائية" } },
  },
  filas: {
    impuesto: { etiqueta: "الضريبة الانتقائية" },
    base: { etiqueta: "السعر قبل الضريبة" },
    final: { etiqueta: "السعر شاملًا الضريبة" },
    tasa: { etiqueta: "نسبة الضريبة" },
  },
  mensajes: {
    "Enter the price.": "أدخل السعر.",
  },
});
