import { definirTextos } from "@/motor/edicion";
import property from "../../qa/calculadoras/property-registration-fee";

export default definirTextos(property, {
  calculadora: "qa-ar.property-registration-fee",
  slug: "property-registration-fee",
  campos: {
    operacion: {
      etiqueta: "المعاملة",
      opciones: {
        venta: "بيع",
        donacionFamilia: "هبة للأصول أو الفروع أو الزوج",
        donacionOtros: "هبة لغير الأصول أو الفروع أو الزوج",
        herencia: "نقل ملكية بالإرث",
        hipoteca: "رهن",
      },
    },
    valor: { etiqueta: "قيمة العقار أو مبلغ الرهن", ayuda: "في الرهن: قيمة الدين المضمون." },
    inmuebles: { etiqueta: "عدد العقارات" },
  },
  filas: {
    tasaRegistro: { etiqueta: "رسم التسجيل" },
    tasa: { etiqueta: "نسبة الرسم" },
  },
  mensajes: {
    "Enter the value.": "أدخل القيمة.",
    "Transactions for ministries, public bodies and charitable gifts are exempt.": "تُعفى المعاملات الصادرة لصالح الوزارات والجهات العامة والهبات للأغراض الخيرية.",
  },
});
